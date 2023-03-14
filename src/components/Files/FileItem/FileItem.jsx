import React, {useEffect, useState} from 'react'
import classes from './file_item.module.css'
import File2FillIcon from "remixicon-react/File2FillIcon"
import DeleteBin2FillIcon from "remixicon-react/DeleteBin2FillIcon"
import {useStore} from "../../../store/store.js"
import {useQuery} from "react-query"
import {refreshJWTToken} from "../../../api/auth/apiAuth.js"
import {deleteFile} from "../../../api/files/apiFiles"
import {useAuthQuery} from "../../../hooks/useAuthQuery.js"

const FileItem = ({id, name, owner, file}) => {

    const JWTAccessToken = useStore(state => state.JWTAccessToken)

    const toggleIsRerenderBoth = useStore(state => state.toggleIsRerenderBoth)
    const toggleIsRerenderFiles = useStore(state => state.toggleIsRerenderFiles)


    const {refetch} = useAuthQuery({
        queryKey: ['deleteFile'],
        func: () => deleteFile(id, JWTAccessToken),
        enabled: false,
        retry: false,
        onSuccessFunc: () => {}
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
