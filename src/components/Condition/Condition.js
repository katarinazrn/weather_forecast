import classes from './Condition.module.css'
import { Fragment } from 'react'
const Condition = (props) => {

    if (props.current)
        return (
            <div className={classes.container}>
                <div className={classes.condition}>
                    <img src={props.current.condition.icon} alt={props.current.condition.text} />
                    <span>{props.current.condition.text}</span>
                </div>
                <p>Feels like: {props.current.feelslike_c}&#8451;</p>
            </div>
        )
    return <Fragment />
}

export default Condition;


/*

chance_of_rain: 0
​​
chance_of_snow: 0
​​
cloud: 24
​​
condition: Object { text: "Clear", icon: "//cdn.weatherapi.com/weather/64x64/night/113.png", code: 1000 }
​​
dewpoint_c: -2.4
​​
dewpoint_f: 27.7
​​
feelslike_c: 2.8
​​
feelslike_f: 37
​​
gust_kph: 4.7
​​
gust_mph: 2.9
​​
heatindex_c: 2.8
​​
heatindex_f: 37
​​
humidity: 69
​​
is_day: 0
​​
precip_in: 0
​​
precip_mm: 0
​​
pressure_in: 30.01
​​
pressure_mb: 1016
​​
temp_c: 2.8
​​
temp_f: 37
​​
time: "2021-12-04 00:00"
​​
time_epoch: 1638572400
​​
uv: 1
​​
vis_km: 10
​​
vis_miles: 6
​​
will_it_rain: 0
​​
will_it_snow: 0
​​
wind_degree: 354
​​
wind_dir: "N"
​​
wind_kph: 2.9
​​
wind_mph: 1.8
​​
windchill_c: 2.8
​​
windchill_f: 37

*/