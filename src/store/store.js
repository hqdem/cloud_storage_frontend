import {create} from 'zustand'
import {persist} from "zustand/middleware"

export const useStore = create(persist((set, get) => ({
        JWTAccessToken: null,
        JWTRefreshToken: null,

        setJWTAccessToken: (token) => set(state => ({JWTAccessToken: token})),
        setJWTRefreshToken: (token) => set(state => ({JWTRefreshToken: token})),
        setJWTPairTokens: ({access, refresh}) => set(state => ({
            JWTAccessToken: access,
            JWTRefreshToken: refresh

        }))
    }),

    {name: 'jwtTokenPair'}))
