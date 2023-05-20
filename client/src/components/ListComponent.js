import React, { useEffect, useState } from 'react';
import { Typography, Row, Col, Statistic, Table, Button, Pagination, Input, Select } from 'antd';
import { deleteApiFn, getApiFn, getFieldData, getPageName, getTitle, mappingData, sweetalertMessage, sweetalertOkCancel, sweetalertValidate } from '../util/util';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import moment from 'moment';

const { Title } = Typography;

const SelectCustomers = ({ page, setFilter, filter }) => {
    const [customers, setCustomers] = useState(null);
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    useEffect(() => {
        const getCustomers = async () => {
            const response = await getApiFn('customers')('customers');
            setCustomers(response?.data?.entity.rows);
        };
        getCustomers();
    }, []);

    const onChange = (value) => {
        setSelectedCustomer(value);
        setFilter({...filter, customerId: value});
    }
    
    return (
        <Select
            showSearch
            className='w-full'
            placeholder="Select a customer"
            optionFilterProp="children"
            onChange={onChange}
            value={selectedCustomer}
            filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
        >
            {customers?.map((customer) => (
                <Select.Option key={customer.id} value={customer.id}>{customer.name}</Select.Option>
            ))}
        </Select>
    )
}


const ListComponent = ({ page, reload, setEditData, setReload, noaction }) => {

    const [invoices, setInvoices] = useState(null);
    const [visibleID, setVisibleID] = useState(false);
    const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [total, setTotal] = useState(0);

    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState({});
    const [visibleFilter, setVisibleFilter] = useState(false);

    const fetchInvoices = async () => {
        const getApi = getApiFn(page); 
        const response = await getApi(page, search, (currentPage - 1) * pageSize, pageSize , JSON.stringify(filter));
        
        console.log('response', response);
        setInvoices(response?.data?.entity.rows.map((data) => mappingData(page, data)));
        setTotal(response?.data?.entity.count);
    }

    useEffect(() => {
        fetchInvoices();
    },[page, currentPage, pageSize, reload, search, filter]);

    const openInvoiceDetail = (invoiceId) => {
        setSelectedInvoiceId(invoiceId);
        setVisibleID(true);  
    }

    const onEdit = (data) => {
        setEditData({...data})
    }

    const  onDelete = async (data) => {
        sweetalertOkCancel(
            'Are you sure you want to delete ?',
            async () => {
                const deleteApi = deleteApiFn(page);
                const response = await deleteApi(data.id);
                if(response?.data?.status){
                    sweetalertMessage('Succesfully Deleted')
                }
                else{
                    console.log('err', response)
                    sweetalertValidate('OOPS!! Something went wrong')
                }
                setReload(!reload);
            },
            () => {}
        )
    }

    const getRender = (column, page) => {
        return {
            render: (value, data) => {
                if(column.name == 'invoiceNumber'){
                    const invoiceId =  page == 'receipts' || page == 'payments' ? data.invoice?.id : data.id;
                    return (
                        <div>
                            <a onClick={() => openInvoiceDetail(invoiceId)} className='underline text-blue-900'>
                            { value }
                            </a>
                        </div>
                    )
                }
                if(column.inputType === 'number'){
                    return (
                        <div>
                            { value ? value.toLocaleString('en-IN') : value } 
                        </div>
                    )
                        
                }
                if(column.inputType === 'date'){
                    return (
                        <div>
                            { value ? moment(value).format('DD-MM-YYYY') : null } 
                        </div>
                    )
                        
                }

                if(column.name === 'companyId'){
                    return `${data?.company?.division} - ${data?.company?.name}` 
                }

                if(column.name === 'customerId'){
                    return `${data?.customer ? data?.customer.name : ''}` 
                }
                return value
            }
        };
    }
    const fieldData = getFieldData(page); 
    const columns = fieldData.map((column) => ({
        title:  ( 
            <Typography.Text ellipsis={true} title={column.label}>
                {getTitle(column, page)}
            </Typography.Text>
        ),
        dataIndex: column.name,
        key: column.name,
        width: '150px',
        ...getRender(column, page)
    }));

    //if(!noaction){
        columns.push({
            title: 'Action',
            key: 'operation',
            width: '100px',
            render: (data) => {
                return (
                    <div className="float-right">
                        {page !== 'payment-receipts' &&  
                        <Button key={'edit'+data.id} type="primary" onClick={() => onEdit(data)} title="Edit">
                            <EditOutlined />
                        </Button>
                        }       
                        
                        <Button key={'delete'+data.id} type="secondary" onClick={() => onDelete(data)} className="ml-2" title="Delete">
                            <DeleteOutlined />
                        </Button>
                    </div>
                );
            },
        });
    //}
   

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
        <div  style={{ height: 'calc(100vh - 150px)', overflowY :'auto'}}>
            <div className="site-layout-background p-5 mt-1">
                <Title level={3} style={{color: 'rgba(107, 114, 128, var(--tw-text-opacity))'}} className='border-b-2' >
                    {getPageName(page)}
                </Title>
                <div className='mb-2'>
                    <Row className="w-full">
                        <Col span={12}>
                            { page === 'payment-receipts' ? 
                            <SelectCustomers filter={filter} setFilter={setFilter} />
                            : <Input
                                placeholder="Search..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />
                            }
                        </Col>
                    </Row>
                </div>
                <Row className="w-full">
                    <Col span={24}>
                        <Table
                            dataSource={invoices} 
                            columns={columns}
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
            </div>
        </div>
    );
};

export default ListComponent;
