
import axiosInstance from '../config/axiosConfig';

export const getUserChatMsgsRequests = async (userIdentifierId,chatId,sort='+msgTime') => {
    try {
        const res = await axiosInstance.get(`/api/v1/users/${userIdentifierId}/chats/${chatId}/msgs?sort=${sort}`);
        const msgs = res.data?.data?.data
        return msgs
    } catch (e) {
        return
    }
}