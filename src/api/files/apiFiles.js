import apiClient from "../apiClient.js"


export const getRootFiles = async (jwtToken) => {
    return apiClient.get('files/', {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        },
        params: {
            'only_root': true
        }
    })
}