import axios from "axios";

export const getAllProductService = async () => {
    const res = await axios.get(`https://localhost:7067/api/Product`);
    return res.data;
}

export const deleteProductService = async (id) => {
    const res = await axios.delete(`https://localhost:7067/api/Product/${id}`)
    return res.data
}

export const createProductService = async (data) => {
    const res = await axios.post("https://localhost:7067/api/Product", data);
    return res.data;
}
