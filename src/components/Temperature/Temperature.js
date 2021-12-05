import { Fragment } from 'react'
import classes from './Temperature.module.css'
const Temperature = (props) => {

    if (props.temperature)
        return (
        <div className={classes.temperature}>
            {props.temperature.temp_c}&#8451;
        </div>)
    return <Fragment />
}

export default Temperature;