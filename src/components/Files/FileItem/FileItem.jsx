import React from 'react'
import classes from './file_item.module.css'
import File2FillIcon from "remixicon-react/File2FillIcon"
import DeleteBin2FillIcon from "remixicon-react/DeleteBin2FillIcon"

const FileItem = ({name, owner, file}) => {
    return (
        <div className={classes.file_item_wrapper}>
            <a href={file} download>
                <div className={classes.file_item}>
                    <File2FillIcon/>
                    <span>{name}</span>
                    <span className={classes.file_owner_label}>{owner}</span>
                </div>
            </a>
            <div className={classes.file_delete_btn}>
                <DeleteBin2FillIcon />
            </div>
        </div>
    )
}

export default FileItem
