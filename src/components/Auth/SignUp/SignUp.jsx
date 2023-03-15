import React, {useState} from 'react'
import classes from './signup.module.css'
import {useStore} from "../../../store/store.js"
import {useQuery} from "react-query"
import {signInUser, signUpUser} from "../../../api/auth/apiAuth.js"
import {Link} from "react-router-dom"

const SignUp = () => {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [errors, setErrors] = useState({
        email: null,
        username: null,
        password: null

    })

    const [nonFieldErrors, setNonFieldsErrors] = useState([])
    const [nonFieldsInfo, setNonFieldsInfo] = useState(null)

    const setJWTPairTokens = useStore(state => state.setJWTPairTokens)

    const {isLoading, refetch} = useQuery({
        queryKey: ['signup'],
        queryFn: () => signUpUser({
            email: email,
            username: username,
            password: password
        }),
        enabled: false,
        retry: false,
        onError: (err) => {
            const errData = err.response.data
            const emailError = errData.email ? errData.email : null
            const usernameError = errData.username ? errData.username : null
            const passwordError = errData.password ? errData.password : null

            setErrors({
                email: emailError,
                username: usernameError,
                password: passwordError
            })
        },
        onSuccess: (data) => {
            setErrors({
                email: null,
                username: null,
                password: null
            })
            console.log(data)
            signInUser({
                username: username,
                password: password
            }).then(
                (res) => {
                    data = res.data
                    setJWTPairTokens({
                        access: data.access,
                        refresh: data.refresh
                    })
                    setNonFieldsInfo('Успешная регистрация. Редирект на главную через 3 секунды.')
                    setTimeout(() => {
                        window.location.replace('/')
                    }, 3000)
                },
                (err) => {
                    setNonFieldsErrors(err.response.data.errors)  // check
                }
            )
        }
    })

    const onSubmitClick = (e) => {
        e.preventDefault()
        refetch()
    }

    if (isLoading)
        return <div>Loading...</div>


    return (
        <div className={classes.signup_form}>
            <div className={classes.login_btn}>
                <Link to={'/login'}>
                    Вход
                </Link>
            </div>
            <div className={classes.non_field_info}>
                {nonFieldsInfo ? <p>{nonFieldsInfo}</p> : null}
            </div>
            <div className={classes.non_field_errors}>
                {nonFieldErrors.length ? nonFieldErrors.map((el) => <p key={el}>{el}</p>) : null}
            </div>

            <form>
                <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <div className={classes.input_error}>
                    {errors.email ? errors.email.map(el => <p key={el}>{el}</p>) : null}
                </div>
                <input type="text" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                <div className={classes.input_error}>
                    {errors.username ? errors.username.map(el => <p key={el}>{el}</p>) : null}

                </div>
                <input type="text" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <div className={classes.input_error}>
                    {errors.password ? errors.password.map(el => <p key={el}>{el}</p>) : null}

                </div>

                <button type="submit" className={classes.form_btn} onClick={onSubmitClick}>
                    Регистрация
                </button>
            </form>
        </div>
    )
}

export default SignUp
