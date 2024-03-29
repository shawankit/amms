import React, { useEffect, useState } from 'react';
import millify from 'millify';
import { Typography, Row, Col, Statistic, Table, Button, Input } from 'antd';
import { createStocks, getStocks } from '../api';
import { SaveOutlined } from '@ant-design/icons';
import { sweetalertMessage, sweetalertValidate, uuid } from '../util/util';
import moment from 'moment';

const { Title } = Typography;

const Stock = () => {

    const [stocks, setStocks] = useState([]);
    const [reportDate, setReportDate] = useState(moment().format('YYYY-MM-DD'))

    const fetchStocks = async () => {
        console.log(reportDate, 'reportDate');
        const response = await getStocks(reportDate);
        console.log(response)
        setStocks(response?.data?.entity.map((stock) => ({ ...stock, name: stock.milkCategory.name, total: parseFloat(stock.carryForward) + parseFloat(stock.eveningQuantity) + parseFloat(stock.morningQuantity)})));
    }

    useEffect(() => {
        fetchStocks();
    },[reportDate]);

    const onChange = (name, value, data) => {
        const total = parseFloat(data.carryForward || 0 ) + parseFloat(value) + parseFloat(name == 'morningQuantity' ? data.eveningQuantity : data.morningQuantity);
        document.getElementById(`total_${data.id}`).innerHTML = total;
    }

    const getRender = (name) => {
        if(name == 'morningQuantity' || name == 'eveningQuantity'){
            return {
                render: (value, data) => {
                    return (
                        <Input
                            onChange={(e) => onChange(name, e.target.value, data)}
                            defaultValue={value}
                            type='number'
                            key={uuid()}
                            id={`${name}_${data.id}`}
                        />
                    )
                }
            }
        }
        if(name == 'total'){
            return {
                render: (value, data) => {
                    return (
                        <div className='font-bold' id={`total_${data.id}`}>
                           {value}
                        </div>
                    )
                }
            }
        }
        return {};
    }

    const fieldData = [
        {
            label: "Item Name",
            name: 'name',
        },
        {
            label: "Carry Forward",
            name: 'carryForward'
        },
        {
            label: "Morning Quantity",
            name: 'morningQuantity',
        },
        {
            label: "Evening Quantity",
            name: 'eveningQuantity',
        },
        {
            label: "Total",
            name: 'total',
        },
    ];
    const columns = fieldData.map((column) => ({
        title:  ( 
            <Typography.Text ellipsis={true} title={column.label}>
                {column.label}
            </Typography.Text>
        ),
        dataIndex: column.name,
        key: column.name,
        width: '100px',
        align: column.align ? column.align : 'left',
        ...getRender(column.name)
    }));

    const onSave = async () => {
        const stockData = stocks.map((stock) => ({
            id: stock.id,
            categoryId: stock.categoryId,
            carryForward: stock.carryForward,
            morningQuantity: document.getElementById(`morningQuantity_${stock.id}`).value,
            eveningQuantity: document.getElementById(`eveningQuantity_${stock.id}`).value
        }));
        console.log(stockData)
        const response = await createStocks(stockData);
        console.log(response)
        if(response?.data?.status == true){
            sweetalertMessage("Succesfully Saved Stock Details");
        }
        else{
            sweetalertValidate("OOPS Something Went wrong");
        }
    }

    const onChangeDate = (e) => {
        setReportDate(e.target.value);
      }

    return (
        <>
            <div className="site-layout-background p-5 mt-1">
                <Row>
                    <Col span={12}>
                        <div style={{color: 'rgba(107, 114, 128, var(--tw-text-opacity))'}} className='flex border-b-2' >
                            <Title level={3} style={{color: 'rgba(107, 114, 128, var(--tw-text-opacity))'}} className='border-b-2' >
                                { reportDate === moment().format('YYYY-MM-DD') ? "Today's Stocks" : "Stocks" }
                            </Title>
                            <div className=''>
                                <Row>
                                    <Input
                                        type={'date'} 
                                        name={'reportDate'}
                                        onChange={onChangeDate}
                                        key={'invoiceDate'}
                                        value={reportDate}
                                        className='ml-2'
                                    /> 
                                </Row>
                            </div>
                        </div>
                    </Col>
                    <Col span={12}>
                        { reportDate === moment().format('YYYY-MM-DD') && <Button type="primary" className='float-right' icon={ <SaveOutlined /> } onClick={onSave}> Save </Button> }
                    </Col>
                </Row>
               
                <Row className="w-full">
                    <Col span={24}>
                        <Table
                            dataSource={stocks} 
                            columns={columns}
                            bordered
                            scroll={{ y: 'calc(100vh - 300px)' }}
                            pagination={false}
                            rowKey={(record) => record.id + (new Date().getTime() + Math.random() * 10000)}
                        />
                    </Col>
                </Row> 
            </div>
        </>
    );
};

export default Stock;
