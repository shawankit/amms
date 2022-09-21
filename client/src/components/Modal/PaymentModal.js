import React, { useEffect, useState } from 'react';
import { Modal, Button, Row, Col, Table, Typography } from 'antd';
import InputField from '../common/InputField';
import { createPayments, getDueInvoices } from '../../api'; 
import moment from 'moment';
import swal from 'sweetalert';
import InvoiceData from '../../data/InvoiceData';
import { sweetalertOkCancel, sweetalertSuccess, sweetalertValidate } from '../../util/util';

const { Title } = Typography;


const PaymentModal = ({ visible , setVisible , customer , callback}) => {
    const initialData = {
        amountReceived: 0,
        additionalDue: 0
    };
    const [formData, setFormData] = useState(initialData);
    const [invoices, setInvoices] = useState([]);

    const onChange = (e) => {
        setFormData({...formData,[e.target.name]: e.target.value});
    }

    const fetchInvoices = async (customer) => {
        const response = await getDueInvoices(customer?.id);
        console.log(response);
        setInvoices(response?.data?.entity.map((inv) => ({
            ...inv,
            invoiceDate: inv.invoiceDate? moment(inv.invoiceDate).format('DD-MM-YYYY') : null,
            paymentDate: inv.paymentDate ? moment(inv.paymentDate).format('DD-MM-YYYY') : null
        })));
    }

    useEffect(() => {
        if(customer && visible){
            fetchInvoices(customer);
        }
        
    },[customer, visible])

    const onSubmit = async (close) => {
        console.log(formData);
    
        
        let response = await createPayments(customer.id, formData);
        console.log(response);
        if(response?.data?.status == true){
            swal("Succesfully Payment done", 'success');
        }
        else{
            swal("OOPS Something Went wrong", 'error');
        }
        

        if(close) setVisible(false);

        await callback();
        setFormData(initialData);
    }

    const onClose = () => {
        sweetalertOkCancel(
            'Are you sure you want to close without adding amount received ?',
            () => {
                setVisible(false)
            },
            () => {}
        );
    }

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
    })).filter((column) => column.dataIndex !== 'customerName');

    const totalDue = invoices.reduce((total, invoice) => invoice.total + total, 0);

    return (
        <>
        <Modal
            title={`Payment`}
            visible={visible}
            width={"50%"}
            style={{ top: 75 }}
            keyboard={false}
            onCancel={() => onClose()}
            footer={[
                <Button key="cancel" onClick={() => onClose()}>
                    Cancel
                </Button>,
                <Button key="savclose" type="primary" onClick={() => onSubmit(true)}>
                    Save
                </Button>,
                ]}
        >
            <div className="site-layout-background p-5 mt-1">
                <Title level={3} style={{color: 'rgba(107, 114, 128, var(--tw-text-opacity))'}} className='border-b-2' >{customer?.name}'s Due Invoices</Title>
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
                <Row className="w-full">
                    { customer?.previousDue > 0 ? 
                        <>
                            <Col span={24}>
                                <Title level={4} style={{color: 'rgba(107, 114, 128, var(--tw-text-opacity))'}}  >
                                { `Previous Due : ${customer?.previousDue ? Math.round(customer?.previousDue) : 0}`}
                                </Title>
                            </Col>
                            <Col span={24}>
                                <Title level={4} style={{color: 'rgba(107, 114, 128, var(--tw-text-opacity))'}}  >
                                { `Due : ${ customer?.due >= 0 ?  Math.round(customer?.due - customer?.previousDue) : 0 }`}
                                </Title>
                            </Col>
                        </> : null
                    }

                    <Col span={24}>
                        <Title level={4} style={{color: 'rgba(107, 114, 128, var(--tw-text-opacity))'}}  >
                           { customer?.due >= 0 ? `Total Due : ${customer?.due}` : `Total Advance : ${-customer?.due}`}
                        </Title>
                    </Col>
                   
                    <InputField
                        label={'Amount Received'}
                        type={'number'} 
                        name={'amountReceived'}
                        onChange={onChange}
                        key={'amountReceived'}
                        value={formData['amountReceived']}
                        lcol={8}
                        icol={16}
                    />
                     <InputField
                        label={'Previous Due'}
                        type={'number'} 
                        name={'additionalDue'}
                        onChange={onChange}
                        key={'additionalDue'}
                        value={formData['additionalDue']}
                        lcol={8}
                        icol={16}
                    />
                </Row> 
            </div>
                   
        </Modal>
        </>
    );
};

export default PaymentModal;