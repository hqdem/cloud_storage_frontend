import apiClient from "../apiClient.js"


export const getRootDirs = async () => {
    return apiClient.get('dirs/', {
        params: {
            'only_root': true
        }
    })
}

export const getRetrieveDir = async (dirID) => {
    return apiClient.get(`dirs/${dirID}/`)
}
