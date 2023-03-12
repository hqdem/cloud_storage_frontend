import React, {useEffect, useState} from 'react'
import {useParams} from "react-router-dom"
import {useQuery} from "react-query"
import {getRetrieveDir} from "../../api/dirs/apiDirs.js"
import {useStore} from "../../store/store.js"
import {refreshJWTToken} from "../../api/auth/apiAuth.js"
import MainHeader from "../MainHeader/MainHeader.jsx"
import classesDirs from "../Dirs/dirs.module.css"
import DirItem from "../Dirs/DirItem/DirItem.jsx"
import classesFiles from "../Files/files.module.css"
import FileItem from "../Files/FileItem/FileItem.jsx"

const SubDirectory = () => {
    const {id} = useParams()

    const [isRedirect, setIsRedirect] = useState(false)
    const [dirs, setDirs] = useState([])
    const [files, setFiles] = useState([])

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
        queryKey: ['subdir', id],
        queryFn: () => getRetrieveDir(id, JWTAccessToken),
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
            const resData = data.data
            setDirs(resData.children_dirs)
            setFiles(resData.files)
        }
    })

    return (
        <>
            <MainHeader/>
            <div className={classesDirs.dirs_header}>
                <span>Папки</span>
            </div>
            <div className={classesDirs.dirs_items}>
                {dirs.map(el => <DirItem key={el.id} id={el.id} name={el.name} owner="fix that lol..."/>)}
            </div>

            <div className={classesFiles.files_header}>
                <span>Файлы</span>
            </div>

            <div className={classesFiles.files_items}>
                {files.map(el => <FileItem
                    key={el.id}
                    name={el.file.split('/')[el.file.split('/').length - 1].substring(0, 10) + '...' + el.file.split('.')[el.file.split('.').length - 1]}
                    owner={el.owner.username}/>)}
            </div>
        </>
    )
}

export default SubDirectory
