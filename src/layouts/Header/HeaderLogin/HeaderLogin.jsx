import React, {useState} from 'react'
import {getCurrentUser, refreshJWTToken} from "../../../api/auth/apiAuth.js"
import {useStore} from "../../../store/store.js"
import classes from './header_login.module.css'
import {useQuery} from "react-query"
import {Link} from "react-router-dom"

const HeaderLogin = () => {
    const [username, setUsername] = useState('')

    const JWTAccessToken = useStore(state => state.JWTAccessToken)
    const JWTRefreshToken = useStore(state => state.JWTRefreshToken)
    const setJWTPairTokens = useStore(state => state.setJWTPairTokens)



    const {refetch} = useQuery({
        queryKey: ['header_login', JWTAccessToken],
        queryFn: () => getCurrentUser(JWTAccessToken),
        enabled: true,
        retry: false,
        onSuccess: (data) => {
            setUsername(data.data.username)
        },
        onError: (err) => {
            if (err.response.status === 403) {
                refreshJWTToken({refresh: JWTRefreshToken}).then(
                    (res) => {
                        const data = res.data
                        setJWTPairTokens({
                            access: data.access,
                            refresh: data.refresh
                        })
                        return refetch()
                    })
            }
        }
    })

    const logoutOnClick = () => {
        setJWTPairTokens({
            access: '',
            refresh: ''
        })
        document.location.replace('/login')
    }

    return (
        <div>
            {
                username
                    ?
                    <div>
                        <span>{username}</span>
                        <span onClick={logoutOnClick} className={classes.logout}> Выйти</span>
                    </div>
                    :
                    <div>
                        <Link to={'/login'}> <span>Войти </span></Link>
                        <Link to={'/signup'}><span>Регистрация</span></Link>
                    </div>
            }
        </div>
    )
}

export default HeaderLogin
