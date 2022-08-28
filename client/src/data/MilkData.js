const MilkData = [
    {
        label : "Name",
        name: 'name',
        type: 'input',
        inputType: 'text'
    },
    {
        label : "Rates",
        name: 'rate',
        type: 'input',
        inputType: 'number'
    },
    {
        label : "Taxable",
        name: 'taxable',
        type: 'select',
        inputType: 'text',
        list: 'taxable',
        defaultValue: 'No'
    },
    {
        label : "GST Rate (%)",
        name: 'gstRate',
        type: 'select',
        inputType: 'number',
        list: 'gstRate',
        defaultValue: 0
    }
];

export default MilkData;