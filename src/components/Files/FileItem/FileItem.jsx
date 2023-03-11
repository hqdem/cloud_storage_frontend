import React from 'react'
import classes from './file_item.module.css'
import File2FillIcon from "remixicon-react/File2FillIcon"

const FileItem = ({name}) => {
    return (
        <div className={classes.file_item}>
            <File2FillIcon />
            <span>{name}</span>
        </div>
    )
}

export default FileItem
