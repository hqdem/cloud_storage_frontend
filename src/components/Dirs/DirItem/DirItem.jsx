import React, {useState} from 'react'
import FolderFillIcon from "remixicon-react/FolderFillIcon"
import DeleteBin2FillIcon from "remixicon-react/DeleteBin2FillIcon"
import PencilFillIcon from "remixicon-react/PencilFillIcon"
import CheckFillIcon from "remixicon-react/CheckFillIcon"
import classes from './dir_item.module.css'
import {Link, useParams} from "react-router-dom"
import {deleteDir, updateDirInfo} from "../../../api/dirs/apiDirs.js"
import {useStore} from "../../../store/store.js"
import {useAuthMutation} from "../../../hooks/useAuthMutation.js"
import {useQueryClient} from "react-query"

const DirItem = ({id, name, owner}) => {

    const params = useParams()
    const dirId = params.id

    const [isEditing, setIsEditing] = useState(false)
    const [editingName, setEditingName] = useState(name)

    const JWTAccessToken = useStore(state => state.JWTAccessToken)

    const queryClient = useQueryClient()

    const deleteDirMutation = useAuthMutation({
        func: () => deleteDir(id, JWTAccessToken),
        onSuccessFunc: () => {
            if (dirId)
                queryClient.invalidateQueries({
                    queryKey: ['subdir']
                })
            else
                queryClient.invalidateQueries({
                    queryKey: ['dirs']
                })
        }
    })

    const updateDirMutation = useAuthMutation({
        func: () => {
            return updateDirInfo(id, {
                name: editingName
            }, JWTAccessToken)
        },
        onSuccessFunc: () => {
            console.log(dirId)
            if (dirId)
                queryClient.invalidateQueries({
                    queryKey: ['subdir']
                })
            else
                queryClient.invalidateQueries({
                    queryKey: ['dirs']
                })
        }
    })

    const onDeleteBtnClick = (e) => {
        e.stopPropagation()
        e.preventDefault()
        deleteDirMutation.mutate()
    }

    const setIsEditingToTrue = (e) => {
        e.preventDefault()
        setIsEditing(true)
    }

    const setIsEditingToFalse = (e) => {
        e.preventDefault()
        if (editingName === name) {
            setIsEditing(false)
            return
        }
        updateDirMutation.mutate()
        setIsEditing(false)
    }

    return (
        <Link to={`/dir/${id}`}>
            <div className={classes.dir_item_wrapper}>
                <div className={classes.dir_item}>
                    <FolderFillIcon />
                    {
                        isEditing
                                ?
                                <input
                                    type="text"
                                    onClick={(e) => e.preventDefault()}
                                    value={editingName}
                                    onChange={(e) => setEditingName(e.target.value)}
                                />
                                :
                                <span>{name}</span>
                    }
                    <span className={classes.dir_owner_label}>{owner}</span>
                </div>
                <div className={classes.dir_delete_btn} onClick={onDeleteBtnClick}>
                    <DeleteBin2FillIcon />
                </div>
                {
                    isEditing ?
                        <div className={classes.dir_check_btn} onClick={setIsEditingToFalse}>
                            <CheckFillIcon />
                        </div> :
                        <div className={classes.dir_edit_btn} onClick={setIsEditingToTrue}>
                            <PencilFillIcon />
                        </div>
                }
            </div>
        </Link>
    )
}

export default DirItem
