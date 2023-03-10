import React, {useEffect, useState} from 'react'
import classes from './footer.module.css'

const Footer = () => {
    const [year, setYear] = useState('')

    useEffect(() => {
        setYear(String(new Date().getFullYear()))
    }, [])

    return (
        <div className="section">
            <div className={classes.footer_text}>
                <span>&copy; {year} HqDev</span>
            </div>
        </div>
    )
}

export default Footer
