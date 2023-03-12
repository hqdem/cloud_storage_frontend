import {create} from 'zustand'
import {persist} from "zustand/middleware"

export const useStore = create(persist((set, get) => ({
        JWTAccessToken: null,
        JWTRefreshToken: null,
        isRerenderDirs: false,
        isRerenderFiles: false,
        isRerenderBoth: false,

        setJWTPairTokens: ({access, refresh}) => set(state => ({
            JWTAccessToken: access,
            JWTRefreshToken: refresh

        })),
        toggleIsRerenderDirs: () => set(state => ({isRerenderDirs: !state.isRerenderDirs})),
        toggleIsRerenderFiles: () => set(state => ({isRerenderFiles: !state.isRerenderFiles})),
        toggleIsRerenderBoth: () => set(state => ({isRerenderBoth: !state.isRerenderBoth}))
    }),

    {name: 'cloudServiceStorage'}))
