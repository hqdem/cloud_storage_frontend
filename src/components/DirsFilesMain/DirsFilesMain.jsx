import React from 'react'
import Dirs from "./Dirs.jsx"
import Files from "./Files.jsx"
import MainHeader from "../MainHeader/MainHeader.jsx"

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
