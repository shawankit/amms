import swal from 'sweetalert';

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