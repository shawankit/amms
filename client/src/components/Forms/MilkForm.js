import React, { useEffect, useState } from 'react';
import { Modal, Button, Row, Col, Table, Typography } from 'antd';
import InputField from '../common/InputField';
import { createMilCategory, updateMilCategory } from '../../api'; 
import swal from 'sweetalert';
import { PlusOutlined, RestOutlined } from '@ant-design/icons';
import MilkData from '../../data/MilkData';
import SelectField from '../common/SelectField';


const MilkFom = ({ data , callback, setEditData}) => {

    const initialData = MilkData.reduce((previous, field) => ({...previous,[field.name]: field.defaultValue ? field.defaultValue : ''}),{});
    const [formData, setFormData] = useState(initialData);
    const [rateDisbaled, setRateDiabled] = useState(true);

    const onChange = (e) => {
        setFormData({...formData,[e.target.name]: e.target.value});
    }

    const onSelectChange = (name, value) => {
        if(name == 'taxable' ){
            if( value == 'Yes') setRateDiabled(false);
            else  setRateDiabled(true);
        }

        setFormData({...formData,[name]: value});
        
    }

    useEffect(() => {
        setFormData(data);
    },[data])

    const onSubmit = async (close) => {
        console.log(formData);
    
        if(data) {
            let response = await updateMilCategory(data.id,formData);
            console.log(response);
            if(response?.data?.status == true){
                swal("Succesfully updated milk details", "success");
            }
            else{
                swal("OOPS Something Went wrong", "error");
            }
        }
        else{
            let response = await createMilCategory(formData);
            console.log(response);
            if(response?.data?.status == true){
                swal("Succesfully added milk details", "success");
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

    const taxable =  [{ value: 'Yes', name: 'Yes' }, { value: 'No', name: 'No'} ];
    const gstRate =  [{ value: 0, name: '0 %' },  { value: 1, name: '1 %'}, { value: 1.5, name: '1.5 %'},
    { value: 3, name: '3 %'}, { value: 5, name: '5 %'}, { value: 7.5, name: '7.5 %'}, { value: 12, name: '12 %'}, { value: 18, name: '18 %'} ];

    return (
        <>
            <div>
                <Row>
                    { 
                        MilkData.map((field) => field.type == 'input' ?
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
                                value={formData ? formData[field.name] : field.defaultValue}
                                showArrow={false}
                                onChange={(value) => onSelectChange(field.name, value)}
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                filterSort={(optionA, optionB) =>
                                    optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                }
                                key={field.name}
                                disabled={field.name == 'gstRate' ? rateDisbaled : false}
                            />
                        )
                    }     
                </Row>
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

export default MilkFom;

// TazzaLitre rate Taaza rate Slim rate Gold rate 200ml rate Double rate 250ml rate Lassi rate Shakti rate
// LitreDahi rate 200D rate 400D rate Metro rate Rich rate Paneer rate
// Mistidahi rate Tazza5litre rate
