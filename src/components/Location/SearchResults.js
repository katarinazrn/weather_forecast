import { Fragment, useEffect, useState } from 'react'
import classes from './Location.module.css'

const SearchResult = (props) => {

    const [scroll, setScroll] = useState(classes.result)

    useEffect(() => {
        if (props.results.length > 6) {
            setScroll(`${classes.result} ${classes.scroll}`)
        }
        else {
            setScroll(classes.result)
        }
    }, [props.results])

    if (props.results.error) {
        return <Fragment />
    }

    return (
        <ul className={scroll}>
            {props.results.map(result =>
                <li key={result.name} onClick={() => props.setLocationUrl(result)}>{result.name}</li>
            )}
        </ul>
    )
}

export default SearchResult