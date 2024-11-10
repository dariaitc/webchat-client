
import axiosInstance from '../config/axiosConfig';

export const loginRequest = async (userIdentifierId) => {
    try {
        const reqBody = {
            userIdentifierId
        }
        const res = await axiosInstance.post(`/api/v1/auth/login`, reqBody);
        const user = res.data?.data?.user
        return user
    } catch (e) {
        return
    }
}