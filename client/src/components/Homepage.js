import React, { useEffect, useState } from 'react';
import millify from 'millify';
import { Typography, Row, Col, Statistic, Table, Button, Input } from 'antd';
import { Link } from 'react-router-dom';
import { getAllMilkCategories, getCustomersWithDues, getInvoicesByDate, getStocksByDate } from '../api';
import moment from 'moment';
import PaymentModal from './Modal/PaymentModal';
import { EditOutlined } from '@ant-design/icons';
import { uuid } from '../util/util';

const { Title } = Typography;

const Homepage = () => {

    const [reportDate, setReportDate] = useState(moment().format('YYYY-MM-DD'))
 
    const [invoices, setInvoices] = useState([]);
    const [milk, setMilks] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [visible, setVisible] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [stocks, setStocks] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [total, setTotal] = useState(0);

    const [search, setSearch] = useState('');

    const fetchInvoices = async (date) => {
        const response = await getInvoicesByDate(date);
        console.log(response);
        setInvoices(response?.data?.entity);
    }

    const fetchMilkCategories = async () => {
      const response = await getAllMilkCategories();
      setMilks(response?.data?.entity.rows);
    }

    const fetchCustomers = async (date) => {
      const response = await getCustomersWithDues(search, (currentPage - 1) * pageSize, pageSize );
      console.log(response);
      setCustomers(response?.data?.entity.rows);
      setTotal(response?.data?.entity.count);
  }
    const getStocks = async (date) => {
      const response = await getStocksByDate(date);
      console.log(response);
      setStocks(response?.data?.entity);
    } 

    const onChangeReportDate = (e) => {
      setReportDate(e.target.value);
    }
    
    let myTimeout;
    useEffect(async () => {
        await fetchMilkCategories();
        await fetchInvoices(reportDate);
        await getStocks(reportDate);

        if(myTimeout) clearTimeout(myTimeout);
        myTimeout = setTimeout(() => {

          const scrollableElement = document.querySelector('#total-table > div > div > div > div > div > div > div');
          const targetElement = document.querySelector('#report-table > div > div > div > div > div > div > div.ant-table-body');
    
          scrollableElement.addEventListener('scroll', () => {
            const scrollPosition = scrollableElement.scrollLeft;
    
            targetElement.scrollLeft = scrollPosition;
          });
    
        }, 1000);

        
    },[reportDate]);

    useEffect(() => {
      fetchCustomers();
    },[currentPage, pageSize, search]);

    const columns = milk.length > 0 ? [{
          title:  ( 
              <Typography.Text ellipsis={true} title={'Customers'}>
                  {'Customers'}
              </Typography.Text>
          ),
          dataIndex: 'customer',
          key: 'customer',
          width: '150px',
          fixed: 'left',
      },
      ...(milk.map((ele) => ({
          title:  ( 
            <Typography.Text ellipsis={true} title={ele.name}>
                {ele.name}
            </Typography.Text>
          ),
          dataIndex: ele.id,
          key: ele.id,
          width: '150px'
        })))] : [];


    const totalStocksMap = stocks.reduce((acc, ele) => ({ ...acc, [ele.categoryId]: ele.carryForward + ele.morningQuantity + ele.eveningQuantity }), {});
    const totalSoldStockMap = {};
    for(let i = 0; i < milk.length ; i++){
      totalSoldStockMap[milk[i].id] = 0;
    }

    const dataSource = invoices.map((customer) => {
      const data = {
        customer: customer.name
      }
      for(let i = 0; i < milk.length ; i++){
        data[milk[i].id] = 0;
      }
      const invs = customer.invoices;
      for(let i = 0; i < invs.length ; i++){
        const milkCategory = invs[i].milkCategory;
        for(let j = 0; j < milkCategory.length ; j++){
          const catId = milkCategory[j].categoryId || milkCategory[j].id;
          if(data[catId] == undefined){
            data[catId] = 0;
          }
          data[catId] += milkCategory[j].Transaction.quantity;
          totalSoldStockMap[catId] += milkCategory[j].Transaction.quantity;
        }
      }
      return data;
    });

    const totalDataSource = [{
      id: uuid(),
      customer: 'Total Stock',
      ...totalStocksMap
    },
    {
      id: uuid(),
      customer: 'Total Sold',
      ...totalSoldStockMap
    },
    {
      id: uuid(),
      customer: 'Total Remaining',
      ...Object.keys(totalStocksMap).reduce((acc, ele) => ({ ...acc, [ele]: totalStocksMap[ele] - totalSoldStockMap[ele] }), {})
    }]
    const customerColumns = [{
      title:  ( 
          <Typography.Text ellipsis={true} title={'Customers'}>
              {'Customers'}
          </Typography.Text>
      ),
      dataIndex: 'name',
      key: 'customer',
      width: '40%'
    },
    {
      title:  ( 
          <Typography.Text ellipsis={true} title={'Dues'}>
              {'Due / Advance'}
          </Typography.Text>
      ),
      key: 'dues',
      width: '40%',
      render: (data) => {
        if(data.due == 0 || data.due == null) return  <div key={'due'+data.id}> {data.due} </div>;
        return data.due > 0 ?
         <div key={'due'+data.id} className='text-red-800'>{data.due} (Due)</div> :
         <div key={'due'+data.id} className='text-green-800'>{-data.due} (Advance)</div>;
      }
    },
    {
      title: 'Payments',
      key: 'operation',
      width: '10%',
      render: (data) => {
          return (
              <div className="float-right">
                  <Button key={'edit'+data.id} type="primary" onClick={() => onPayment(data)} title="Edit">
                      <EditOutlined /> Pay
                  </Button>
              </div>
          );
      }
    }
    ];

    const onPayment = (customer) => {
      setSelectedCustomer(customer)
      setVisible(true);
    }

    const handlePageChange = (page) => {
      setCurrentPage(page);
    };
  
    const handlePageSizeChange = (current, size) => {
      setPageSize(size);
      setCurrentPage(1);
    };

  
    const initpageSizeOptions = [10, 20, 50, 100];
    const pageSizeOptions = [];
    while(initpageSizeOptions.length > 0 && initpageSizeOptions[0] < total ){
        pageSizeOptions.push(initpageSizeOptions[0] + '');
        initpageSizeOptions.shift();
    }
    if(total > 10) pageSizeOptions.push( total + '');

    return (
      <>
          <div  style={{ height: 'calc(100vh - 150px)', overflowY :'auto', overflowX: 'hidden'}}>
          <Title level={2} className="heading" id='mainheader'>Today's Report</Title>
            <Row gutter={[32, 32]}>
                  <Col span={4}><Statistic title="Total Collection" value={ millify(0) }/></Col>
                  <Col span={4}><Statistic title="Total Stocks" value={millify( 0)}/></Col>
                  <Col span={4}><Statistic title="Total Stocks Left" value={millify( 0)}/></Col>
                  <Col span={4}><Statistic title="Total Invoices Generated" value={millify( 0)}/></Col>
                  <Col span={4}><Statistic title="Total New Customers Added" value={millify( 0)}/></Col>
            </Row>
            <div className="site-layout-background p-5 mt-1">
              <div style={{color: 'rgba(107, 114, 128, var(--tw-text-opacity))'}} className='flex border-b-2' >
                <Title level={3} >Sales Report {/*moment(reportDate).format('DD-MM-YYYY')*/}</Title>
                <div className=''>
                  <Row>
                    <Input
                        type={'date'} 
                        name={'reportDate'}
                        onChange={onChangeReportDate}
                        key={'invoiceDate'}
                        value={reportDate}
                        className='ml-2'
                      /> 
                  </Row>
                </div>
                
                
              </div>
               
                <Row className="w-full overflow-y-auto " id='report-table'>
                    <Col span={24}>
                        <Table
                            dataSource={dataSource} 
                            columns={columns}
                            bordered
                            scroll={{ x: 1600, y: 384 }}
                            pagination={false}
                            rowKey={(record) => record.id + (new Date().getTime() + Math.random() * 10000)}
                        />
                    </Col>
                </Row>

                <Row className="w-full overflow-y-auto " id="total-table">
                    <Col span={24}>
                        <Table
                            dataSource={totalDataSource} 
                            columns={columns}
                            bordered
                            scroll={{ x: 1600}}
                            pagination={false}
                            rowKey={(record) => record.id + (new Date().getTime() + Math.random() * 10000)}
                            showHeader={false}
                        />
                    </Col>
                </Row> 
            </div>

            <div className="site-layout-background p-5 mt-1">
              <div style={{color: 'rgba(107, 114, 128, var(--tw-text-opacity))'}} className='border-b-2' >
                <Title level={3} >All Customers</Title>
              </div>
              <div className='mb-2'>
                    <Row className="w-full">
                        <Col span={12}>
                            <Input
                                placeholder="Search..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />
                        </Col>
                    </Row>
                </div>
                <Row className="w-full">
                    <Col span={24}>
                        <Table
                            dataSource={customers} 
                            columns={customerColumns}
                            bordered
                            pagination={{ 
                              position: ['bottomRight', 'topRight'], 
                              pageSizeOptions,
                              current: currentPage,
                              pageSize: pageSize,
                              onChange: handlePageChange,
                              onShowSizeChange: handlePageSizeChange,
                              total,
                              showSizeChanger: true
                           }}
                            rowKey={(record) => record.id + (new Date().getTime() + Math.random() * 10000)}
                        />
                    </Col>
                </Row>
                <PaymentModal visible={visible} setVisible={setVisible} customer={selectedCustomer}  callback={fetchCustomers}/> 
            </div>
          </div>
      </>
    );
};

export default Homepage;



