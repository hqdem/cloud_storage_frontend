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
