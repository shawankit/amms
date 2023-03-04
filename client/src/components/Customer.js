import React, { useEffect, useState } from 'react';
import millify from 'millify';
import { Typography, Row, Col, Statistic, Table, Button, Input } from 'antd';
import CustomerForm from './Forms/CustomerForm';
import { deleteCustomer, getAllCustomers } from '../api';
import CustomerData from '../data/CustomerData';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { sweetalertMessage, sweetalertValidate } from '../util/util';

const { Title } = Typography;

const Customer = () => {

    const [customers, setCustomrs] = useState(null);
    const [editData, setEditData] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [total, setTotal] = useState(0);

    const [search, setSearch] = useState('');

    const fetchCustomers = async () => {
        const response = await getAllCustomers(search, (currentPage - 1) * pageSize, pageSize);
        setCustomrs(response?.data?.entity.rows);
        setTotal(response?.data?.entity.count);
    }

    useEffect(() => {
        fetchCustomers();
      },[currentPage, pageSize, search]);

    const onEdit = (data) => {
        setEditData({...data});
        setTimeout(() => document.getElementById('form-div').scrollIntoView(), 2);
    }

    const  onDelete = async (data) => {
        const isConfirm = confirm('Are you sure you want to delete ?')
        if(isConfirm){
            const response = await deleteCustomer(data.id);
            if(response?.data?.status){
                sweetalertMessage('Succesfully Deleted')
            }
            else{
                sweetalertValidate('OOPS!! Something went wrong')
            }
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
                <Title level={3} style={{color: 'rgba(107, 114, 128, var(--tw-text-opacity))'}} className='border-b-2' >{editData ? 'Edit' : 'Add'} Customer { editData ? `(${editData.name})`: '' }</Title>
                <CustomerForm data={editData} callback={fetchCustomers} setEditData={setEditData}/>
            </div>
            <div className="site-layout-background p-5 mt-1">
                <Title level={3} style={{color: 'rgba(107, 114, 128, var(--tw-text-opacity))'}} className='border-b-2' >Customers</Title>
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

export default Customer;
