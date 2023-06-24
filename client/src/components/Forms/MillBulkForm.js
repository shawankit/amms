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
            [data.categoryId]: {
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
        const data = response?.data?.entity.rows;

        const ratesObj = data.reduce((previous, current) => ({ ...previous, [customerId ? current.categoryId: current.id]: {
            name: current.name, 
            rate: current.rate,
            categoryId: customerId ? current.categoryId: current.id,
            id: current.id
        } }), {});

        if(customerId){
            const res = await getAllMilkCategories(null);
            const actualCategory = res?.data?.entity.rows;
            actualCategory.forEach((category) => {
                if(!ratesObj[category.id]){
                    ratesObj[category.id] = {
                        name: category.name, 
                        rate: category.rate,
                        categoryId: category.id,
                        id: category.id
                    }
                }
            })
        }

        setRates(ratesObj);
        setRatesToData(ratesObj);
    }

    useEffect(() => {
        if(type === 'special'){
            fetchMilkCategories();
        }
    },[customerId]);


    return (
        <>
            <div >
                <Title level={4} style={{color: 'rgba(107, 114, 128, var(--tw-text-opacity))'}} className='border-b-2' >Rates</Title>
                <Row style={{ overflowY :'auto'}} className='border-b-2 mb-2'>
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
