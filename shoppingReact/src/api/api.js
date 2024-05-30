
import axios from 'axios';

const API_URL = 'http://localhost:8000'; 

export const getListNames = async () => {
  const response = await axios.get(`${API_URL}/listName/`);
  return response.data;
};

export const getLists = async () => {
  const response = await axios.get(`${API_URL}/list/`);
  return response.data;
};

export const createListName = async (name) => {
  const response = await axios.post(`${API_URL}/listName/`, { name });
  return response.data;
};

export const createList = async (name, value, listNameId, done) => {
    const response = await axios.post(`${API_URL}/list/`, {
      name,
      value,
      listName: listNameId,
      done,
    });
    return response.data;
  };
  

export const deleteListName = async (id) => {
  const response = await axios.delete(`${API_URL}/listName/${id}/`);
  return response.data;
};

export const deleteList = async (id) => {
  const response = await axios.delete(`${API_URL}/list/${id}/`);
  return response.data;
};

export const updateList = async (id, done) => {
    const response = await axios.patch(`${API_URL}/list/${id}/`, { done });
    return response.data;
  };
  