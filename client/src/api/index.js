import axios from 'axios';

const url = `http://${window.location.hostname}:8000`;
const API = axios.create({ baseURL : url});

export const getAllCustomers = () => API.get(`/customers`);
export const getCustomersWithDues = () => API.get(`/customers/dues`);
export const createCustomer = (customer) => API.post("/customers", customer);
export const updateCustomer = (id, customer) => API.put(`/customers/${id}`, customer);
export const deleteCustomer= (id) => API.delete(`/customers/${id}`);

export const getAllMilkCategories = (customerId) => API.get(`/milk-category${customerId ? '?customerId=' + customerId : ''}`);
export const createMilCategory = (customer) => API.post("/milk-category", customer);
export const updateMilCategory = (id, customer) => API.put(`/milk-category/${id}`, customer);
export const deleteMilCategory = (id) => API.delete(`/milk-category/${id}`);

export const createInvoice = (invoice) => API.post("/invoices", invoice);
export const getAllInvoices = () => API.get(`/invoices`);
export const getInvoicesByDate = (date) => API.get(`/invoices?date=${date}`);
export const getInvoiceById = (invoiceId) => API.get(`/invoices/${invoiceId}`);

export const getDueInvoices = (customerId) => API.get(`/customers/${customerId}/unpaid-invoices`);
export const createPayments = (customerId, payment) => API.post(`/customers/${customerId}/payments`, payment);

export const createStocks = (stocks) => API.post("/stocks", { stocks });
export const getStocks = () => API.get("/stocks");

