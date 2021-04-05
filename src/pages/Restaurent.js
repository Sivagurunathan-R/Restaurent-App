import React , {useEffect, useState} from 'react';
import {useParams , useHistory} from 'react-router-dom';
import { Col, Container, Row, Spinner } from 'react-bootstrap';

import placeholder from '../assets/images/food.jpg';
import Documenu from 'documenu';

const Restaurent = () => {

    const {name} = useParams();

    const [restaurent , setRestaurent]  = useState()

     const [loading , setLoading] = useState(true)


     const [activeMenu , setActiveMenu] = useState();


     const history = useHistory();
  

    const toggleMenu = (menu) => {
        setActiveMenu(menu)
    }


    useEffect(() => {

        Documenu.Restaurants.get(name).then(res =>{
            console.log(res)
            setRestaurent(res.result)
            setActiveMenu(res.result.menus[0].menu_sections[0])
            setLoading(false);
        }
        )
    },[])

    const handleBackBtn = () =>{
        history.goBack();
    }


    return (
        <>
        {loading ? 
        
        <>
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
        </>
        :
        <> 
        
        <section  style={{backgroundColor:'#252525'}}>
                    <Container style={{ paddingTop:"2em" }}>
                           <button className="backbtn" onClick={handleBackBtn}>back</button>
                    </Container>
                    <Container>
                        <div style={{padding: "3em 0"}}>
                        <Row>
                                <Col md="4">
                                    <div className="withbtn">
                                            <img className="img-fluid" src={placeholder} alt={restaurent.restaurant_name}/>
                                    </div>
                                </Col>
                                <Col md="8">

                                <div className="restaurent-Contenst">
                                    <h2>{restaurent.restaurant_name}</h2>
                                    {restaurent.cuisines.map((cuisines , index) => {
                                        return(
                                            <>
                                                { cuisines && <span style={{marginRight:"0.5em"}} key={index}>{cuisines},</span>}
                                            </>
                                        )
                                    })}
                                    <p>Mobile : {restaurent.restaurant_phone}</p>
                                    <p>{restaurent.address.city} , {restaurent.address.state}</p>
                                    {restaurent.restaurant_website && <p>Website : {restaurent.restaurant_website}</p>}
                                </div>

                                
                                </Col>
                            </Row>
                            </div>
                </Container>
            </section>

            <section style={{margin:"2em 0"}}>
                <Container>
                    <Row>
                        <Col lg="3">
                            <ul className="menuitems-menu">

                                {restaurent.menus[0].menu_sections.map((menu , index) => {
                                        return(
                                            <>
                                                <li key ={index} onClick={() => toggleMenu(menu)} className={activeMenu.section_name === menu.section_name ? 'active'  : ''}>{menu.section_name}</li>
                                            </>
                                        )
                                })}

                            </ul>
                        </Col>
                        <Col lg="9">

                            <h2 className="menu-headings active">{activeMenu.section_name}</h2>

                            {restaurent.menus[0].menu_sections.find((menu) => menu === activeMenu ).menu_items.map((menuitem ,index) => {
                                
                                return (
                                    <>
                                        <div className="menuitems-card" key={index} >
                                            <h2>{menuitem.name}</h2>
                                            <p>{menuitem.pricing[0].priceString}</p>
                                        </div>
                                    </>
                                )
                            })}
                        </Col>
                    </Row>
                </Container>
            </section>

              

        </>}
            


        </>
    )
}

export default Restaurent
