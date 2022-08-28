import React, { useEffect, useState } from 'react';
import { Modal, Button, Row, Col, Table, Typography } from 'antd';
import InputField from '../common/InputField';
import { getAllMilkCategories } from '../../api'; 
import swal from 'sweetalert';
const { Title } = Typography;



const MilkBulkFom = ({ customerId , type , setRatesToData}) => {

    const [rates, setRates] = useState({});

    const onChange = (e, data) => {
        const rateObj = {...rates,
            [data.id]: {
                name: data.name, 
                rate: e.target.value,
                categoryId: data.categoryId,
                id: data.id
            }
        }
        setRates(rateObj);
        setRatesToData(rateObj);
    }

    const fetchMilkCategories = async () => {
        const response = await getAllMilkCategories(customerId);
        const data = response?.data?.entity;

        const ratesObj = data.reduce((previous, current) => ({ ...previous, [current.id]: {
            name: current.name, 
            rate: current.rate,
            categoryId: customerId ? data.categoryId: current.id,
            id: current.id
        } }), {})
        setRates(ratesObj);
        setRatesToData(ratesObj);
    }

    useEffect(() => {
        if(type === 'special'){
            fetchMilkCategories();
        }
    },[]);


    return (
        <>
            <div >
                <Title level={4} style={{color: 'rgba(107, 114, 128, var(--tw-text-opacity))'}} className='border-b-2' >Rates</Title>
                <Row style={{ height: '200px', overflowY :'auto'}} className='border-b-2 mb-2'>
                    { 
                        Object.values(rates).map((field) =>
                            <InputField
                                label={field.name}
                                type='number' 
                                name={field.name}
                                onChange={(e) => onChange(e, field)}
                                key={field.id}
                                value={field.rate}
                                lcol={2}
                                icol={2}
                            /> 
                        )
                    }     
                </Row>
            </div>
        </>
    );
};

export default MilkBulkFom;
