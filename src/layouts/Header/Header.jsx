import React from 'react'
import classes from './header.module.css'
import logo from '../../assets/images/logo.png'
import Search2LineIcon from 'remixicon-react/Search2LineIcon'

const Header = () => {
    return (
        <div className={"section d_flex-row " + classes.header}>
            <div className={classes.logo}>
                <img src={logo} alt="logo"/>
                <span>Диск</span>
            </div>

            <div className={classes.search}>
                <div className={classes.input_div}>
                    <Search2LineIcon className={classes.search_logo}/>
                    <input type="text" placeholder={'Поиск'}/>
                </div>
            </div>

            <div className={classes.login}>

            </div>

        </div>
    )
}

export default Header
