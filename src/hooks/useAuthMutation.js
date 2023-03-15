import React, {useEffect, useState} from 'react'
import {useStore} from "../store/store.js"
import {useMutation} from "react-query"
import {refreshJWTToken} from "../api/auth/apiAuth.js"

export const useAuthMutation = ({func, onSuccessFunc, onErrorFunc}) => {
    const [isRedirect, setIsRedirect] = useState(false)

    const JWTAccessToken = useStore(state => state.JWTAccessToken)
    const JWTRefreshToken = useStore(state => state.JWTRefreshToken)
    const setJWTPairTokens = useStore(state => state.setJWTPairTokens)


    useEffect(() => {
        if (isRedirect)
            document.location.replace('/login')
    }, [isRedirect])

    useEffect(() => {
        if (!JWTAccessToken)
            setIsRedirect(true)
    }, [])

    const mutationObj = useMutation({
        mutationFn: func,
        onSuccess: onSuccessFunc,
        onError: (err) => {
            if (onErrorFunc)
                onErrorFunc()
            if (err.response.status === 403) {
                refreshJWTToken({refresh: JWTRefreshToken}).then(
                    (res) => {
                        const data = res.data
                        setJWTPairTokens({
                            access: data.access,
                            refresh: data.refresh
                        })
                        mutationObj.mutate()
                    },
                    (err) => {
                        setIsRedirect(true)
                    }
                )
            }
        }
    })
    return mutationObj
}