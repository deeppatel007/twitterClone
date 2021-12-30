import { Form, Row, Col, Button } from 'react-bootstrap';
import {useState} from 'react';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { add_comment } from '../services/service';
import { LoginContext } from '../controller/loginstate';

const Addcomments = (props) => {
    // const Q = props.postdataid;
    // console.log(Q);
    // console.log(props.post);
    const [postdataid, setPostdataid] = useState(props.post);
    console.log(postdataid);
    const {account, setAccount} = useContext(LoginContext);
    setAccount(localStorage.getItem("user"));
    // const [ Updatepostdata, SetUpdatepostdata ] = useState(props.Updatepost);
    const history = useHistory();

    if(account === '') 
    {
        history.push('/login');
        alert("login to continue");
    }

    const commentInitialValues = {
        content: '',
        usernameQ: postdataid
    };

    const [comment, setcomment] = useState(commentInitialValues);

    const onInputChange = (e) => {
        setcomment({ ...comment, [e.target.name]: e.target.value });
    }

    
    const clickHandler = async () => {
        let response = await add_comment(comment);
        if(!response) {
            alert("invalid post");
            setcomment({ ...comment, content: ''});
            return;  
        }
        setcomment(commentInitialValues);
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
                Add Your Comment Here
            </h4>
            <Form className="my-4">
                <Row>
                    <Form.Group as={Col}>
                        <Form.Label style={{fontSize: 20, color: 'black'}}>
                            <span>Write Comment</span>
                        </Form.Label>
                        <Form.Control onChange={(e) => onInputChange(e)} value={comment.content} name="content" as="textarea" placeholder="enter the body of your comment"/>
                    </Form.Group>
                </Row>
                <Button size="lg" variant="outline-primary" onClick={() => clickHandler()} style={{marginLeft: '44%', marginTop: 40}}>
                    Add
                </Button>
            </Form>
        </div>
    ) 
}

export default Addcomments;