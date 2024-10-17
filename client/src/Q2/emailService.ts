import axios from "axios";

const API_BASE_URL = "https://flipkart-email-mock.now.sh/";

export const getEmailList = async (page: number = 1) => {
    const response = await axios.get(API_BASE_URL).then((res) => {
        return res.data
    });
    return response
};

export const getEmailBody = async (id: string) => {

    const response = await axios.get(`${API_BASE_URL}?id=${id}`).then((res) => {
        return res.data
    });
    console.log("response", response)
    return response
};
