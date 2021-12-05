import classes from './Forecast.module.css'
import moment from 'moment'
import { Fragment } from 'react';

const Forecast = (props) => {
    
    if (props.forecast.forecastday) 
    return (
        <ul className={classes.forecast}>{props.forecast.forecastday.map(day =>
            <li key={day.date}>
                <img src={day.day.condition.icon} alt={day.day} />
                <p>{day.day.avgtemp_c}&#8451;</p>
                <p>{moment(day.date).format("dddd")}</p>
                <p>{moment(day.date).format("MMMM DD, YYYY")}</p>
            </li>
        )}
        </ul>
    )
    return <Fragment />
}
export default Forecast;