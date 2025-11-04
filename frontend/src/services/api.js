import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const todoAPI = {
    getAllTodos: async () => {
        const response = await api.get('/todos/');
        return response.data;
},

getTodoById: async (id) => {
    const response = await api.get(`/todos/${id}/`);
    return response.data;
},

createTodo: async (todo) => {
    const response = await api.post('/todos/', todo);
    return response.data;
},

updateTodo: async (id, todo) => {
    const response = await api.put(`/todos/${id}/`, todo);
    return response.data;
},

deleteTodo: async (id) => {
    await api.delete(`/todos/${id}/`);
},
};