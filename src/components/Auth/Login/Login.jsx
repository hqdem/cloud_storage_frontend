import React, {useState} from 'react'
import classes from './login.module.css'
import {useQuery} from "react-query"
import {signInUser} from "../../../api/auth/apiAuth.js"
import {useStore} from "../../../store/store.js"
import {Link} from "react-router-dom"

const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [errors, setErrors] = useState({
        username: null,
        password: null
    })
    const [nonFieldsErrors, setNonFieldsErrors] = useState(null)
    const [nonFieldsInfo, setNonFieldsInfo] = useState(null)

    const setJWTPairTokens = useStore(state => state.setJWTPairTokens)


    const {isLoading, refetch} = useQuery({
        queryKey: ['login'],
        queryFn: () => signInUser({
            username: username,
            password:password
        }),
        enabled: false,
        retry: false,
        onError: (err) => {
            const errData = err.response.data
            if (err.response.status === 401) {
                setErrors({
                    username: null,
                    password: null
                })
                setNonFieldsErrors(errData.detail)
            }
            else {
                const usernameError = errData.username ? errData.username : null
                const passwordError = errData.password ? errData.password : null

                setNonFieldsErrors(null)
                setErrors({
                    username: usernameError,
                    password: passwordError
                })
            }

        },
        onSuccess: (data) => {
            console.log(data)
            const resData = data.data
            setJWTPairTokens({
                access: resData.access,
                refresh: resData.refresh
            })

            setNonFieldsInfo('Успешный логин. Редирект на главную через 3 секунды.')
            setTimeout(() => {
                window.location.replace('/')
            }, 3000)
        }
    })

    const onSubmitClick = (e) => {
        e.preventDefault()
        refetch()
    }

    if (isLoading)
        return <div>Loading...</div>

    return (
        <div className={classes.login_form}>
            <div className={classes.sign_up_btn}>
                <Link to={'/signup'}>
                    Регистрация
                </Link>
            </div>
            <div className={classes.non_fields_info}>
                {nonFieldsInfo ? <p>{nonFieldsInfo}</p> : null}
            </div>
            <div className={classes.non_fields_errors}>
                {nonFieldsErrors ? <p>{nonFieldsErrors}</p> : null}

            </div>

            <form>
                <input type="text" placeholder="username" value={username}
                       onChange={(e) => setUsername(e.target.value)}/>
                <div className={classes.input_error}>
                    {errors.username ? errors.username.map(el => <p key={el}>{el}</p>) : null}

                </div>
                <input type="text" placeholder="password" value={password}
                       onChange={(e) => setPassword(e.target.value)}/>
                <div className={classes.input_error}>
                    {errors.password ? errors.password.map(el => <p key={el}>{el}</p>) : null}

                </div>

                <button type="submit" className={classes.form_btn} onClick={onSubmitClick}>
                    Вход
                </button>
            </form>
        </div>
    )
}

export default Login
