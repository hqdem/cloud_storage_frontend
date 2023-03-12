import React from 'react'
import FolderFillIcon from "remixicon-react/FolderFillIcon"
import classes from './dir_item.module.css'
import {Link} from "react-router-dom"

const DirItem = ({id, name, owner}) => {
    return (
        <Link to={`/dir/${id}`}>
            <div className={classes.dir_item}>
                <FolderFillIcon/>
                <span>{name}</span>
                <span className={classes.dir_owner_label}>{owner}</span>
            </div>
        </Link>
    )
}

export default DirItem
