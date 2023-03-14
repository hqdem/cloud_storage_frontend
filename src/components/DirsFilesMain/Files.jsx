import React, {useState} from 'react'
import classes from '../Files/files.module.css'
import FileItem from "../Files/FileItem/FileItem.jsx"
import {useStore} from "../../store/store.js"
import {getRootFiles} from "../../api/files/apiFiles.js"
import {useAuthQuery} from "../../hooks/useAuthQuery.js"

const Files = () => {
    const [rootFiles, setRootFiles] = useState([])

    const JWTAccessToken = useStore(state => state.JWTAccessToken)

    const isRerenderFiles = useStore(state => state.isRerenderFiles)


    const {isLoading} = useAuthQuery({
        queryKey: ['files', isRerenderFiles],
        func: () => getRootFiles(JWTAccessToken),
        enabled: true,
        retry: false,
        onSuccessFunc: (data) => {
            setRootFiles(data.data)
        }
    })

    if (isLoading)
        return <div>Loading...</div>

    return (
        <div>
            <div className={classes.files_header}>
                <span>Файлы</span>
            </div>

            <div className={classes.files_items}>
                {rootFiles.map(el => <FileItem
                    key={el.id}
                    id={el.id}
                    name={el.file.split('/')[el.file.split('/').length - 1].substring(0, 10) + '...' + el.file.split('.')[el.file.split('.').length - 1]}
                    owner={el.owner.username}
                    file={el.file}
                    />
                )}
            </div>
        </div>
    )
}

export default Files
