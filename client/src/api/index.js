import axios from 'axios';

const url = `http://${window.location.hostname}:8000`;
const API = axios.create({ baseURL : url});


const UrlParamsReplace = (url, params = {}, queryParams = {}) => {
    let urlWithPrefix = `${url}`;
    if (params) {
      Object.keys(params).forEach(
        (key) => (urlWithPrefix = urlWithPrefix.replace(`:${key}`, params[key]))
      );
    }
    const queryParamsWithoutNull = {};
    if (queryParams) {
      Object.keys(queryParams).forEach((key) => {
        if (queryParams[key] !== undefined && queryParams[key] !== null) {
          queryParamsWithoutNull[key] = queryParams[key];
        }
      });
      const urlSearchParams = new URLSearchParams(queryParamsWithoutNull);
      urlWithPrefix += `?${urlSearchParams.toString()}`;
    }
    return urlWithPrefix;
  };

export const getAllCustomers = (search, offset, limit, isVendor = false) => API.get(UrlParamsReplace(`/customers`, {}, { search, offset, limit, isVendor }));
export const getCustomersWithDues = (search, offset, limit) => API.get(UrlParamsReplace(`/customers/dues`, {}, { search, offset, limit }));
export const createCustomer = (customer) => API.post("/customers", customer);
export const updateCustomer = (id, customer) => API.put(`/customers/${id}`, customer);
export const deleteCustomer= (id) => API.delete(`/customers/${id}`);

export const getAllMilkCategories = (customerId, search, offset, limit) => API.get(UrlParamsReplace(`/milk-category`, {}, { customerId, search, offset, limit }));
export const createMilCategory = (customer) => API.post("/milk-category", customer);
export const updateMilCategory = (id, customer) => API.put(`/milk-category/${id}`, customer);
export const deleteMilCategory = (id) => API.delete(`/milk-category/${id}`);

export const createInvoice = (invoice) => API.post("/invoices", invoice);
export const getAllInvoices = (type, search, offset, limit) => API.get(UrlParamsReplace(`/invoices`, {}, { type, search, offset, limit }));
export const getInvoicesByDate = (date) => API.get(`/invoices?date=${date}`);
export const getInvoiceById = (invoiceId) => API.get(`/invoices/${invoiceId}`);
export const deleteInvoice = (id) => API.delete(`/invoices/${id}`);

export const getDueInvoices = (customerId) => API.get(`/customers/${customerId}/unpaid-invoices`);
export const createPayments = (customerId, payment) => API.post(`/customers/${customerId}/payments`, payment);

export const createStocks = (stocks) => API.post("/stocks", { stocks });
export const getStocks = (date) => API.get(`/stocks?date=${date}`);
export const getStocksByDate = (date) => API.get(`/stocks-by-date?date=${date}`);

export const _get_ = (entityName) => (search, offset, limit, filters) => API.get(UrlParamsReplace(`/${entityName}`, {}, { search, offset, limit, filters }));
export const _create_ = (entityName) => (item) => API.post(`/${entityName}`, item);
export const _update_ = (entityName) => (id, item) => API.put(`/${entityName}/${id}`, item);
export const _delete_ = (entityName) => (id) => API.delete(`/${entityName}/${id}`);

