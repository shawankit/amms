import React, { useEffect, useState } from 'react';
import { Modal, Button, Row, Col, Table, Typography } from 'antd';
import InputField from '../common/InputField';
import { createInvoice, getAllMilkCategories } from '../../api'; 
import swal from 'sweetalert';
import SelectField from '../common/SelectField';
import { PlusOutlined, RestOutlined } from '@ant-design/icons';
import EditableTable from '../common/EditableTable';
import moment from 'moment';
import { sweetalertValidate } from '../../util/util';


const InvoiceForm = ({ data, customers , callback, setEditData}) => {
    const initialData = { 
        invoiceNo:'' ,
        customerId: '' , 
        total: '', 
        transactions: [], 
        invoiceDate: moment().format('YYYY-MM-DD')
    }

    const [formData, setFormData] = useState(initialData);
    const customerMap = customers ? customers.reduce((previous, current) => ({...previous,[current.id]: current}), {}) : {};
    const [milk, setMilks] = useState({});

    const fetchMilkCategories = async () => {
        const customerData = formData && formData.customerId && customerMap[formData.customerId]
        const response = await getAllMilkCategories(customerData && customerData.type == 'special' ? customerData.id : undefined);
        const milkMap = response?.data?.entity?.reduce((previous, current) => ({...previous, [current.id]: current}), {});
        setMilks(milkMap);
    }

    useEffect(async () => {
        await fetchMilkCategories();
    }, [formData]);

    const onChange = (e) => {
        setFormData({...formData,[e.target.name]: e.target.value});
    }

    const onSelectChange = (name, value) => {
        setFormData({...formData,[name]: value});
    }

    const onSubmit = async (close) => {
        console.log(formData);
        if(!formData.transactions || formData.transactions?.length == 0){
            sweetalertValidate('Please insert atleast one item');
            return;
        }
        if(formData.customerId == ''){
            sweetalertValidate('Please select customer');
            return;
        }
        formData.total = formData.transactions.reduce((total,t) => total + (t.totalWithTax), 0);
    
        let response = await createInvoice(formData);
        console.log(response);
        if(response?.data?.status == true){
            swal("Succesfully generated invoice details", "success");
            reset();    
            await callback(formData.customerId, response.data.entity.customer);
        }
        else{
            swal("OOPS Something Went wrong", "error");
        }
        
    }

    const reset = () => {
        setFormData(initialData);
    }

    const setTransactions = (transactions) => {
        setFormData({...formData,'transactions': transactions});
    }

    return (
        <>
            <div>
                <Row>
                    <SelectField
                        label={'Customer'}
                        option={customers ? customers.map((item) => ({ value: item.id, text: item.name})) : []}
                        showSearch
                        optionFilterProp="children"
                        value={formData ? formData['customerId'] : ''}
                        showArrow={false}
                        onChange={(value) => onSelectChange('customerId', value)}
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        filterSort={(optionA, optionB) =>
                            optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                        }
                        key={'customerId'}
                    /> 
                    <InputField
                        label={'Dated'}
                        type={'date'} 
                        name={'invoiceDate'}
                        onChange={onChange}
                        key={'invoiceDate'}
                        value={formData ? formData['invoiceDate'] : ''}
                    />     
                </Row>
                <Row>
                    <Col  span={24}>
                        <EditableTable 
                            setTransactions={setTransactions}
                            customerData={formData && formData.customerId && customerMap[formData.customerId]}
                            transactions={formData && formData.transactions}
                            milk={milk}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col span={24} className='text-right'>
                        <Button onClick={() => reset()} className='mr-4' icon={ <RestOutlined />}>
                            Reset
                        </Button>
                        <Button type="primary" onClick={() => onSubmit()} icon={ <PlusOutlined />} >
                            { 'Generate Invoice' } 
                        </Button>
                    </Col>
                
                </Row>
            </div>
        </>
    );
};

export default InvoiceForm;
