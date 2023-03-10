import React from 'react'
import MainHeader from "./MainHeader/MainHeader.jsx"

const Main = ({children}) => {
    return (
        <div className="section main">
            <MainHeader />
            {children}
        </div>
    )
}

export default Main
