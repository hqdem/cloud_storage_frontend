import React from 'react'
import DirItem from "./DirItem/DirItem.jsx"
import classes from './dirs.module.css'

const Dirs = () => {
    return (
        <div>
            <div className={classes.dirs_header}>
                <span>Папки</span>
            </div>

            <div className={classes.dirs_items}>
                <DirItem key={1} name={'Папка'}/>
                <DirItem key={2} name={'Папка'}/>
                <DirItem key={3} name={'Папка'}/>
                <DirItem key={4} name={'Папка'}/>
                <DirItem key={5} name={'Папка'}/>
                <DirItem key={6} name={'Папка'}/>
                <DirItem key={7} name={'Папка'}/>
                <DirItem key={8} name={'Папка'}/>
                <DirItem key={9} name={'Папка'}/>
                <DirItem key={10} name={'Папка'}/>
                <DirItem key={11} name={'Папка'}/>
            </div>

        </div>)
}

export default Dirs
