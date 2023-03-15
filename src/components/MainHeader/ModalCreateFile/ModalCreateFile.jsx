import React, {useRef} from 'react'
import classes from "../MainHeader.module.css"
import CloseLineIcon from "remixicon-react/CloseLineIcon"
import Modal from "react-modal"
import {useParams} from "react-router-dom"
import {useStore} from "../../../store/store.js"
import {addFilesToDir} from "../../../api/dirs/apiDirs.js"
import {createRootFile} from "../../../api/files/apiFiles.js"
import {useAuthMutation} from "../../../hooks/useAuthMutation.js"
import {useQueryClient} from "react-query"

const ModalCreateFile = ({isOpenFileModal, setIsOpenFileModal}) => {

    const {id} = useParams()

    const JWTAccessToken = useStore(state => state.JWTAccessToken)

    const queryClient = useQueryClient()

    const fileInputRef = useRef()

    const mutateFile = useAuthMutation({
        func: () => {
            if (id) {
                const newFormData = new FormData()
                for (const val of fileInputRef.current.files)
                    newFormData.append('files', val)
                return addFilesToDir(id, newFormData, JWTAccessToken)
            } else {
                const newFormData = new FormData()
                newFormData.append('file', fileInputRef.current.files[0])
                return createRootFile(newFormData, JWTAccessToken)
            }
        },
        onSuccessFunc: () => {
            setIsOpenFileModal(false)
            if (id)
                queryClient.invalidateQueries({queryKey: ['subdir']})
            else
                queryClient.invalidateQueries({queryKey: ['files']})
        }
    })

    const closeFileModal = (e) => {
        e.stopPropagation()
        setIsOpenFileModal(false)
    }

    const onSubmitCreateFileClicked = (e) => {
        e.preventDefault()
        mutateFile.mutate()
    }

    return (
        <Modal
            shouldCloseOnOverlayClick={true}
            isOpen={isOpenFileModal}
            onRequestClose={(e) => {
                e.stopPropagation()
                setIsOpenFileModal(false)
            }}
            style={
                {
                    overlay: {
                        zIndex: 10
                    }
                }
            }
        >
            <div className={classes.close_modal} onClick={(e) => closeFileModal(e)}>
                <CloseLineIcon/>
            </div>
            <form encType="multipart/form-data" className={classes.form_dir}>
                <input type="file" name="files" multiple id="fileupload" ref={fileInputRef}/>
                <button type="submit" onClick={onSubmitCreateFileClicked}>Загрузить</button>
            </form>
        </Modal>
    )
}

export default ModalCreateFile
