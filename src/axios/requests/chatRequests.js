
import axiosInstance from '../config/axiosConfig';

export const getUserChatsRequests = async (userIdentifierId,sort='-latestMsgTime') => {
    try {
        const res = await axiosInstance.get(`/api/v1/users/${userIdentifierId}/chats?sort=${sort}`);
        const chats = res.data?.data?.data
        return chats
    } catch (e) {
        return
    }
}