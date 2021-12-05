import loading from '../../assetss/loading.gif'
import classes from './Loading.module.css'
const Loading =(props)=>{
    return(
        <div className={classes.loading}>
            <img src={loading} alt='Loading...' />
        </div>
    )
}

export default Loading