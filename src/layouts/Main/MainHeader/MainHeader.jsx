import React from 'react'
import classes from './MainHeader.module.css'
import AddLineIcon from 'remixicon-react/AddLineIcon'


const MainHeader = () => {
    return (
        <div className={classes.main_header}>
            <div className={classes.main_header_button}>
                <AddLineIcon className={classes.plus_icon}/>
                Создать папку
            </div>

            <div className={classes.main_header_button}>
                <AddLineIcon className={classes.plus_icon}/>
                Добавить файл
            </div>

        </div>
    )
}

export default MainHeader
