import { Form, Row, Col, Button } from 'react-bootstrap';
import {useState} from 'react';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { add_post } from '../services/service';
import { LoginContext } from '../controller/loginstate';
import { GiEclipseFlare } from 'react-icons/gi';
let count=140;
const Post = () => {

    const {account, setAccount} = useContext(LoginContext);
    setAccount(localStorage.getItem("user"));
    const PostInitialValues = {
        content: '',
        usernameQ: account
    };

    const [Post, setPost] = useState(PostInitialValues);

    const onInputChange = (e) => { 
        count=140-Post.content.length;
        if(Post.content.length < 140)
        {  
            setPost({ ...Post, [e.target.name]: e.target.value });
        }
        else 
        {   
            e.target.value=e.target.value.substring(0, 140);
           

            setPost({ ...Post, [e.target.name]: e.target.value });
        }
    }

    const history = useHistory();
    
    const clickHandler = async () => {
        console.log(Post);
        let response = await add_post(Post);
        if(!response) {
            alert("invalid post");
            setPost({ ...Post, content: ''});
            return;  
        }
        console.log(PostInitialValues);
        setPost(PostInitialValues);
    }

    return (
        <div style={{ display: 'block', 
        width: '100%',
        margin: '50px auto',
        borderRadius: '5px',
        background: 'white',
        padding: 80,
        }} className="col-8">
            <h4 style={{color: 'black', display:'flex', justifyContent: "center", alignItems: "center", marginBottom: 20}}>
            Add Your Twit Here
            </h4>
            <Form className="my-4">
                
                <Row>
                    <Form.Group as={Col}>
                        <Form.Label style={{fontSize: 20, color: 'black'}}>
                            <span>Add Your Twit</span>
                        </Form.Label>
                        <Form.Control maxLength="141" onChange={(e) => onInputChange(e)} value={Post.content} name="content" as="textarea" placeholder="enter the post"/>
                    </Form.Group>
                </Row>
                <p> remaining words {count} </p>
                <Button size="lg" variant="outline-primary" style={{color:'black'}} onClick={() => clickHandler()} style={{marginLeft: '45%', marginTop: 40}}>
                    Submit
                </Button>
            </Form>
        </div>
    ) 
}

export default Post;