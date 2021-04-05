import React , {useState , useEffect , useRef} from 'react'
import { Button, Col, Container, Form, InputGroup, Spinner } from 'react-bootstrap';
import FetchRestaurent from './FetchRestaurent';
import {useHistory} from 'react-router-dom'


const Home = () => {

    const [loading , setLoading] = useState(true);

    const [query , setQuery] = useState(
        {
            "restaurant_name" : "" , "zip_code" : "99501"
        }
    );

    const [emptybox , setEmptybox] = useState(false)

    const history = useHistory();

    const inputBox = useRef();

    const [searchparams , setSearchparams] = useState({
        lat:'',
        lon:'',
        distance : 1,
        page : 1
    });      
    
    const definedParams = {
        "lat": "61.217831",
        "distance": "1",
        "lon": "-149.86438",
        "page": "1",
        "fullmenu" : "true"
    }

    const getCurrentLocation = async () => {

        await navigator.geolocation.getCurrentPosition(
            position => setSearchparams(
                {
                    ...searchparams,
                    lat : position.coords.latitude,
                    lon :  position.coords.longitude
                }
            ),
            err => console.log(err),
        );
    }


    useEffect(() => {

            setLoading(true);

            getCurrentLocation()

            setTimeout(() => {
                setLoading(false)
            },1000)

    },[])

    const params = {"restaurant_name" : "Dolce Vita" , "zip_code" : "99501"}

    const handleSearchSubmit = (e) => {

        e.preventDefault()

        if(query.restaurant_name !== ''){

            history.push(`/search/${query.restaurant_name}/${query.zip_code}`)
            
        }else{
            inputBox.current.classList.add('invalid')
            setEmptybox(true)
        }

    }


    return (
        <>
            {!loading ?
            <>
                    <div className="searchBanner">
                        <Container style={{ display:"grid" , placeItems:'center' }}>
                            <Col md={5}>
                                <Form onSubmit={handleSearchSubmit}>
                                    <InputGroup>
                                        <Form.Control ref={inputBox} type="text" onChange={(e) => setQuery({...query , restaurant_name : e.target.value}) } value={query.restaurant_name} placeholder="Search Restaurent *"></Form.Control>
                                        <InputGroup.Append>
                                            <Button varitent="primary" type="submit" className="searchbtn">search</Button>
                                        </InputGroup.Append>
                                    </InputGroup>
                                    {emptybox && <p className='errorInput'>please fill required details</p>}
                                </Form>
                            </Col>
                        </Container>
                        </div>

                    <Container >
                        {!loading && <FetchRestaurent searchparams={definedParams}></FetchRestaurent>}
                    </Container>
            </>
                : <div style={{
                    height:"100vh" , 
                    width: "100%" ,
                    maxWidth:"100vw",
                    display:"grid",
                    placeItems:"center"
                    
                    }
                     }> 
                    <Spinner animation="border" /> 
                </div>
            }
        </>
    )
}

export default Home
