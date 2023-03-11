import React from 'react'
import FolderFillIcon from "remixicon-react/FolderFillIcon"
import classes from './dir_item.module.css'

const DirItem = ({name, owner}) => {
    return (
        <div className={classes.dir_item}>
            <FolderFillIcon />
            <span>{name}</span>
            <span className={classes.dir_owner_label}>{owner}</span>
        </div>
    )
}

export default DirItem
