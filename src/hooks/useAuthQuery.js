import {useQuery} from "react-query"
import {createDir} from "../api/dirs/apiDirs.js"
import {refreshJWTToken} from "../api/auth/apiAuth.js"
import {useStore} from "../store/store.js"

export const useAuthQuery = ({func, onSuccessFunc, queryKey, enabled, retry, setIsRedirect}) => {
    const JWTRefreshToken = useStore(state => state.JWTRefreshToken)
    const setJWTPairTokens = useStore(state => state.setJWTPairTokens)

    const queryObj = useQuery({
        queryKey: queryKey,
        queryFn: func,
        enabled: enabled,
        retry: retry,
        onSuccess: onSuccessFunc,
        onError: (err) => {
            if (err.response.status === 403) {
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
                        setIsRedirect(true) // setter ?
                    }
                )
            }
        }
    })
    return queryObj
}
