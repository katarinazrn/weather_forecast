import Location from './components/Location/Location';
import { useState, useEffect } from 'react';
import Temperature from './components/Temperature/Temperature';
import Condition from './components/Condition/Condition';
import Forecast from './components/Forecast/Forecast';
import Loading from './components/Loading/Loading';

import classes from './Container.module.css'
import Hourly from './components/Hourly/Hourly';
import moment from 'moment';

const App = () => {

  const [location, setLocation] = useState(null)
  const [current, setCurrent] = useState(null)
  const [forecast, setForecast] = useState([])
  const [locationUrl, setLocationUrl] = useState('Belgrade')
  const [hours, setHours] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetch('http://ip-api.com/json/')
      .then(res => res.json())
      .then(data => {
        if (data.status === 'fail') setLocationUrl('Belgrade')
        else setLocationUrl(data.city)
      })
  }, [])

  useEffect(() => {
    fetchData()
  }, [locationUrl])

  async function fetchData() {
    setLoading(true)
    const responseCurrent = await fetch("https://weatherapi-com.p.rapidapi.com/current.json?q=" + locationUrl, {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
        "x-rapidapi-key": "28b934abfbmsh7e621fdcb173b9ap1a5374jsne80e8cc31889"
      }
    })
    const dataCurrent = await responseCurrent.json()
    setLocation(dataCurrent.location)
    setCurrent(dataCurrent.current)

    const responseForecast = await fetch("https://weatherapi-com.p.rapidapi.com/forecast.json?q=" + dataCurrent.location.lat + "," + dataCurrent.location.lon + "&days=3", {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
        "x-rapidapi-key": "28b934abfbmsh7e621fdcb173b9ap1a5374jsne80e8cc31889"
      }
    })
    const dataForecast = await responseForecast.json()
    setForecast(dataForecast.forecast)

    let tempHours = []
    dataForecast.forecast.forecastday.forEach(day => {
      day.hour.forEach(h => {
        if (moment().diff(moment(h.time)) < 0) {
          tempHours.push(h);
        }        
      });
    });

    setHours(tempHours)
    setLoading(false)
  }

  const setLoading = (loading) => {
    setIsLoading(loading)
  }

  return (
    <div className={classes.background}>
      {isLoading && <Loading />}
      <div className={classes.container}>
        <div className={classes.top}>
          <div className={classes.half}>
            <Location setLocationUrl={setLocationUrl} location={location} />
            <Condition current={current} />
          </div>
          <div className={classes.half}>
            <Temperature temperature={current} />
          </div>
        </div>
        <Forecast forecast={forecast} />
        <Hourly hours={hours} />
      </div>
    </div>
  );
}

export default App;
