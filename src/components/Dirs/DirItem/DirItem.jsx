import React, {useEffect, useState} from 'react'
import FolderFillIcon from "remixicon-react/FolderFillIcon"
import DeleteBin2FillIcon from "remixicon-react/DeleteBin2FillIcon"
import PencilFillIcon from "remixicon-react/PencilFillIcon"
import CheckFillIcon from "remixicon-react/CheckFillIcon"
import classes from './dir_item.module.css'
import {Link} from "react-router-dom"
import {useQuery} from "react-query"
import {deleteDir, updateDirInfo} from "../../../api/dirs/apiDirs.js"
import {useStore} from "../../../store/store.js"
import {refreshJWTToken} from "../../../api/auth/apiAuth.js"

const DirItem = ({id, name, owner}) => {

    const [isRedirect, setIsRedirect] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [editingName, setEditingName] = useState(name)

    const JWTAccessToken = useStore(state => state.JWTAccessToken)
    const JWTRefreshToken = useStore(state => state.JWTRefreshToken)
    const setJWTPairTokens = useStore(state => state.setJWTPairTokens)

    const toggleIsRerenderBoth = useStore(state => state.toggleIsRerenderBoth)
    const toggleIsRerenderDirs = useStore(state => state.toggleIsRerenderDirs)

    useEffect(() => {
        if (isRedirect)
            document.location.replace('/login')
    }, [isRedirect])

    useEffect(() => {
        if (!JWTAccessToken)
            setIsRedirect(true)
    }, [])

    const {refetch} = useQuery({
        queryKey: ['deleteDir'],
        queryFn: () => deleteDir(id, JWTAccessToken),
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

    const updateDirObj = useQuery({
        queryKey: ['update_dir'],
        queryFn: () => {
            updateDirInfo(id, {
                name: editingName
            }, JWTAccessToken)
        },
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
                        updateDirObj.refetch()
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
