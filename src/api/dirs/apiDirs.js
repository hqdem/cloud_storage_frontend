import apiClient from "../apiClient.js"


export const getRootDirs = async (jwtToken) => {
    return apiClient.get('dirs/', {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        },
        params: {
            'only_root': true
        }
    })
}

export const getRetrieveDir = async (dirID, jwtToken) => {
    return apiClient.get(`dirs/${dirID}/`, {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    })
}

export const createDir = async (data, jwtToken) => {
    return apiClient.post('dirs/', data, {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    })
}

export const addFilesToDir = async (dirID, formData, jwtToken) => {
    return apiClient.post(`dirs/${dirID}/add_files/`, formData, {
        headers: {
            Authorization: `Bearer ${jwtToken}`,
            "Content-Type": "multipart/form-data"
        }
    })
}
