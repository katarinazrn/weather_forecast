import styles from './Location.module.css'
import moment from "moment"
import { useEffect, useState, useRef, Fragment } from 'react'
import SearchResult from './SearchResults'

const Location = (props) => {

    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    const inputFocus = useRef();
    const locationRef = useRef();

    useEffect(() => {
        document.addEventListener('mousedown', (event) => {
            if (locationRef.current && !locationRef.current.contains(event.target)) {
                setIsSearching(false)
            }
        });
    }, [])

    useEffect(() => {
        if (inputFocus.current) inputFocus.current.focus();
        if(searchTerm.trim()==='') return;

        fetch("https://weatherapi-com.p.rapidapi.com/search.json?q=" + searchTerm, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
                "x-rapidapi-key": "28b934abfbmsh7e621fdcb173b9ap1a5374jsne80e8cc31889"
            }
        })
            .then(response => response.json())
            .then(data => setSearchResults(data))
            .catch(err => {
                console.error(err);
            });
    }, [searchTerm])
  
    const setLocationUrl = (result) => {
        setSearchTerm(result.name)
        setIsSearching(false)
        props.setLocationUrl(result.url)
    }

    const startSearch = () => {
        setIsSearching(true)
        setSearchTerm(props.location.name)
    }

    if (props.location)
        return (
            <div className={styles.container}>
                <div ref={locationRef}>
                    {!isSearching &&
                        <div onClick={startSearch} title='Click to change location' className={styles.location}>
                            {props.location.name}
                        </div>}
                    {isSearching &&
                        <div className={styles.location}>
                            <input
                                autoFocus
                                ref={inputFocus}
                                className={styles.input}
                                type='text'
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)} />
                        </div>}
                    {isSearching && searchResults.length > 0 &&
                        <SearchResult setLocationUrl={setLocationUrl} results={searchResults} />}
                </div>
                <div className={styles.date}>
                    {moment().format("MMMM DD, YYYY")}
                </div>
            </div>
        )

    return <Fragment />
}

export default Location