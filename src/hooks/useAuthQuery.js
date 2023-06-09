import {useQuery} from "react-query"
import {refreshJWTToken} from "../api/auth/apiAuth.js"
import {useStore} from "../store/store.js"
import {useEffect, useState} from "react"

export const useAuthQuery = ({func, onSuccessFunc, onErrorFunc, queryKey, enabled, retry}) => {
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

    const queryObj = useQuery({
        queryKey: queryKey,
        queryFn: func,
        enabled: enabled,
        retry: retry,
        onSuccess: onSuccessFunc,
        onError: (err) => {
            if (onErrorFunc)
                onErrorFunc(err)
            if (err.response.status === 403 && err.response.data.detail === 'Данный токен недействителен для любого типа токена') {
                refreshJWTToken({refresh: JWTRefreshToken}).then(
                    (res) => {
                        const data = res.data
                        setJWTPairTokens({
                            access: data.access,
                            refresh: data.refresh
                        })
                        queryObj.refetch()
                    },
                    (err) => {
                        setIsRedirect(true)
                    }
                )
            }
        }
    })
    return queryObj
}
