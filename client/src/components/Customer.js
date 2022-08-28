import React, { useEffect, useState } from 'react';
import millify from 'millify';
import { Typography, Row, Col, Statistic, Table, Button } from 'antd';
import CustomerForm from './Forms/CustomerForm';
import { getAllCustomers } from '../api';
import CustomerData from '../data/CustomerData';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const { Title } = Typography;

const Customer = () => {

    const [customers, setCustomrs] = useState(null);
    const [editData, setEditData] = useState(null);

    const fetchCustomers = async () => {
        const response = await getAllCustomers();
        setCustomrs(response?.data?.entity);
    }

    useEffect(() => {
        fetchCustomers();
    },[]);


    const onEdit = (data) => {
        setEditData({...data})
    }

    const  onDelete = async (data) => {
        const isConfirm = confirm('Are you sure you want to delete ?')
        if(isConfirm){
            await deleteGodown(data.id);
            fetchCustomers();
        } 
    }

    const fieldData = CustomerData;
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

    columns.push({
        title: 'Action',
        key: 'operation',
        width: 10,
        render: (data) => {
            return (
                <div className="float-right">
                    <Button key={'edit'+data.id} type="primary" onClick={() => onEdit(data)} title="Edit">
                        <EditOutlined />
                    </Button>
                    
                    <Button key={'delete'+data.id} type="secondary" onClick={() => onDelete(data)} className="ml-2" title="Delete">
                        <DeleteOutlined />
                    </Button>
                </div>
            );
        },
    });

    return (
        <div  style={{ height: 'calc(100vh - 150px)', overflowY :'auto'}}>
            <div className="site-layout-background p-5">
                <Title level={3} style={{color: 'rgba(107, 114, 128, var(--tw-text-opacity))'}} className='border-b-2' >{editData ? 'Edit' : 'Add'} Customer { editData ? `(${editData.name})`: '' }</Title>
                <CustomerForm data={editData} callback={fetchCustomers} setEditData={setEditData}/>
            </div>
            <div className="site-layout-background p-5 mt-1">
                <Title level={3} style={{color: 'rgba(107, 114, 128, var(--tw-text-opacity))'}} className='border-b-2' >Customers</Title>
                <Row className="w-full">
                    <Col span={24}>
                        <Table
                            dataSource={customers} 
                            columns={columns}
                            bordered
                            pagination={ {}}
                            rowKey={(record) => record.id + (new Date().getTime() + Math.random() * 10000)}
                        />
                    </Col>
                </Row> 
            </div>
        </div>
    );
};

export default Customer;
