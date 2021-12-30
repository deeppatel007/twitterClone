import { Form, Row, Col, Button } from 'react-bootstrap';
import {useState} from 'react';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { add_post } from '../services/service';
import { LoginContext } from '../controller/loginstate';

const Updatepost = (props) => {

    const {account, setAccount} = useContext(LoginContext);
    setAccount(localStorage.getItem("user"));
    const [ Updatepostdata, SetUpdatepostdata ] = useState(props.Updatepost);
    console.log(Updatepostdata);
    const UpdatepostInitialValues = {
        _id: Updatepostdata._id,
        title: Updatepostdata.title,
        content: Updatepostdata.content,
        usernameQ: account
    };

    const history = useHistory();

    if(Updatepostdata.usernameQ != account)
    {
        alert("only author can edit")
        history.push('/login');
    }

    const [post, setpost] = useState(UpdatepostInitialValues);

    const onInputChange = (e) => {
        setpost({ ...post, [e.target.name]: e.target.value });
    }

    const clickHandler = async () => {
        let response = add_post(post);
        console.log(response);
        alert("successfully updated");
        setpost(UpdatepostInitialValues);
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
                Edit your Post
            </h4>
            <Form className="my-4">
                <Row>
                    <Form.Group as={Col}>
                        <Form.Label style={{fontSize: 20, color: 'black'}}>
                            <span>Type Your Post</span>
                        </Form.Label>
                        <Form.Control maxLength="141" onChange={(e) => onInputChange(e)} value={post.content} name="content" as="textarea" placeholder="enter the post"/>
                    </Form.Group>
                </Row>
                <Button size="lg" variant="outline-primary" style={{color:'orange'}} onClick={() => clickHandler()} style={{marginLeft: '45%', marginTop: 40}}>
                    Submit
                </Button>
            </Form>
        </div>
    ) 
}

export default Updatepost;