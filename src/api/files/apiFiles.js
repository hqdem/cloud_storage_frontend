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

export const createRootFile = async (data, jwtToken) => {
    return apiClient.post('files/', data, {
        headers: {
            Authorization: `Bearer ${jwtToken}`,
            "Content-Type": "multipart/form-data"
        }
    })
}

export const deleteFile = async (fileId, jwtToken) => {
    return apiClient.delete(`files/${fileId}/`, {
        headers: {
            Authorization: `Bearer ${jwtToken}`,
        }
    })
}

export const addSharedUserToFile = async (fileId, data, jwtToken) => {
    return apiClient.post(`files/${fileId}/add_shared_user/`, data, {
        headers: {
            Authorization: `Bearer ${jwtToken}`,
        }
    })
}
