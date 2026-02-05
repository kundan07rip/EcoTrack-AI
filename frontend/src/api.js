import axios from 'axios';

// This is the address of your "Brain" (Backend)
const API = axios.create({ baseURL: 'http://localhost:5000/api/items' });

export const fetchItems = () => API.get('/all');
export const addItem = (newItem) => API.post('/add', newItem);
export const deleteItem = (id) => API.delete(`/${id}`);