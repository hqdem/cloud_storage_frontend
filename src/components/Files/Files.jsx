import React, {useEffect, useState} from 'react'
import classes from './files.module.css'
import FileItem from "./FileItem/FileItem.jsx"
import {useQuery} from "react-query"
import {useStore} from "../../store/store.js"
import {getRootFiles} from "../../api/files/apiFiles.js"
import {refreshJWTToken} from "../../api/auth/apiAuth.js"

const Files = () => {
    const [isRedirect, setIsRedirect] = useState(false)
    const [rootFiles, setRootFiles] = useState([])

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
        queryKey: ['files'],
        queryFn: () => getRootFiles(JWTAccessToken),
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
            setRootFiles(data.data)
        }
    })

    if (isLoading)
        return <div>Loading...</div>

    return (
        <div>
            <div className={classes.files_header}>
                <span>Файлы</span>
            </div>

            <div className={classes.files_items}>
                {rootFiles.map(el => <FileItem
                    key={el.id}
                    name={el.file.split('/')[el.file.split('/').length - 1].substring(0, 10) + '...' + el.file.split('.')[el.file.split('.').length - 1]}
                    owner={el.owner.username}/>)}
            </div>
        </div>
    )
}

export default Files
