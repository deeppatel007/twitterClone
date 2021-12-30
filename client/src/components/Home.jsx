import { Col, Row, Card, Spinner, Button, Container } from 'react-bootstrap';
import {FaRegpostCircle} from 'react-icons/fa';
import axios from 'axios';
import { LoginContext } from '../controller/loginstate';
import Addcomments from './Addcomments';
import Updatepost from './Updatepost';
import Seecomments from './Seecomments';
import { useEffect, useState, useContext} from 'react';
import { Link } from 'react-router-dom';
import {CgProfile,AiOutlineLike} from 'react-icons/all';
import {FaRegComment} from 'react-icons/all';
const url = 'http://localhost:5000/api';

const Home = () => {
    
    var [ postdata, setpostdata ] = useState([]);

    const {account, setAccount} = useContext(LoginContext);
    setAccount(localStorage.getItem("user"));

    const [ clickdone, setClickdone ] = useState("false");

    const [ clickpostid, setClickpostid ] =  useState();

    const postSaver = async () => {
        try {
            await axios.get(`${url}/post/search`)
            .then ((res) => {
                console.log(res.data);
                setpostdata(postdata => ([...postdata, res.data]));
            })
        }catch(err) {
            console.log('Error while finding User',err);
        }
    }


    useEffect(() => {
        postSaver();
    }, [clickdone])

    console.log(postdata[0]);


    return (
        <div>
        {
            (clickdone === "false") ? 
            <div>
            {
                // component for all the posts output
                <Row xs={1} md={1} className="justify-content-center" style={{marginLeft: '32%'}}>
                {
                    (postdata[0] === undefined)?
                        <div></div>:
                        postdata[0].map((post, index) => (
                            <Col className = "mb-3">
                                <Card  style = {{backgroundColor: 'white', height:'auto',width:500, color: '#ffffff', borderWidth: '2px' , borderBlockColor:'#1DA1F2'}}>
                                    <Card.Body> 
                                        <Card.Text>
                                       
                                           <span style={{color:'black', fontWeight:600, display:'flex'}}><h4> <CgProfile style={{color:'black'}}></CgProfile>   {post.usernameQ}</h4> </span>
                                         
                                         <span style={{color:'#1DA1F2'}}>{post.content}</span>
                                            
                                            
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
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
                    <Seecomments post={clickpostid} />
                </div>
                : 
                <div>
                {
                    (clickdone === "Addcomments")?
                    <div>
                        <Addcomments post={clickpostid._id} />
                    </div>
                    :
                    <div>
                        <Updatepost post={clickpostid} />
                    </div>
                }
                </div>
            }
                <div className="d-flex justify-content-center">
                    <Button variant="outline-light" style={{color:'orange'}} size="lg" id="Addcomments" onClick={() => {setClickdone("false"); postSaver(); setpostdata([])}}>
                        Home page
                    </Button>
                </div>
            </div>
        }
        </div>
    )
}


export default Home;