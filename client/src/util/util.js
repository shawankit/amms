import swal from 'sweetalert';
import { _create_, _delete_, _get_, _update_ } from '../api';
import PaymentReceiptData from '../data/PaymenReceiptData';

export function sweetalertValidate(message) {
    swal({
        text: message,
        icon: "error",
        buttons:
        {
            cancel: {
                text: "Cancel",
                value: null,
                visible: false,
                className: "btn-sm btn-default",
                closeModal: true,
            },
            confirm: {
                text: "OK",
                value: true,
                visible: true,
                className: "btn-sm btn-primary",
                closeModal: true
            }
        }
    });
}

export function sweetalertMessage(message) {
    swal({
        text: message,
        icon: "info",
        buttons:
        {
            cancel: {
                text: "Cancel",
                value: null,
                visible: false,
                className: "btn-sm btn-default",
                closeModal: true,
            },
            confirm: {
                text: "OK",
                value: true,
                visible: true,
                className: "btn-sm btn-info",
                closeModal: true
            }
        }
    });
}

export function sweetalertSuccess(message) {
    swal({
		text: "test message",
		icon: "success",
		buttons:
		{
			cancel: {
				text: "Cancel",
				value: null,
				visible: false,
				className: "btn-sm btn-default",
				closeModal: true,
			},
			confirm: {
				text: "OK",
				value: true,
				visible: true,
				className: "btn-sm btn-info",
				closeModal: true
			}
		}
	});
}

export function sweetalertOkCancel(message, confirmFunction, cancelFunction) {
    swal(
        {
            text: message,
            icon: "warning",
            buttons:
            {
                cancel: {
                    text: "Cancel",
                    value: null,
                    visible: true,
                    className: "btn-sm btn-default",
                    closeModal: true,
                },
                confirm: {
                    text: "OK",
                    value: true,
                    visible: true,
                    className: "btn-sm btn-danger",
                    closeModal: true
                }
            }
        }
    ).then(
        function (isConfirm) {
            if (isConfirm) {
                confirmFunction();
            } else {
                cancelFunction();
            }
        }

    );
}

export function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

export const getApiFn = (page) => {
    return (page, search, offset, limit, filters) => _get_(page)(search, offset, limit, filters);
}

export const getFieldData = (page, type) => {
    if(page == 'payment-receipts'){
        return PaymentReceiptData;
    }
}

export const deleteApiFn = (page) => {
    return _delete_(page);
}

export const createApiFn = (page) => {
    return _create_(page);
}

export const updateApiFn = (page) => {
    return _update_(page);
}

export const mappingData = (page, data) => {
    return { ...data };
}

export const getTitle = (column, page) => {
    if((page == 'purchase' || page == 'payments') && (column.name == 'customerName' || column.name == 'customerCode')){
       return column.label.replace('Customer','Vendor');
    }
    if(page == 'payments' && (column.name == 'receiptDate' || column.name == 'via')){
        return column.label.replace('Receipt','Payment');
    }

    if((page == 'vendor') && (column.name == 'name' || column.name == 'code')){
        return column.label.replace('Customer','Vendor');
     }

    return  column.label;
}

export const getPageName = (page) => {
    if(page === 'payment-receipts'){
        return 'Payments History';
    }
    return page.charAt(0).toUpperCase() + page.slice(1);
}
