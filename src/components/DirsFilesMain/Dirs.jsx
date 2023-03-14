import React, {useState} from 'react'
import DirItem from "../Dirs/DirItem/DirItem.jsx"
import classes from '../Dirs/dirs.module.css'
import {useStore} from "../../store/store.js"
import {getRootDirs} from "../../api/dirs/apiDirs.js"
import {useAuthQuery} from "../../hooks/useAuthQuery.js"

const Dirs = () => {
    const [rootDirs, setRootDirs] = useState([])

    const JWTAccessToken = useStore(state => state.JWTAccessToken)

    const isRerenderDirs = useStore(state => state.isRerenderDirs)


    const {isLoading} = useAuthQuery({
        queryKey: ['dirs', isRerenderDirs],
        func: () => getRootDirs(JWTAccessToken),
        retry: false,
        enabled: true,
        onSuccessFunc: (data) => {
            setRootDirs(data.data)
        }
    })

    if (isLoading)
        return <div>Loading...</div>

    return (
        <div>
            <div className={classes.dirs_header}>
                <span>Папки</span>
            </div>

            <div className={classes.dirs_items}>
                {rootDirs.map(el => <DirItem key={el.id} id={el.id} name={el.name} owner={el.owner.username} />)}
            </div>

        </div>)
}

export default Dirs
