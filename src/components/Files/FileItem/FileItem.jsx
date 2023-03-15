import React, {useState} from 'react'
import classes from './file_item.module.css'
import File2FillIcon from "remixicon-react/File2FillIcon"
import DeleteBin2FillIcon from "remixicon-react/DeleteBin2FillIcon"
import {useStore} from "../../../store/store.js"
import {deleteFile} from "../../../api/files/apiFiles"
import {useAuthMutation} from "../../../hooks/useAuthMutation.js"
import {useParams} from "react-router-dom"
import {useQueryClient} from "react-query"
import UserAddLineIcon from "remixicon-react/UserAddLineIcon"
import AddSharedUserModal from "./AddSharedUserModal/AddSharedUserModal.jsx"

const FileItem = ({id, name, owner, file}) => {

    const params = useParams()
    const dirId = params.id

    const [isOpenSharedUserModal, setIsOpenSharedUserModal] = useState(false)

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

    const setIsOpenSharedUserModalToTrue = (e) => {
        e.preventDefault()
        setIsOpenSharedUserModal(true)
    }

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
            <div className={classes.add_shared_user_btn} onClick={setIsOpenSharedUserModalToTrue}>
                <UserAddLineIcon />
                <AddSharedUserModal fileId={id} isOpenSharedUserModal={isOpenSharedUserModal} setIsOpenSharedUserModal={setIsOpenSharedUserModal}/>
            </div>
        </div>
    )
}

export default FileItem
