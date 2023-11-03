import { client } from "./client.js";

export const handleLogic = {
    getAPIKey: async function (query = {}) {
        const queryString = new URLSearchParams(query).toString();
        const { data } = await client.get(`/api-key?${queryString}`);
        if (data.status_code === "SUCCESS") {
            const apiKey = data.data.apiKey;
            localStorage.setItem("apiKey", apiKey);
        }
        return data;
    },

    getProfile: async function () {
        const apiKey = localStorage.getItem("apiKey");
        const { data } = await client.get(`/users/profile`, apiKey);
        return data;
    },

    getListProduct: async function (query = {}) {
        const queryString = new URLSearchParams(query).toString();
        const { data } = await client.get(`/products?${queryString}`);
        return data;
    },

    postPayment: async function (body) {
        const apiKey = localStorage.getItem("apiKey");
        const { data } = await client.post(`/orders`, body, apiKey);
        return data;
    },
};
