import React , {useEffect , useState , useRef} from 'react'
import {Col , Row, Spinner} from 'react-bootstrap';
import {Documenu} from '../configure';
import {useHistory} from 'react-router-dom'

import placeholder from '../assets/images/placeholder-image.png';

const FetchRestaurent = ({searchparams}) => {

    
    const stateRef = useRef();

    const nextPageRef = useRef();

    const fetchRef = useRef();

    const [searchquery , setsearchquery] = useState(searchparams);

    const [restaurent , setRestaurent] = useState({})

    const [loadMore , setloadMore] = useState(false);

    const [restaurenData , setRestaurenData] = useState([]);

    const [page , setpage] = useState(1);  
    
    const [nextPage , setNextPage] = useState(1)

    const [initalFetch , setInitalFetch] = useState(true)

    const history = useHistory();

    stateRef.current = loadMore;

    nextPageRef.current = nextPage;

    fetchRef.current = initalFetch;


    const setScrollheight = () => {

        if (window.scrollY + window.innerHeight ===  document.scrollingElement.scrollHeight ) {

            console.log('loading more');

            
            if(!fetchRef.current){

                !stateRef.current && nextPageRef.current && setsearchquery({...searchquery , page : page + 1})
    
                !stateRef.current && nextPage && setpage(page + 1)
    
                setloadMore(true)

            }
            
        }
    }


    useEffect(() => {

          Documenu.Restaurants.searchGeo(searchquery).then(res => {
                setRestaurenData([...restaurenData , ...res.data])
                setRestaurent(res)
                setInitalFetch(false)
                setNextPage(res.more_pages)
                setloadMore(false)
            }).then(() => console.log('fetching')).catch(err => console.log(err));

        window.addEventListener('scroll' , setScrollheight)

        return () => {
            window.removeEventListener('scroll' , setScrollheight)
        }

    },[page])

    const handleCardClick = (name) => {
        history.push(`/restaurents/${name}`)
       
    }

    return (
        <>
             <Row>
                    {restaurenData.map((rest) => {

                        return(
                            <>
                                <Col md={4} lg={3} style={{margin:"1em 0"}} key={rest.restaurant_id} onClick={() => handleCardClick(rest.restaurant_id)}>
                                  
                                        <div className ="restaurentCard">
                                            <div>
                                                <img className="img-fluid" src={placeholder} alt={rest.restaurant_name}/>
                                            </div>
                                            <div>
                                                <h3>{rest.restaurant_name}</h3>
                                                {rest.cuisines.map((cuisines , index) => {
                                                    return(
                                                        <>
                                                            { cuisines && <span style={{marginRight:"0.5em"}} key={index}>{cuisines},</span>}
                                                        </>
                                                    )
                                                })}
                                                <p>{rest.restaurant_phone}</p>
                                            </div>
                                        </div>
                                </Col>
                            </>
                        )
                        })} 
             </Row>
             {nextPageRef.current && <div style={{display:"grid" , placeItems:"center" , padding:"2em 0"}} >
                            <Spinner animation="border" />
            </div> }

        </>
    )
}

export default FetchRestaurent
