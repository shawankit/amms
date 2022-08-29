const InvoiceData = [
    {
        label : "Invoice No.",
        name: 'invoiceNo',
        type: 'input',
        inputType: 'text'
    },
    {
        label : "Date",
        name: 'invoiceDate',
        type: 'input',
        inputType: 'text'
    },
    {
        label : "Customer",
        name: 'customerName',
        type: 'input',
        inputType: 'text'
    },
    {
        label : "Total Amount",
        name: 'total',
        type: 'select',
        inputType: 'text',
        list: "customerType"
    },
    {
        label : "Status",
        name: 'paymentStatus',
        type: 'input',
        inputType: 'text'
    },
    {
        label : "Amount Paid",
        name: 'amountPaid',
        type: 'input',
        inputType: 'text'
    },
    {
        label : "Date Of Payment",
        name: 'paymentDate',
        type: 'input',
        inputType: 'text'
    }
];

export default InvoiceData;