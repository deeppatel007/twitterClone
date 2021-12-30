import { Form, Row, Col, Button } from 'react-bootstrap';
import { SiGnuprivacyguard } from 'react-icons/all';
import {authenticateSignup} from '../services/service';
import {useState} from 'react';
import { useHistory } from 'react-router-dom';




const signupInitialValues = {
    username: '',
    password: ''
};


const Signup = () => {

    const [signup, setSignup] = useState(signupInitialValues);

    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value });
    }

    const history = useHistory();
    
    const clickHandler = async () => {
        console.log(signup);
        let response = await authenticateSignup(signup);
        if(!response) {
            alert("invalid signup");
            setSignup({ ...signup, password: ''});
            return;
        }
        setSignup(signupInitialValues);
        history.push('/login');
    }

    return (
        <div style={{ display: 'block', 
        width: '30%',
        margin: '100px auto',
        borderRadius: '5px',
        background: 'white',
        padding: 30,
        }} className="col-8">
           <h4 style={{color: ' #1DA1F2', display:'flex', justifyContent: "center", alignItems: "center", marginBottom: 15}}>
                <SiGnuprivacyguard style={{color: ' #1DA1F2', fontSize: 20}} className="mr-2"/>
                signup
            </h4>
            <Form>
                <Row>
                    <Form.Group as={Col}>
                        <Form.Label style={{fontSize: 20, color: 'black'}}>
                            <span>User Name</span>
                        </Form.Label>
                        <Form.Control onChange={(e) => onInputChange(e)} value={signup.username} name="username" type="text" placeholder="Enter User Name"/>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col}>
                        <Form.Label style={{fontSize: 20, color: 'black'}}>
                            <span>Password</span>
                        </Form.Label> 
                        <Form.Control onChange={(e) => onInputChange(e)} value={signup.password} name="password" type="password" placeholder="Enter Password"/>
                    </Form.Group>
                </Row>
                <Button size="lg" variant="outline-primary"  onClick={() => clickHandler()} style={{marginLeft: '40%', marginTop: 20}}>
                    SignUp
                </Button>
            </Form>
        </div>
    ) 
}

export default Signup;