import React from 'react'
import classes from './header.module.css'
import logo from '../../assets/images/logo.png'
import Search2LineIcon from 'remixicon-react/Search2LineIcon'
import {Link} from "react-router-dom"
import HeaderLogin from "./HeaderLogin/HeaderLogin.jsx"

const Header = () => {
    return (
        <div className={"section d_flex-row " + classes.header}>
            <div className={classes.logo}>
                <img src={logo} alt="logo"/>
                <Link to={'/'}><span>Диск</span></Link>
            </div>

            <div className={classes.search}>
                <div className={classes.input_div}>
                    <Search2LineIcon className={classes.search_logo}/>
                    <input type="text" placeholder={'Поиск'}/>
                </div>
            </div>

            <div className={classes.login}>
                <HeaderLogin />
            </div>

        </div>
    )
}

export default Header
