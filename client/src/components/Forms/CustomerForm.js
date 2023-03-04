import React, { useEffect, useState } from 'react';
import { Modal, Button, Row, Col, Table, Typography } from 'antd';
import InputField from '../common/InputField';
import { createCustomer, updateCustomer } from '../../api'; 
import swal from 'sweetalert';
import CustomerData from '../../data/CustomerData';
import SelectField from '../common/SelectField';
import { PlusOutlined, RestOutlined } from '@ant-design/icons';
import MilkBulkFom from './MillBulkForm';


const CustomerForm = ({ data , callback, setEditData}) => {

    const initialData = CustomerData.reduce((previous, field) => ({...previous,[field.name]: ''}),{});
    const [formData, setFormData] = useState(initialData);

    const onChange = (e) => {
        setFormData({...formData,[e.target.name]: e.target.value});
    }

    const onSelectChange = (name, value) => {
        setFormData({...formData,[name]: value});
    }

    useEffect(() => {
        setFormData(data);
    },[data])

    const setRatesToData = (data) => {
        setFormData({
            ...formData,
            rates: Object.values(data)
        })
    }

    const onSubmit = async (close) => {
        console.log(formData);
    
        if(data) {
            let response = await updateCustomer(data.id,formData);
            console.log(response);
            if(response?.data?.status == true){
                swal("Succesfully updated customer details", "success");
            }
            else{
                swal("OOPS Something Went wrong", "error");
            }
        }
        else{
            let response = await createCustomer(formData);
            console.log(response);
            if(response?.data?.status == true){
                swal("Succesfully added customer details", "success");
            }
            else{
                swal("OOPS Something Went wrong", "error");
            }
        }
        reset();
        await callback();
    }

    const reset = () => {
        setFormData(initialData);
        setEditData(null);
    }

    const customerType =  [{ value: 'normal', name: 'Normal' }, { value: 'special', name: 'Special'} ];

    return (
        <>
            <div id='form-div'>
                <Row>
                    { 
                        CustomerData.map((field) => field.type == 'input' ?
                            <InputField
                                label={field.label}
                                type={field.inputType} 
                                name={field.name}
                                onChange={onChange}
                                key={field.name}
                                value={formData ? formData[field.name] : ''}
                            /> : 
                            <SelectField
                                label={field.label}
                                option={eval(field.list).map((item) => ({ value: item.value, text: item.name}))}
                                showSearch
                                optionFilterProp="children"
                                value={formData ? formData[field.name] : ''}
                                showArrow={false}
                                onChange={(value) => onSelectChange(field.name, value)}
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                filterSort={(optionA, optionB) =>
                                    optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                }
                                key={field.name}
                            />
                        )
                    }     
                </Row>
                {
                    formData?.type === 'special' ? <MilkBulkFom customerId={data?.id} type={formData.type} setRatesToData={setRatesToData}/> : null
                }
                <Row>
                    <Col span={24} className='text-right'>
                        <Button onClick={() => reset()} className='mr-4' icon={ <RestOutlined />}>
                            Reset
                        </Button>
                        <Button type="primary" onClick={() => onSubmit()} icon={ <PlusOutlined />} >
                            { data ? 'Edit' : 'Add' } 
                        </Button>
                    </Col>
                
                </Row>
            </div>
        </>
    );
};

export default CustomerForm;

// TazzaLitre rate Taaza rate Slim rate Gold rate 200ml rate Double rate 250ml rate Lassi rate Shakti rate
// LitreDahi rate 200D rate 400D rate Metro rate Rich rate Paneer rate
// Mistidahi rate Tazza5litre rate
