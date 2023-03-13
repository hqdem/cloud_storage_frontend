import React, {useEffect, useState} from 'react'
import classes from './file_item.module.css'
import File2FillIcon from "remixicon-react/File2FillIcon"
import DeleteBin2FillIcon from "remixicon-react/DeleteBin2FillIcon"
import {useStore} from "../../../store/store.js"
import {useQuery} from "react-query"
import {refreshJWTToken} from "../../../api/auth/apiAuth.js"
import {deleteFile} from "../../../api/files/apiFiles"

const FileItem = ({id, name, owner, file}) => {

    const [isRedirect, setIsRedirect] = useState(false)

    const JWTAccessToken = useStore(state => state.JWTAccessToken)
    const JWTRefreshToken = useStore(state => state.JWTRefreshToken)
    const setJWTPairTokens = useStore(state => state.setJWTPairTokens)

    const toggleIsRerenderBoth = useStore(state => state.toggleIsRerenderBoth)
    const toggleIsRerenderFiles = useStore(state => state.toggleIsRerenderFiles)

    useEffect(() => {
        if (isRedirect)
            document.location.replace('/login')
    }, [isRedirect])

    useEffect(() => {
        if (!JWTAccessToken)
            setIsRedirect(true)
    }, [])

    const {refetch} = useQuery({
        queryKey: ['deleteFile'],
        queryFn: () => deleteFile(id, JWTAccessToken),
        enabled: false,
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
        }
    })

    const onDeleteBtnClick = (e) => {
        e.stopPropagation()
        e.preventDefault()
        refetch().then(
            () => {
                toggleIsRerenderBoth()
                toggleIsRerenderFiles()
            }
        )
    }

    return (
        <div className={classes.file_item_wrapper}>
            <a href={file} download>
                <div className={classes.file_item}>
                    <File2FillIcon/>
                    <span>{name}</span>
                    <span className={classes.file_owner_label}>{owner}</span>
                </div>
            </a>
            <div className={classes.file_delete_btn} onClick={onDeleteBtnClick}>
                <DeleteBin2FillIcon />
            </div>
        </div>
    )
}

export default FileItem
