import axios from 'axios';
import * as product from './constants';

const getData = async () => {
    try {
        const result = await axios.get(product.URL);
        return {
            type: product.GET_LIST,
            value: result.data
        };
    } catch (e) {
        console.log(e);
        throw e;
    }
}
const getDataById = async (id) => {
    try {
        const result = await axios.get(`${product.URL}${id}`);
        return {
            type: product.GET_BY_ID,
            value: result.data
        };
    } catch (e) {
        console.log(e);
        throw e;
    }
}

const postData = async (formData) => {
    try {
        const result = await axios.post(`${product.URL}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
        console.log(result);
    } catch (e) {
        console.log(e);
        throw e;
    }
}

const updateData = async (formData, id) => {
    try {
        const result = await axios.put(`${product.URL}${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
        console.log(result);
    } catch (e) {
        console.log(e);
        throw e;
    }
}

const deleteData = async (id) => {
    try {
        const result = await axios.delete(`${product.URL}${id}`);
        console.log(result);
    } catch (e) {
        console.log(e);
        throw e;
    }
}

const getLike = async (search) => {
    try {
        const result = await axios.get(`${product.URL}get/${search}`);
        return {
            type: product.GET_BY_SEARCH,
            value: result.data
        };
    } catch (error) {
        console.error(error);
    }
}
export { getData, getDataById, postData, updateData, deleteData, getLike };