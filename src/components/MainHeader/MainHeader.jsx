import React, {useEffect, useRef, useState} from 'react'
import classes from './MainHeader.module.css'
import AddLineIcon from 'remixicon-react/AddLineIcon'
import {useParams} from "react-router-dom"
import {useQuery} from "react-query"
import {addFilesToDir, createDir} from "../../api/dirs/apiDirs.js"
import Modal from 'react-modal'
import CloseLineIcon from "remixicon-react/CloseLineIcon"
import {useStore} from "../../store/store.js"
import {refreshJWTToken} from "../../api/auth/apiAuth.js"
import {createRootFile} from "../../api/files/apiFiles.js"

Modal.setAppElement('#root')

const MainHeader = () => {

    const {id} = useParams()
    const [isRedirect, setIsRedirect] = useState(false)
    const [dirName, setDirName] = useState('')

    const [isOpenDirModal, setIsOpenDirModal] = useState(false)
    const [isOpenFileModal, setIsOpenFileModal] = useState(false)

    const JWTAccessToken = useStore(state => state.JWTAccessToken)
    const JWTRefreshToken = useStore(state => state.JWTRefreshToken)
    const setJWTPairTokens = useStore(state => state.setJWTPairTokens)

    const toggleIsRerenderBoth = useStore(state => state.toggleIsRerenderBoth)
    const toggleIsRerenderDirs = useStore(state => state.toggleIsRerenderDirs)
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

    const objDir = useQuery({
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
            if (id)
                toggleIsRerenderBoth()
            else
                toggleIsRerenderDirs()

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
                        objDir.refetch()
                    },
                    (err) => {
                        setIsRedirect(true)
                    }
                )
            }
        }
    })
    const isLoadingDir = objDir.isLoading // add loader maybe
    const refetchDir = objDir.refetch

    const objFiles = useQuery({
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
                        objFiles.refetch()
                    },
                    (err) => {
                        setIsRedirect(true)
                    }
                )
            }
        }
    })

    const refetchFiles = objFiles.refetch

    const closeDirModal = (e) => {
        e.stopPropagation()
        setIsOpenDirModal(false)
    }

    const closeFileModal = (e) => {
        e.stopPropagation()
        setIsOpenFileModal(false)
    }

    const onSubmitCreateDirClicked = (e) => {
        refetchDir()
        e.preventDefault()
    }

    const onSubmitCreateFileClicked = (e) => {
        refetchFiles()
        e.preventDefault()


    }

    return (
        <div className={classes.main_header}>
            <div className={classes.main_header_button} onClick={() => setIsOpenDirModal(true)}>
                <AddLineIcon/>
                Создать папку
                <Modal
                    shouldCloseOnOverlayClick={true}
                    isOpen={isOpenDirModal}
                    onRequestClose={(e) => {
                        e.stopPropagation()
                        setIsOpenDirModal(false)
                    }}
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
            </div>


            <div className={classes.main_header_button} onClick={() => setIsOpenFileModal(true)}>
                <AddLineIcon/>
                Добавить файл
                <Modal
                    shouldCloseOnOverlayClick={true}
                    isOpen={isOpenFileModal}
                    onRequestClose={(e) => {
                        e.stopPropagation()
                        setIsOpenFileModal(false)
                    }}
                >
                    <div className={classes.close_modal} onClick={(e) => closeFileModal(e)}>
                        <CloseLineIcon/>
                    </div>
                    <form encType="multipart/form-data" className={classes.form_dir}>
                        <input type="file" name="files" multiple id="fileupload" ref={fileInputRef}/>
                        <button type="submit" onClick={onSubmitCreateFileClicked}>Загрузить</button>
                    </form>
                </Modal>
            </div>

        </div>
    )
}

export default MainHeader
