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
                <DirItem key={1} name={'Папка'} owner={'Пользователь'}/>
                <DirItem key={2} name={'Папка'} owner={'Пользователь'}/>
                <DirItem key={3} name={'Папка'} owner={'Пользователь'}/>
                <DirItem key={4} name={'Папка'} owner={'Пользователь'}/>
                <DirItem key={5} name={'Папка'} owner={'Пользователь'}/>
                <DirItem key={6} name={'Папка'} owner={'Пользователь'}/>
                <DirItem key={7} name={'Папка'} owner={'Пользователь'}/>
                <DirItem key={8} name={'Папка'} owner={'Пользователь'}/>
                <DirItem key={9} name={'Папка'} owner={'Пользователь'}/>
                <DirItem key={10} name={'Папка'} owner={'Пользователь'}/>
                <DirItem key={11} name={'Папка'} owner={'Пользователь'}/>
            </div>

        </div>)
}

export default Dirs
