import apiClient from "../apiClient.js"


export const signUpUser = async (data) => {
    return apiClient.post('/auth/users/', data)
}

export const signInUser = async (data) => {
    return apiClient.post('auth/jwt/create/', data)
}

export const refreshJWTToken = async (data) => {
    return apiClient.post('auth/jwt/refresh/', data)
}
