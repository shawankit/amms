const PaymentReceiptData = [
    {
        label : "Customer",
        name: 'customerId',
        type: 'input',
        inputType: 'text'
    },
    {
        label : "Payemnt Date",
        name: 'createdAt',
        type: 'input',
        inputType: 'date'
    },
    {
        label : "Payment Mode",
        name: 'paymentMode',
        type: 'select',
    },
   
    {
        label : "Amout Received",
        name: 'amountReceived',
        type: 'input',
        inputType: 'text',
    }
];

export default PaymentReceiptData;