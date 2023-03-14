import React, {useEffect, useState} from 'react'
import classes from "../MainHeader.module.css"
import CloseLineIcon from "remixicon-react/CloseLineIcon"
import Modal from "react-modal"
import {useParams} from "react-router-dom"
import {useStore} from "../../../store/store.js"
import {createDir} from "../../../api/dirs/apiDirs.js"
import {useAuthQuery} from "../../../hooks/useAuthQuery.js"

const ModalCreateDir = ({isOpenDirModal, setIsOpenDirModal}) => {

    const {id} = useParams()
    const [dirName, setDirName] = useState('')


    const JWTAccessToken = useStore(state => state.JWTAccessToken)

    const toggleIsRerenderBoth = useStore(state => state.toggleIsRerenderBoth)
    const toggleIsRerenderDirs = useStore(state => state.toggleIsRerenderDirs)

    const {refetch} = useAuthQuery({
        queryKey: ['create_dir'],
        func: () => createDir({
            name: dirName !== '' ? dirName : null,
            parent_dir_id: id ? id : null
        }, JWTAccessToken),
        enabled: false,
        retry: false,
        onSuccessFunc: (data) => {
            setIsOpenDirModal(false)
            setDirName('')
        },
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
