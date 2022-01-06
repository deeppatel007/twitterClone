import { Col, Row, Card, Spinner, Button } from 'react-bootstrap';
import { useEffect, useState} from 'react';
import {CgProfile,AiOutlineLike} from 'react-icons/all';
import {FcIdea} from 'react-icons/fc'
import axios from 'axios';


const url = 'http://localhost:5000/api';

const Seecomments = (props) => {
    
    
    const [ postdata, setpostdata ] = useState(props.post);
    var [ commentdata, setcommentdata ] = useState([]);
    console.log(postdata);

    const commentfinder = async (postdata) => {
        console.log(postdata);
        try {
            await axios.get(`${url}/comment/search`,{'params':{usernameQ: postdata}})
            .then ((res) => {
                setcommentdata([...commentdata, res.data]);
                console.log(commentdata);
            })
        }catch(err) {
            console.log('Error while finding User',err);
        }
    }

    useEffect(() => {
        commentfinder(postdata);
    }, [])

    console.log(postdata);

    return (
        <div>
           <Row xs={1} md={1} className="justify-content-center" style={{marginLeft: '32%'}}>

           {<Col className = "mb-3">
                <Card style = {{backgroundColor: 'white', height:'auto',width:450, color: '#ffffff', borderWidth: '2px' , borderBlockColor:'#1DA1F2'}}>
                    <Card.Body> 
                        
                        <Card.Text>
                        <span style={{color:'black', fontWeight:600, display:'flex'}}><h4> <CgProfile style={{color:'black'}}></CgProfile>   {postdata}</h4> </span>
                                            <h4 style={{color:'black'}}>Twit:</h4>
                                         {/* <span style={{color:'#1DA1F2'}}>  {postdata[0].content}</span> */}
                                            

                            <br/>
                            
                        </Card.Text>
                    </Card.Body>
                </Card>
                </Col>
           }
            </Row>
            {
                <Row xs={1} md={1} className="g-4" style={{margin: '3% 3%'}}>
                {
                    (commentdata[0] === undefined)?
                        <div></div>:
                        commentdata[0].map((comment, index) => (
                            <Col className = "mb-3">
                                <Card style = {{backgroundColor: 'rgba(255,255,255, 0.15)', color: '#ffffff', borderWidth: '2px' , borderBlockColor:'orange'}}>
                                    <Card.Body> 
                                        
                                        <Card.Text>
                                        <span style={{color:'black', fontWeight:600, display:'flex'}}><h4> <CgProfile style={{color:'black'}}></CgProfile>   {comment.usernameQ}</h4> </span>
                                            <h4 style={{color:'black'}}>Twit:</h4>
                                         <span style={{color:'#1DA1F2'}}>  Comment : {comment.content} </span>
                                            

                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                }
                </Row>
            }
         </div>
    )
}


export default Seecomments;