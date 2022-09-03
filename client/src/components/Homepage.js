import React, { useEffect, useState } from 'react';
import millify from 'millify';
import { Typography, Row, Col, Statistic, Table, Button } from 'antd';
import { Link } from 'react-router-dom';
import { getAllMilkCategories, getCustomersWithDues, getInvoicesByDate } from '../api';
import moment from 'moment';
import InputField from './common/InputField';
import PaymentModal from './Modal/PaymentModal';
import { EditOutlined } from '@ant-design/icons';

const { Title } = Typography;

const Homepage = () => {

    const [reportDate, setReportDate] = useState(moment().format('YYYY-MM-DD'))
 
    const [invoices, setInvoices] = useState([]);
    const [milk, setMilks] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [visible, setVisible] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    const fetchInvoices = async (date) => {
        const response = await getInvoicesByDate(date);
        console.log(response);
        setInvoices(response?.data?.entity);
    }

    const fetchMilkCategories = async () => {
      const response = await getAllMilkCategories();
      setMilks(response?.data?.entity);
    }

    const fetchCustomers = async (date) => {
      const response = await getCustomersWithDues();
      console.log(response);
      setCustomers(response?.data?.entity);
  }

    const onChangeReportDate = (e) => {
      setReportDate(e.target.value);
    }

    useEffect(async () => {
        await fetchMilkCategories();
        await fetchInvoices(reportDate);
        await fetchCustomers();
    },[reportDate]);

    const columns = milk.length > 0 ? [{
          title:  ( 
              <Typography.Text ellipsis={true} title={'Customers'}>
                  {'Customers'}
              </Typography.Text>
          ),
          dataIndex: 'customer',
          key: 'customer',
          width: '150px'
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
        }
      }
      return data;
    });

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
              <div style={{color: 'rgba(107, 114, 128, var(--tw-text-opacity))'}} className='border-b-2' >
                <Title level={3} >Sales Report ({reportDate})</Title>
                {/* <div className='absolute top-28 right-16 w-72 mt-2'>
                  <Row>
                    <InputField
                          label={'Date'}
                          type={'date'} 
                          name={'reportDate'}
                          onChange={onChangeReportDate}
                          key={'invoiceDate'}
                          value={reportDate}
                          lcol={8}
                          icol={16}
                      /> 
                  </Row>
                </div> */}
                
                
              </div>
               
                <Row className="w-full">
                    <Col span={24}>
                        <Table
                            dataSource={dataSource} 
                            columns={columns}
                            bordered
                            scroll={{ x: 1600 }}
                            pagination={ {}}
                            rowKey={(record) => record.id + (new Date().getTime() + Math.random() * 10000)}
                        />
                    </Col>
                </Row> 
            </div>

            <div className="site-layout-background p-5 mt-1">
              <div style={{color: 'rgba(107, 114, 128, var(--tw-text-opacity))'}} className='border-b-2' >
                <Title level={3} >All Customers</Title>
              </div>
               
                <Row className="w-full">
                    <Col span={24}>
                        <Table
                            dataSource={customers} 
                            columns={customerColumns}
                            bordered
                            pagination={ {}}
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



