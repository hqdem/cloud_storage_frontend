import React, {useState} from 'react'
import FolderFillIcon from "remixicon-react/FolderFillIcon"
import DeleteBin2FillIcon from "remixicon-react/DeleteBin2FillIcon"
import PencilFillIcon from "remixicon-react/PencilFillIcon"
import CheckFillIcon from "remixicon-react/CheckFillIcon"
import classes from './dir_item.module.css'
import {Link} from "react-router-dom"
import {deleteDir, updateDirInfo} from "../../../api/dirs/apiDirs.js"
import {useStore} from "../../../store/store.js"
import {useAuthQuery} from "../../../hooks/useAuthQuery.js"

const DirItem = ({id, name, owner}) => {

    const [isEditing, setIsEditing] = useState(false)
    const [editingName, setEditingName] = useState(name)

    const JWTAccessToken = useStore(state => state.JWTAccessToken)

    const toggleIsRerenderBoth = useStore(state => state.toggleIsRerenderBoth)
    const toggleIsRerenderDirs = useStore(state => state.toggleIsRerenderDirs)

    const {refetch} = useAuthQuery({
        queryKey: ['deleteDir'],
        func: () => deleteDir(id, JWTAccessToken),
        enabled: false,
        retry: false,
        onSuccessFunc: () => {}
    })

    const updateDirObj = useAuthQuery({
        queryKey: ['update_dir'],
        func: () => {
            updateDirInfo(id, {
                name: editingName
            }, JWTAccessToken)
        },
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
                toggleIsRerenderDirs()
            }
        )
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
        updateDirObj.refetch().then(
            () => {
                toggleIsRerenderBoth()
                toggleIsRerenderDirs()
            }
        )
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
