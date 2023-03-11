import React from 'react'
import classes from './files.module.css'
import FileItem from "./FileItem/FileItem.jsx"

const Files = () => {
    return (
        <div>
            <div className={classes.files_header}>
                <span>Файлы</span>
            </div>

            <div className={classes.files_items}>
                <FileItem key={1} name={'Файл'} />
                <FileItem key={2} name={'Файл'} />
                <FileItem key={3} name={'Файл'} />
                <FileItem key={4} name={'Файл'} />
                <FileItem key={5} name={'Файл'} />
                <FileItem key={6} name={'Файл'} />
                <FileItem key={7} name={'Файл'} />
            </div>
        </div>
    )
}

export default Files
