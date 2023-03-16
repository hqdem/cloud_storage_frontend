import React, {useState} from 'react'
import classes from "../../../MainHeader/MainHeader.module.css"
import CloseLineIcon from "remixicon-react/CloseLineIcon"
import Modal from "react-modal"
import {useAuthMutation} from "../../../../hooks/useAuthMutation.js"
import {addSharedUserToDir} from "../../../../api/dirs/apiDirs.js"
import {useStore} from "../../../../store/store.js"

const AddSharedUserModal = ({dirId, isOpenSharedUserModal, setIsOpenSharedUserModal}) => {
    const [username, setUsername] = useState('')
    const [usernameError, setUsernameError] = useState(null)

    const JWTAccessToken = useStore(state => state.JWTAccessToken)

    const closeSharedUserModal = (e) => {
        e.stopPropagation()
        setUsername('')
        setIsOpenSharedUserModal(false)
    }

    const onSubmitAddSharedUserClicked = (e) => {
        e.preventDefault()
        addSharedUserMutation.mutate()
    }

    const addSharedUserMutation = useAuthMutation({
        func: () => {
            return addSharedUserToDir(dirId, {
                username: username
            }, JWTAccessToken)
        },
        onSuccessFunc: () => {
            setIsOpenSharedUserModal(false)
            setUsername('')
            setUsernameError('')
        },
        onErrorFunc: (err) => {
            if (err.response.status === 404)
                setUsernameError('Пользователя с таким именем не существует')
            if (err.response.status === 403 && err.response.data.detail === 'У вас недостаточно прав для выполнения данного действия.')
                setUsernameError('У вас недостаточно прав для выполнения данного действия')
        }
    })

    return (
        <Modal
            shouldCloseOnOverlayClick={true}
            isOpen={isOpenSharedUserModal}
            onRequestClose={(e) => {
                e.stopPropagation()
                setIsOpenSharedUserModal(false)
            }}
            style={
                {
                    overlay: {
                        zIndex: 10
                    }
                }
            }
        >
            <div className={classes.close_modal} onClick={(e) => closeSharedUserModal(e)}>
                <CloseLineIcon/>
            </div>
            <form className={classes.form_dir}>
                {
                    addSharedUserMutation.isLoading
                        ?
                        <div>Loading...</div>
                        :
                        null
                }
                <input type="text" placeholder="Username пользователя" value={username}
                       onChange={(e) => setUsername(e.target.value)}/>
                <div className={classes.username_error}>
                    {
                        usernameError
                    }
                </div>
                <button type="submit" onClick={onSubmitAddSharedUserClicked}>Добавить</button>
            </form>
        </Modal>
    )
}

export default AddSharedUserModal
