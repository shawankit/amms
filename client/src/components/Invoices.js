import React, { useEffect, useState } from 'react';
import millify from 'millify';
import { Typography, Row, Col, Statistic, Table, Button, Input } from 'antd';
import CustomerForm from './Forms/CustomerForm';
import { deleteInvoice, getAllCustomers, getAllInvoices } from '../api';
import InvoiceData from '../data/InvoiceData';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import InvoiceForm from './Forms/InvoiceForm';
import moment from 'moment';
import PaymentModal from './Modal/PaymentModal';
import InvoiceDetailsModal from './Modal/InvoiceDetailModal';
import { sweetalertMessage, sweetalertValidate } from '../util/util';

const { Title } = Typography;

const Invoices = ({ type }) => {

    const [customers, setCustomers] = useState(null);
    const [invoices, setInvoices] = useState(null);
    const [visible, setVisible] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [visibleID, setVisibleID] = useState(false);
    const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [total, setTotal] = useState(0);

    const [search, setSearch] = useState('');

    const fetchCustomers = async () => {
        const response = await getAllCustomers(undefined, 0, undefined, type === 'purchase');
        setCustomers(response?.data?.entity.rows);
    }

    const fetchInvoices = async () => {
        const response = await getAllInvoices(type, search, (currentPage - 1) * pageSize, pageSize);
        setInvoices(response?.data?.entity.rows.map((inv) => ({
            ...inv,
            customerName: inv.customer.name,
            invoiceDate: inv.invoiceDate? moment(inv.invoiceDate).format('DD-MM-YYYY') : null,
            paymentDate: inv.paymentDate ? moment(inv.paymentDate).format('DD-MM-YYYY') : null
        })));
        setTotal(response?.data?.entity.count);
    }

    useEffect(() => {
        fetchCustomers();
    },[type]);

    useEffect(() => {
        fetchInvoices();
      },[currentPage, pageSize, search, type]);

    const openInvoiceDetail = (invoiceId) => {
        setSelectedInvoiceId(invoiceId);
        setVisibleID(true);  
    }

    const getRender = (column) => {
        if(column.name == 'invoiceNo'){
            return {
                render: (invoiceNo, data) => {
                    return (
                        <div>
                            <a onClick={() => openInvoiceDetail(data.id)} className='underline text-blue-900'>
                            { invoiceNo }
                            </a>
                        </div>
                    )
                }
            }
        }
        return {};
    }

    const  onDelete = async (data) => {
        const isConfirm = confirm('Are you sure you want to delete ?')
        if(isConfirm){
            const response = await deleteInvoice(data.id);
            if(response?.data?.status){
                sweetalertMessage('Succesfully Deleted')
            }
            else{
                sweetalertValidate('OOPS!! Something went wrong')
            }
            fetchInvoices();
        } 
    }

    const fieldData = InvoiceData;
    const columns = fieldData.map((column) => ({
        title:  ( 
            <Typography.Text ellipsis={true} title={column.label}>
                {column.label == 'Customer' && type === 'purchase' ? 'Vendor' : column.label}
            </Typography.Text>
        ),
        dataIndex: column.name,
        key: column.name,
        width: '150px',
        ...getRender(column)
    }));

    columns.push({
        title: 'Action',
        key: 'operation',
        width: 10,
        render: (data) => {
            return (
                <div className="float-right">
                    
                    <Button key={'delete'+data.id} type="secondary" onClick={() => onDelete(data)} className="ml-2" title="Delete">
                        <DeleteOutlined />
                    </Button>
                </div>
            );
        },
    });

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
            <div className="site-layout-background p-5">
                <Title level={3} style={{color: 'rgba(107, 114, 128, var(--tw-text-opacity))'}} className='border-b-2' >Generate { type == 'sale' ? 'Invoice' : 'Purchase'} </Title>
                <InvoiceForm 
                    customers={customers} 
                    type={type}
                    callback={async (customerId, customerData) => {
                        await fetchInvoices();
                        setSelectedCustomer(customerData)
                        setVisible(true);
                    }}/>
            </div>
            <div className="site-layout-background p-5 mt-1">
                <Title level={3} style={{color: 'rgba(107, 114, 128, var(--tw-text-opacity))'}} className='border-b-2' >{ type == 'sale' ? 'Invoices' : 'Purchases'}</Title>
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
                <PaymentModal visible={visible} setVisible={setVisible} customer={selectedCustomer}  callback={fetchInvoices}/>
                <InvoiceDetailsModal visible={visibleID} setVisible={setVisibleID} invoiceId={selectedInvoiceId} />
            </div>
        </div>
    );
};

export default Invoices;
