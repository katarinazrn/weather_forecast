import classes from './Hourly.module.css'
import moment from 'moment'
import { Fragment, useEffect, useState } from 'react'

const Hourly = (props) => {

    const [hours, setHours] = useState([])
    const [visibleHours, setVisibleHours] = useState([])

    useEffect(() => {

        if (props.hours.length == 0) return;

        let tempHours = [];

        props.hours.forEach((hour, index) => {
            tempHours.push({
                index: index,
                hour: hour
            })
        });

        setHours(tempHours)

        let tempHours2 = [];

        for (let i = 0; i < 5; i++) {
            tempHours2.push(tempHours[i])
        }

        setVisibleHours(tempHours2)

    }, [props.hours])

    const leftArrowClick = () => {
        if (visibleHours[0].index - 1 >= 0) {
            setVisibleHours((prevHours) => {
                let tempHours = [...prevHours];
                tempHours.pop()
                tempHours.splice(0, 0, hours[visibleHours[0].index - 1])
                return tempHours
            })
        }
    }

    const rightArrowClick = () => {
        if (visibleHours[4].index + 1 < hours.length) {
            setVisibleHours((prevHours) => {
                let tempHours = [...prevHours];
                tempHours.shift()
                tempHours.push(hours[visibleHours[4].index + 1])
                return tempHours
            })
        }
    }

    if (visibleHours.length > 0)
        return (
            <div className={classes.container}>
                <button onClick={leftArrowClick}>
                    <span className="material-icons">arrow_back_ios</span>
                </button>
                <ul >
                    {visibleHours.map(hour =>
                        <li key={hour.hour.time} className={classes.item}>
                            <p>{hour.hour.time.split(' ')[1]}</p>
                            <p>
                                <span className={classes.day}>
                                    {moment(hour.hour.time.split(' ')[0]).format('dd') }&nbsp;
                                </span>
                                { moment(hour.hour.time.split(' ')[0]).format('DD/MM')}</p>
                            <p><img src={hour.hour.condition.icon} alt={hour.hour.condition.text} /></p>
                            <span>{hour.hour.temp_c}&#8451;</span>
                        </li>)}
                </ul>
                <button onClick={rightArrowClick}>
                    <span className="material-icons">arrow_forward_ios</span>
                </button>
            </div>
        )
    return <Fragment />
}

export default Hourly
