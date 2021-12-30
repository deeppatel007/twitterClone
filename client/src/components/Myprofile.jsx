import { Col, Row, Card, Spinner, Button, Container } from 'react-bootstrap';
import { useEffect, useState, useContext} from 'react';
import {FaRegpostCircle} from 'react-icons/fa';
import axios from 'axios';
import { LoginContext } from '../controller/loginstate';
import Addcomments from './Addcomments';
import Seecomments from './Seecomments';
import Updatepost from './Updatepost';
import { Link } from 'react-router-dom';
const url = 'http://localhost:5000/api';

const Myprofile=()=>{
    var [ Updatepostdata, setUpdatepostdata ] = useState([]);

    const {account, setAccount} = useContext(LoginContext);
    console.log(account);
    const [ clickdone, setClickdone ] = useState("false");

    const [ clickUpdatepostid, setClickUpdatepostid ] =  useState();

    const UpdatepostSaver = async () => {
        try {
            await axios.get(`${url}/post/search`)
            .then ((res) => {
                console.log(res.data);
                setUpdatepostdata(Updatepostdata => ([...Updatepostdata, res.data]));
            })
        }catch(err) {
            console.log('Error while finding User',err);
        }
    }


    useEffect(() => {
        UpdatepostSaver();
    }, [clickdone])


    return (
        <>
         <div> <Row> <h4 style={{marginLeft:'44rem'}}> MyTwits</h4> 
         <Link to='/Followpage'>
                <Button variant="primary" size="sm" style={{marginLeft:'20rem',marginTop:10}} >
                                                Followers
                                            </Button>
                                            </Link>
                                            <Link to='/Followingpage'>
                                            <Button variant="outline-primary" style={{color:'blue',marginLeft:'2rem',marginTop:10}} size="sm" >
                                                Followings
                                            </Button>
                                            </Link>
                                            </Row>
            </div>
        <div>
        {        
            
            (clickdone === "false"  ) ? 
            <div>
            { 
                <Row xs={1} md={1} className="justify-content-center" style={{marginLeft: '32%'}}>
                {
                    (Updatepostdata[0] === undefined)?
                        <div></div>:
                        Updatepostdata[0].map((Updatepost, index) => (
                            (Updatepost.usernameQ===account) ?
                            <div> 
                            
                            <Col className = "mb-3">
                            <Card  style = {{backgroundColor: 'white', height:'auto',width:500, color: '#ffffff', borderWidth: '2px' , borderBlockColor:'#1DA1F2'}}>
                                      <Card.Body> 
                                       
                                        <Card.Text>
                                            <span style={{color:'black', fontWeight:600}}>Twit: </span> <span style={{color:'#1DA1F2'}}>{Updatepost.content} </span>
                                            <br/>
                                            
                                        </Card.Text>
                                        <div className="d-flex justify-content-around">
                                            <Button variant="outline-warning" size="sm" id="Seecomments" onClick={() => {setClickdone("Seecomments"); setClickUpdatepostid(Updatepost)}}>
                                                Comments
                                            </Button>
                                            
                                            <Button variant="outline-primary" style={{color:'blue'}} size="sm" id="Updatepost" onClick={() => {setClickdone("Updatepost"); setClickUpdatepostid(Updatepost)}}>
                                                Edit Twit
                                            </Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col></div>:<div></div>
                        ))
                }
                </Row>
            }
            </div>
            :
            <div>
            {
                (clickdone === "Seecomments")?
                <div>
                    <Seecomments Updatepost={clickUpdatepostid} />
                </div>
                : 
                <div>
                {
                    (clickdone === "Addcomments")?
                    <div>
                        <Addcomments Updatepost={clickUpdatepostid._id} />
                    </div>
                    :
                    <div>
                        <Updatepost Updatepost={clickUpdatepostid} />
                    </div>
                }
                </div>
            }
                <div className="d-flex justify-content-center">
                    <Button variant="outline-light" style={{color:'orange'}} size="lg" id="Addcomments" onClick={() => {setClickdone("false"); UpdatepostSaver(); setUpdatepostdata([])}}>
                       Home page
                    </Button>
                </div>
            </div>
        }
        </div>
        </>
    )

}

export default Myprofile;