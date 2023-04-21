import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Form, Input, Popconfirm, Select, Table } from 'antd';
import { uuid } from '../../util/util';

const moveFocusToNextInput = (e) => {
    
}
const EditableRow = ({ index, ...props }) => {
  return (
        <tr {...props} />
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  customerData,
  milk,
  handleAdd,
  ...restProps
}) => {

  const onSave = (name, value) => {
    let newValues = {};
    if( dataIndex === 'categoryName'){
        const gstRate = customerData.type == 'special' ? milk[value].normal.gstRate : milk[value].gstRate;
        newValues = { categoryName: milk[value].name, categoryId: value, rate: milk[value].rate, gstRate, hsnCode: milk[value].hsn };
        if(record.quantity != undefined){
          newValues.total = Math.round(parseFloat(newValues.rate) * parseFloat(record.quantity) * 10) / 10;
          newValues.totalWithTax = Math.round((newValues.total + (newValues.total * newValues.gstRate) / 100) * 10) / 10;
        }
    }

    if(dataIndex == 'quantity' ){
      newValues = { quantity: value };
      if(record.rate != undefined){
        newValues.total =  Math.round(parseFloat(record.rate) * parseFloat(value) * 10) / 10;
        newValues.totalWithTax = Math.round((newValues.total + (newValues.total * record.gstRate) / 100) * 10) / 10 ;
      }
      
    }

    if(dataIndex == 'rate'){
      newValues = { rate: value };
      if(record.quantity != undefined){
        newValues.total =  Math.round(parseFloat(value) * parseFloat(record.quantity) * 10) / 10;
        newValues.totalWithTax = Math.round((newValues.total + (newValues.total * record.gstRate) / 100) * 10) / 10 ;
      }
    }

    handleSave({ ...record, ...newValues });
  };
    let childNode = children;

    if (editable) {
        //childNode = editing ? (
        childNode = record.categoryName != 'Total Amount' ?  ( <>
            { dataIndex !== 'categoryName' ? 
                <Input 
                  type='number' 
                  className="w-full" 
                  onChange={(e) => onSave(dataIndex, e.target.value)} 
                  value={record[dataIndex]}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && dataIndex === 'quantity') {
                      handleAdd();
                      setTimeout(() => {
                        e.target.parentElement.parentElement.nextSibling.children[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].focus();
                      }, 10)
                      
                    }
                  }}
                /> :
                <Select
                    label={'Customer'}
                    editable
                    showSearch
                    optionFilterProp="children"
                    showArrow={false}
                    onChange={(value) => onSave(dataIndex, value)}
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    filterSort={(optionA, optionB) =>
                        optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                    }
                    key={'customerId'}
                    className="w-full"
                >
                    { Object.values(milk).map((ele,index) => <Option value={ele.id} key={index}>{ele.name}</Option>) }
                </Select>
            }
        </>
        ) : (
        <div
            className="editable-cell-value-wrap font-bold"
            style={{
              paddingRight: 24,
              fontSize: '16px',
            }}
        >
            {children}
        </div>
        );
    }

    return <td {...restProps}>{childNode}</td>;
};

const EditableTable = ({ setTransactions, customerData, transactions, milk, notEditable }) => {
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setDataSource(transactions || []);
  },[transactions])

  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    // console.log('handleDelete', newData);
    setDataSource(newData);
    setTransactions(newData);
  };

  const defaultColumns = [
    {
      title: 'Item Name',
      dataIndex: 'categoryName',
      width: '35%',
      editable: !notEditable
    },
    {
      title: 'HSN Code',
      dataIndex: 'hsnCode',
      width: '10%'
    },
    {
      title: 'Rate',
      dataIndex: 'rate',
      width: '10%',
      editable: !notEditable
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      width: '10%',
      editable: !notEditable
    },
    {
      title: 'Total',
      dataIndex: 'total',
      width: '10%',
    },
    {
      title: 'GST Rate (%)',
      dataIndex: 'gstRate',
      width: '10%',
    },
    {
      title: 'Total( inc. tax)',
      dataIndex: 'totalWithTax',
      width: '10%',
    },
  ];

  if(!notEditable){
    defaultColumns.push({
      title: 'Action',
      dataIndex: 'operation',
      width: '5%',
      render: (_, record) =>
       record.categoryName !== 'Total Amount' ? dataSource.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
            <a>Delete</a>
          </Popconfirm>
        ) : null : null,
    })
  }

  const handleAdd = () => {
    const newData = {
      key: uuid(),
      categoryName: `Select Item`,
      rate: 0,
      quantity: 0,
      total: 0,
      gstRate: 0,
      totalWithTax: 0,
      hsnCode: ''
    };
    setDataSource([...dataSource, newData]);
  };

  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    setTransactions(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const columns = defaultColumns.map((col) => {

    return {
      ...col,
      onCell: (record, index) => {
        let __ = {};
        if(record.categoryName == 'Total Amount' && col.dataIndex == 'categoryName' ){
          __ = {
            colSpan: 5
          }
        }

        if(record.categoryName == 'Total Amount' && (col.dataIndex == 'quantity' || col.dataIndex == 'rate' || col.dataIndex == 'gstRate' || col.dataIndex == 'total') ){
          __ = {
            colSpan: 0
          }
        }
        if (!col.editable) {
          return __;
        }
        
        return ({
            record,
            editable: col.editable,
            dataIndex: col.dataIndex,
            title: col.title,
            handleSave,
            customerData,
            milk,
            handleAdd,
            ...__
          })
        },
    };
  });

  const totalRow = {
    key: uuid(),
    categoryName: `Total Amount`,
    totalWithTax: Math.round(dataSource.reduce((total, current) => total + current.totalWithTax, 0))
  }
  return (
    <div>
      { !notEditable ? 
        <Button
          onClick={handleAdd}
          type="primary"
          style={{
            marginBottom: 16,
          }}
        > 
        Add a item
      </Button> : null }
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={[...dataSource, totalRow]}
        columns={columns}
        pagination={false}
      />
    </div>
  );
};

export default EditableTable;