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

export const getAllCustomers = (search, offset, limit) => API.get(UrlParamsReplace(`/customers`, {}, { search, offset, limit }));
export const getCustomersWithDues = (search, offset, limit) => API.get(UrlParamsReplace(`/customers/dues`, {}, { search, offset, limit }));
export const createCustomer = (customer) => API.post("/customers", customer);
export const updateCustomer = (id, customer) => API.put(`/customers/${id}`, customer);
export const deleteCustomer= (id) => API.delete(`/customers/${id}`);

export const getAllMilkCategories = (customerId, search, offset, limit) => API.get(UrlParamsReplace(`/milk-category`, {}, { customerId, search, offset, limit }));
export const createMilCategory = (customer) => API.post("/milk-category", customer);
export const updateMilCategory = (id, customer) => API.put(`/milk-category/${id}`, customer);
export const deleteMilCategory = (id) => API.delete(`/milk-category/${id}`);

export const createInvoice = (invoice) => API.post("/invoices", invoice);
export const getAllInvoices = (search, offset, limit) => API.get(UrlParamsReplace(`/invoices`, {}, { search, offset, limit }));
export const getInvoicesByDate = (date) => API.get(`/invoices?date=${date}`);
export const getInvoiceById = (invoiceId) => API.get(`/invoices/${invoiceId}`);
export const deleteInvoice = (id) => API.delete(`/invoices/${id}`);

export const getDueInvoices = (customerId) => API.get(`/customers/${customerId}/unpaid-invoices`);
export const createPayments = (customerId, payment) => API.post(`/customers/${customerId}/payments`, payment);

export const createStocks = (stocks) => API.post("/stocks", { stocks });
export const getStocks = () => API.get("/stocks");

