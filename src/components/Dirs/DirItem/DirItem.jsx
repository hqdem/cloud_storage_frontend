import React, {useEffect, useState} from 'react'
import FolderFillIcon from "remixicon-react/FolderFillIcon"
import DeleteBin2FillIcon from "remixicon-react/DeleteBin2FillIcon"
import PencilFillIcon from "remixicon-react/PencilFillIcon"
import classes from './dir_item.module.css'
import {Link} from "react-router-dom"
import {useQuery} from "react-query"
import {deleteDir} from "../../../api/dirs/apiDirs.js"
import {useStore} from "../../../store/store.js"
import {refreshJWTToken} from "../../../api/auth/apiAuth.js"

const DirItem = ({id, name, owner}) => {

    const [isRedirect, setIsRedirect] = useState(false)

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

    return (
        <Link to={`/dir/${id}`}>
            <div className={classes.dir_item_wrapper}>
                <div className={classes.dir_item}>
                    <FolderFillIcon />
                    <span>{name}</span>
                    <span className={classes.dir_owner_label}>{owner}</span>
                </div>
                <div className={classes.dir_delete_btn} onClick={onDeleteBtnClick}>
                    <DeleteBin2FillIcon />
                </div>
                <div className={classes.dir_edit_btn}>
                    <PencilFillIcon />
                </div>
            </div>
        </Link>
    )
}

export default DirItem
