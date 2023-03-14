import React, {useState} from 'react'
import classes from './MainHeader.module.css'
import AddLineIcon from 'remixicon-react/AddLineIcon'
import Modal from 'react-modal'
import ModalCreateFile from "./ModalCreateFile/ModalCreateFile.jsx"
import ModalCreateDir from "./ModalCreateDir/ModalCreateDir.jsx"

Modal.setAppElement('#root')

const MainHeader = () => {
    const [isOpenDirModal, setIsOpenDirModal] = useState(false)
    const [isOpenFileModal, setIsOpenFileModal] = useState(false)

    return (
        <div className={classes.main_header}>
            <div className={classes.main_header_button} onClick={() => setIsOpenDirModal(true)}>
                <AddLineIcon/>
                Создать папку
                <ModalCreateDir isOpenDirModal={isOpenDirModal} setIsOpenDirModal={setIsOpenDirModal} />
            </div>

            <div className={classes.main_header_button} onClick={() => setIsOpenFileModal(true)}>
                <AddLineIcon/>
                Добавить файл
                <ModalCreateFile isOpenFileModal={isOpenFileModal} setIsOpenFileModal={setIsOpenFileModal}/>
            </div>
        </div>
    )
}

export default MainHeader
