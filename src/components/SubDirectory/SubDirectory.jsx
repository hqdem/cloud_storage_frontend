import React, {useState} from 'react'
import {useParams} from "react-router-dom"
import {getRetrieveDir} from "../../api/dirs/apiDirs.js"
import {useStore} from "../../store/store.js"
import MainHeader from "../MainHeader/MainHeader.jsx"
import classesDirs from "../Dirs/dirs.module.css"
import DirItem from "../Dirs/DirItem/DirItem.jsx"
import classesFiles from "../Files/files.module.css"
import FileItem from "../Files/FileItem/FileItem.jsx"
import {useAuthQuery} from "../../hooks/useAuthQuery.js"

const SubDirectory = () => {
    const {id} = useParams()

    const [dirs, setDirs] = useState([])
    const [files, setFiles] = useState([])

    const JWTAccessToken = useStore(state => state.JWTAccessToken)

    useAuthQuery({
        queryKey: ['subdir', id],
        func: () => getRetrieveDir(id, JWTAccessToken),
        enabled: true,
        retry: false,
        onSuccessFunc: (data) => {
            const resData = data.data
            setDirs(resData.children_dirs)
            setFiles(resData.files)
        }
    })

    return (
        <>
            <MainHeader/>
            <div className={classesDirs.dirs_header}>
                <span>Папки</span>
            </div>
            <div className={classesDirs.dirs_items}>
                {dirs.map(el => <DirItem key={el.id} id={el.id} name={el.name} owner={el.owner.username}/>)}
            </div>

            <div className={classesFiles.files_header}>
                <span>Файлы</span>
            </div>

            <div className={classesFiles.files_items}>
                {files.map(el => <FileItem
                    key={el.id}
                    id={el.id}
                    name={el.file.split('/')[el.file.split('/').length - 1].substring(0, 10) + '...' + el.file.split('.')[el.file.split('.').length - 1]}
                    owner={el.owner.username}
                    file={el.file}
                />)
                }
            </div>
        </>
    )
}

export default SubDirectory
