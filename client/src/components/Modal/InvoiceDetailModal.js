import React, { useEffect, useState } from 'react';
import { Modal, Button, Row, Col, Table, Typography } from 'antd';
import { getAllMilkCategories, getInvoiceById } from '../../api'; 
import moment from 'moment';
import EditableTable from '../common/EditableTable';

const { Title } = Typography;


const InvoiceDetailsModal = ({ visible , setVisible , invoiceId }) => {
    const [invoiceDetails, setInvoiceDetails] = useState({
        transactions: []
    });
    const [milk, setMilks] = useState({});

    const fetchInvoicesDetails = async (invoiceId) => {
        const response = await getInvoiceById(invoiceId);
        console.log(response);

        const transactions = response?.data?.entity.milkCategory.map((element) => {
            const total  = element.Transaction.rate * element.Transaction.quantity;
            return ({
                categoryName: element.name,
                rate: element.Transaction.rate,
                quantity: element.Transaction.quantity,
                total: element.Transaction.rate * element.Transaction.quantity,
                gstRate: element.gstRate,
                hsnCode: element.hsn,
                totalWithTax: Math.round((total + (total * element.gstRate) / 100) * 10) / 10
            })
        })

        setInvoiceDetails({ ...response?.data?.entity, transactions});
    }

    useEffect(async () => {
        console.log('calling', invoiceId);
        if(invoiceId){
            await fetchInvoicesDetails(invoiceId);
        }
    }, [invoiceId]);

    return (
        <>
        <Modal
            title={`Invoice Details`}
            visible={visible}
            width={"50%"}
            style={{ top: 75 }}
            keyboard={false}
            onCancel={() => setVisible(false)}
            footer={[]}
        >
            <div className="site-layout-background p-5 mt-1">
                <Row>
                    <Col span={12}>
                        <Title level={3} style={{color: 'rgba(107, 114, 128, var(--tw-text-opacity))'}} className='border-b-2' >
                            Customer Name : {invoiceDetails?.customer?.name}
                        </Title>
                    </Col>
                    <Col span={12}>
                        <Title level={3} style={{color: 'rgba(107, 114, 128, var(--tw-text-opacity))'}} className='border-b-2' >
                            Dated : { moment(invoiceDetails?.invoiceDate).format('DD-MM-YYYY') }
                        </Title>
                    </Col>
                </Row>
                <Row>
                    <Col  span={24}>
                        <EditableTable
                            customerData={invoiceDetails && invoiceDetails.customerId && invoiceDetails?.customer}
                            transactions={invoiceDetails && invoiceDetails?.transactions }
                            milk={{}}
                            notEditable={true}
                        />
                    </Col>
                </Row>
            </div>
                   
        </Modal>
        </>
    );
};

export default InvoiceDetailsModal;