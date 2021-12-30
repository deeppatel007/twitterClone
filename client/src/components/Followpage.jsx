import { Col, Row, Card, Spinner, Button, Container } from 'react-bootstrap';
import {FaRegpostCircle} from 'react-icons/fa';
import axios from 'axios';
import { LoginContext } from '../controller/loginstate';
import Addcomments from './Addcomments';
import Updatepost from './Updatepost';
import Seecomments from './Seecomments';
import { useEffect, useState, useContext} from 'react';

import {CgProfile,AiOutlineLike} from 'react-icons/all';
import {FaRegComment} from 'react-icons/all';
const url = 'http://localhost:5000/api';

const Followpage=() => {
    var [ userdata , setUserdata ] = useState([]);

    const {account, setAccount} = useContext(LoginContext);

    const [ clickdone, setClickdone ] = useState("false");

    const [ clickuserid, setClickuserid ] =  useState();

    const [ followclick, setFollowclick ] = useState({username1: account, username2: ""});
 

    const userSaver = async () => {
        try {
            await axios.get(`${url}/follow/search`,{'params': {userid: account}})
            .then ((res) => {
                console.log(res.data);
                setUserdata(userdata => ([...userdata, res.data]));
            })
        }catch(err) {
            console.log('Error while finding User',err);
        }
    }

    // const followclickdone = async () => {
       
    //     try {  console.log(followclick);
    //         await axios.post(`${url}/follow`, followclick)
    //     } catch(err) {
    //         console.log('Error while following User',err);
    //     }
    // }


    useEffect(() => {
        userSaver();
    }, [clickdone] ) 
console.log("==>userdata", userdata);
    return(
        <div>
        {
            (clickdone === "false") ? 
            <div>
            {
                // component for all the posts output
                <Row xs={1} md={1} className="justify-content-center" style={{marginLeft: '32%'}}>
                {
                    (userdata[0] === undefined)?
                        <div></div>:
                        userdata[0].map((post, index) => (
                            <Col className = "mb-3" style={{display:'flex'}}>
                                <Card  style = {{display:'flex' , backgroundColor: 'white', height:80,width:300, color: '#ffffff', borderWidth: '2px' , borderBlockColor:'orange'}}>
                                    <Card.Body> 
                                        <Card.Text>                                       
                                       <p style={{color:'black'}}>  {post.follower} <br></br></p>
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
                    <Seecomments post={clickuserid} />
                </div>
                : 
                <div>
                {
                    (clickdone === "Addcomments")?
                    <div>
                        <Addcomments post={clickuserid._id} />
                    </div>
                    :
                    <div>
                        <Updatepost post={clickuserid} />
                    </div>
                }
                </div>
            }
                <div className="d-flex justify-content-center">
                    <Button variant="outline-light" style={{color:'orange'}} size="lg" id="Addcomments" onClick={() => {setClickdone("false");userSaver(); setUserdata([])}}>
                        Home page
                    </Button>
                </div>
            </div>
        }
        </div>
    
    )
}
export default Followpage;