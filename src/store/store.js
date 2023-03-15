import {create} from 'zustand'
import {persist} from "zustand/middleware"

export const useStore = create(persist((set, get) => ({
        JWTAccessToken: null,
        JWTRefreshToken: null,

        setJWTPairTokens: ({access, refresh}) => set(state => ({
            JWTAccessToken: access,
            JWTRefreshToken: refresh
        })),
    }),

    {name: 'cloudServiceStorage'}))
