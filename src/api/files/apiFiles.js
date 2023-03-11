import apiClient from "../apiClient.js"


export const getRootFiles = async () => {
    return apiClient.get('files/', {
        params: {
            'only_root': true
        }
    })
}