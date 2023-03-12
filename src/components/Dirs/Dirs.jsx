import React, {useEffect, useState} from 'react'
import DirItem from "./DirItem/DirItem.jsx"
import classes from './dirs.module.css'
import {useQuery} from "react-query"
import {useStore} from "../../store/store.js"
import {getRootDirs} from "../../api/dirs/apiDirs.js"
import {refreshJWTToken} from "../../api/auth/apiAuth.js"

const Dirs = () => {

    const [isRedirect, setIsRedirect] = useState(false)
    const [rootDirs, setRootDirs] = useState([])

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

    const {isLoading, refetch} = useQuery({
        queryKey: ['dirs'],
        queryFn: () => getRootDirs(JWTAccessToken),
        retry: false,
        onError: (err) => {
            if (err.response.status === 403) {
                refreshJWTToken({refresh: JWTRefreshToken}).then(
                    (res) => {
                        const data = res.data
                        setJWTPairTokens({
                            access: data.access,
                            refresh: data.refresh
                        })
                        refetch()
                    },
                    (err) => {
                        setIsRedirect(true)
                    }
                )
            }
        },
        onSuccess: (data) => {
            setRootDirs(data.data)
        }
    })

    if (isLoading)
        return <div>Loading...</div>

    return (
        <div>
            <div className={classes.dirs_header}>
                <span>Папки</span>
            </div>

            <div className={classes.dirs_items}>
                {rootDirs.map(el => <DirItem key={el.id} name={el.name} owner={el.owner.username} />)}
            </div>

        </div>)
}

export default Dirs
