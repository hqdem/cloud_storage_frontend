import React from 'react'
import classes from './file_item.module.css'
import File2FillIcon from "remixicon-react/File2FillIcon"
import DeleteBin2FillIcon from "remixicon-react/DeleteBin2FillIcon"
import {useStore} from "../../../store/store.js"
import {deleteFile} from "../../../api/files/apiFiles"
import {useAuthMutation} from "../../../hooks/useAuthMutation.js"
import {useParams} from "react-router-dom"
import {useQueryClient} from "react-query"

const FileItem = ({id, name, owner, file}) => {

    const params = useParams()
    const dirId = params.id

    const JWTAccessToken = useStore(state => state.JWTAccessToken)

    const queryClient = useQueryClient()

    const deleteFileMutation = useAuthMutation({
        func: () => deleteFile(id, JWTAccessToken),
        onSuccessFunc: () => {
            if (dirId)
                queryClient.invalidateQueries({
                    queryKey: ['subdir']
                })
            else
                queryClient.invalidateQueries({
                    queryKey: ['files']
                })
        }
    })

    const onDeleteBtnClick = (e) => {
        e.stopPropagation()
        e.preventDefault()
        deleteFileMutation.mutate()
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
