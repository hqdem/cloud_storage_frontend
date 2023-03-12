import React from 'react'
import Dirs from "../Dirs/Dirs"
import Files from "../Files/Files.jsx"
import MainHeader from "./MainHeader/MainHeader.jsx"

const DirsFilesMain = () => {
    return (
        <>
            <MainHeader />
            <Dirs />
            <Files />
        </>
    )
}

export default DirsFilesMain
