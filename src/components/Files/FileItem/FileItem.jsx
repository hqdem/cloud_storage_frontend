import React from 'react'
import classes from './file_item.module.css'
import File2FillIcon from "remixicon-react/File2FillIcon"

const FileItem = ({name, owner, file}) => {
    return (
        <a href={file} download>
            <div className={classes.file_item}>
                <File2FillIcon/>
                <span>{name}</span>
                <span className={classes.file_owner_label}>{owner}</span>
            </div>
        </a>
    )
}

export default FileItem
