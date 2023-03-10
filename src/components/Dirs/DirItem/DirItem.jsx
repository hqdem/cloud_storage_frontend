import React from 'react'
import FolderFillIcon from "remixicon-react/FolderFillIcon"
import classes from './dir_item.module.css'

const DirItem = ({name}) => {
    return (
        <div className={classes.dir_item}>
            <FolderFillIcon />
            <span>{name}</span>
        </div>
    )
}

export default DirItem
