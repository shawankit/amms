import React, { useEffect, useState } from 'react';
import millify from 'millify';
import { Typography, Row, Col, Statistic, Table, Button } from 'antd';
import CustomerForm from './Forms/CustomerForm';
import { getAllCustomers, getAllInvoices } from '../api';
import InvoiceData from '../data/InvoiceData';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import InvoiceForm from './Forms/InvoiceForm';
import moment from 'moment';
import PaymentModal from './Modal/PaymentModal';

const { Title } = Typography;

const Invoices = () => {

    const [customers, setCustomers] = useState(null);
    const [invoices, setInvoices] = useState(null);
    const [visible, setVisible] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    const fetchCustomers = async () => {
        const response = await getAllCustomers();
        setCustomers(response?.data?.entity);
    }

    const fetchInvoices = async () => {
        const response = await getAllInvoices();
        setInvoices(response?.data?.entity.map((inv) => ({
            ...inv,
            customerName: inv.customer.name,
            createdAt: moment(inv.createdAt).format('DD-MM-YYYY'),
            paymentDate: inv.paymentDate ? moment(inv.paymentDate).format('DD-MM-YYYY') : null
        })));
    }

    useEffect(() => {
        fetchCustomers();
        fetchInvoices();
    },[]);

    const fieldData = InvoiceData;
    const columns = fieldData.map((column) => ({
        title:  ( 
            <Typography.Text ellipsis={true} title={column.label}>
                {column.label}
            </Typography.Text>
        ),
        dataIndex: column.name,
        key: column.name,
        width: '150px'
    }));

    return (
        <div  style={{ height: 'calc(100vh - 150px)', overflowY :'auto'}}>
            <div className="site-layout-background p-5">
                <Title level={3} style={{color: 'rgba(107, 114, 128, var(--tw-text-opacity))'}} className='border-b-2' >Generate Invoice </Title>
                <InvoiceForm 
                    customers={customers} 
                    callback={async (customerId, customerData) => {
                        await fetchInvoices();
                        setSelectedCustomer(customerData)
                        setVisible(true);
                    }}/>
            </div>
            <div className="site-layout-background p-5 mt-1">
                <Title level={3} style={{color: 'rgba(107, 114, 128, var(--tw-text-opacity))'}} className='border-b-2' >Invoices</Title>
                <Row className="w-full">
                    <Col span={24}>
                        <Table
                            dataSource={invoices} 
                            columns={columns}
                            bordered
                            pagination={ {}}
                            rowKey={(record) => record.id + (new Date().getTime() + Math.random() * 10000)}
                        />
                    </Col>
                </Row> 
                <PaymentModal visible={visible} setVisible={setVisible} customer={selectedCustomer}  callback={fetchInvoices}/>
            </div>
        </div>
    );
};

export default Invoices;
