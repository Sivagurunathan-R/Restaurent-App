import { useEffect } from 'react'
import {withRouter} from 'react-router-dom'

const ScrollToTop = ({history}) => {

    useEffect(() => {

        const unsub = history.listen(() => {
            window.scrollTo(0 , 0)
        })

        return () => {
            unsub();
        }

    }, [])

    return (null)
}

export default withRouter(ScrollToTop) ;
