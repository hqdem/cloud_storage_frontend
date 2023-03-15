import React, {useState} from 'react'
import classes from "../MainHeader.module.css"
import CloseLineIcon from "remixicon-react/CloseLineIcon"
import Modal from "react-modal"
import {useParams} from "react-router-dom"
import {useStore} from "../../../store/store.js"
import {createDir} from "../../../api/dirs/apiDirs.js"
import {useQueryClient} from "react-query"
import {useAuthMutation} from "../../../hooks/useAuthMutation.js"

const ModalCreateDir = ({isOpenDirModal, setIsOpenDirModal}) => {

    const {id} = useParams()
    const [dirName, setDirName] = useState('')

    const JWTAccessToken = useStore(state => state.JWTAccessToken)

    const queryClient = useQueryClient()

    const mutateDir = useAuthMutation({
        func: () => createDir({
            name: dirName !== '' ? dirName : null,
            parent_dir_id: id ? id : null
        }, JWTAccessToken),
        onSuccessFunc: () => {
            setIsOpenDirModal(false)
            setDirName('')
            if (id)
                queryClient.invalidateQueries({queryKey: ['subdir']})
            else
                queryClient.invalidateQueries({queryKey: ['dirs']})
        }
    })

    const closeDirModal = (e) => {
        e.stopPropagation()
        setIsOpenDirModal(false)
    }

    const onSubmitCreateDirClicked = (e) => {
        e.preventDefault()
        mutateDir.mutate()
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
                {
                    mutateDir.isLoading
                        ?
                        <div>Loading...</div>
                        :
                        null
                }
                <input type="text" placeholder="Название папки" value={dirName}
                       onChange={(e) => setDirName(e.target.value)}/>
                <button type="submit" onClick={onSubmitCreateDirClicked}>Создать</button>
            </form>
        </Modal>
    )
}

export default ModalCreateDir
