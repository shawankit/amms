import React, { useEffect, useState } from 'react';
import millify from 'millify';
import { Typography, Row, Col, Statistic, Table, Button } from 'antd';
import { deleteMilCategory, getAllMilkCategories } from '../api';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import MilkData from '../data/MilkData';
import MilkFom from './Forms/MilkForm';
import { sweetalertMessage, sweetalertValidate } from '../util/util';

const { Title } = Typography;

const MilkCategory = () => {

    const [milk, setMilks] = useState(null);
    const [editData, setEditData] = useState(null);

    const fetchMilkCategories = async () => {
        const response = await getAllMilkCategories();
        setMilks(response?.data?.entity);
    }

    useEffect(() => {
        fetchMilkCategories();
    },[]);


    const onEdit = (data) => {
        setEditData({...data})
    }

    const  onDelete = async (data) => {
        const isConfirm = confirm('Are you sure you want to delete ?')
        if(isConfirm){
            const response = await deleteMilCategory(data.id);
            if(response?.data?.status){
                sweetalertMessage('Succesfully Deleted')
            }
            else{
                sweetalertValidate('OOPS!! Something went wrong')
            }
            fetchMilkCategories();
        } 
    }

    const fieldData = MilkData;
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
        <>
            <div className="site-layout-background p-5">
                <Title level={3} style={{color: 'rgba(107, 114, 128, var(--tw-text-opacity))'}} className='border-b-2' >{editData ? 'Edit' : 'Add'} Milk Category { editData ? `(${editData.name})`: '' }</Title>
                <MilkFom data={editData} callback={fetchMilkCategories} setEditData={setEditData}/>
            </div>
            <div className="site-layout-background p-5 mt-1">
                <Title level={3} style={{color: 'rgba(107, 114, 128, var(--tw-text-opacity))'}} className='border-b-2' >Milk Categories</Title>
                <Row className="w-full">
                    <Col span={24}>
                        <Table
                            dataSource={milk} 
                            columns={columns}
                            bordered
                            pagination={ {}}
                            rowKey={(record) => record.id + (new Date().getTime() + Math.random() * 10000)}
                        />
                    </Col>
                </Row> 
            </div>
        </>
    );
};

export default MilkCategory;
