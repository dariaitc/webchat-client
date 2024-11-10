
import axiosInstance from '../config/axiosConfig';

export const getCompanyDetailsRequest = async (id) => {
    try {
        const res = await axiosInstance.get(`/api/v1/companies/${id}`);
        const company = res.data?.data?.company
        return company
    } catch (e) {
        return
    }
}