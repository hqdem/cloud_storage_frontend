import React, {useEffect, useState} from 'react'
import classes from "../MainHeader.module.css"
import CloseLineIcon from "remixicon-react/CloseLineIcon"
import Modal from "react-modal"
import {useParams} from "react-router-dom"
import {useStore} from "../../../store/store.js"
import {useQuery} from "react-query"
import {createDir} from "../../../api/dirs/apiDirs.js"
import {refreshJWTToken} from "../../../api/auth/apiAuth.js"

const ModalCreateDir = ({isOpenDirModal, setIsOpenDirModal}) => {

    const {id} = useParams()
    const [isRedirect, setIsRedirect] = useState(false)
    const [dirName, setDirName] = useState('')


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
        queryKey: ['create_dir'],
        queryFn: () => createDir({
            name: dirName !== '' ? dirName : null,
            parent_dir_id: id ? id : null
        }, JWTAccessToken),
        enabled: false,
        retry: false,
        onSuccess: (data) => {
            setIsOpenDirModal(false)
            setDirName('')
        },
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

    const closeDirModal = (e) => {
        e.stopPropagation()
        setIsOpenDirModal(false)
    }

    const onSubmitCreateDirClicked = (e) => {
        refetch().then(() =>{
            if (id)
                toggleIsRerenderBoth()
            else
                toggleIsRerenderDirs()
            })
        e.preventDefault()
    }

    return (
        <Modal
            shouldCloseOnOverlayClick={true}
            isOpen={isOpenDirModal}
            onRequestClose={(e) => {
                e.stopPropagation()
                setIsOpenDirModal(false)
            }}
            style={
                {
                    overlay: {
                        zIndex: 10
                    }
                }
            }
        >
            <div className={classes.close_modal} onClick={(e) => closeDirModal(e)}>
                <CloseLineIcon/>
            </div>
            <form className={classes.form_dir}>
                <input type="text" placeholder="Название папки" value={dirName}
                       onChange={(e) => setDirName(e.target.value)}/>
                <button type="submit" onClick={onSubmitCreateDirClicked}>Создать</button>
            </form>
        </Modal>
    )
}

export default ModalCreateDir
