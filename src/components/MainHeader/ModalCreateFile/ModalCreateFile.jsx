import React, {useEffect, useRef, useState} from 'react'
import classes from "../MainHeader.module.css"
import CloseLineIcon from "remixicon-react/CloseLineIcon"
import Modal from "react-modal"
import {useParams} from "react-router-dom"
import {useStore} from "../../../store/store.js"
import {useQuery} from "react-query"
import {addFilesToDir} from "../../../api/dirs/apiDirs.js"
import {createRootFile} from "../../../api/files/apiFiles.js"
import {refreshJWTToken} from "../../../api/auth/apiAuth.js"

const ModalCreateFile = ({isOpenFileModal, setIsOpenFileModal}) => {

    const {id} = useParams()
    const [isRedirect, setIsRedirect] = useState(false)


    const JWTAccessToken = useStore(state => state.JWTAccessToken)
    const JWTRefreshToken = useStore(state => state.JWTRefreshToken)
    const setJWTPairTokens = useStore(state => state.setJWTPairTokens)

    const toggleIsRerenderBoth = useStore(state => state.toggleIsRerenderBoth)
    const toggleIsRerenderFiles = useStore(state => state.toggleIsRerenderFiles)

    const fileInputRef = useRef()

    useEffect(() => {
        if (isRedirect)
            document.location.replace('/login')
    }, [isRedirect])

    useEffect(() => {
        if (!JWTAccessToken)
            setIsRedirect(true)
    }, [])

    const {refetch} = useQuery({
        queryKey: ['add_files'],
        queryFn: () => {
            if (id) {
                const newFormData = new FormData()
                for (const val of fileInputRef.current.files)
                    newFormData.append('files', val)
                addFilesToDir(id, newFormData, JWTAccessToken)
            } else {
                const newFormData = new FormData()
                newFormData.append('file', fileInputRef.current.files[0])
                createRootFile(newFormData, JWTAccessToken)
            }
        }
        ,
        enabled: false,
        retry: false,
        onSuccess: (data) => {
            if (id)
                setTimeout(() => {
                    toggleIsRerenderBoth()
                }, 1000)

            else
                setTimeout(() => {
                    toggleIsRerenderFiles()
                }, 1000)
            setIsOpenFileModal(false)


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

    const closeFileModal = (e) => {
        e.stopPropagation()
        setIsOpenFileModal(false)
    }

    const onSubmitCreateFileClicked = (e) => {
        refetch()
        e.preventDefault()
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
