import { Form, Col, Button } from 'react-bootstrap';
import { authenticateLogin } from '../services/service.js';
import { useState , useContext} from 'react';
import { LoginContext } from '../controller/loginstate.jsx';
import {useHistory} from 'react-router-dom'
import { SiGnuprivacyguard } from 'react-icons/all';

const loginInitialValues = {
    username: '',
    password: '',
};


const Login = () => {

    const [login, setLogin] = useState(loginInitialValues);

    const {account, setAccount} = useContext(LoginContext);

    const onValueChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    }
    
    const history = useHistory();

    const clickHandler = async () => {
        let response = await authenticateLogin(login);
        if(!response) {
            alert("invalid login");
            
            setLogin({ ...login, password: ''});
            return;  
        }
        localStorage.setItem("user",(login.username));
        // alert("login successfully");
        setAccount(localStorage.getItem("user"));
        setLogin(loginInitialValues);
        history.push('/Home');
    }
    

    return (
        <div style={{ display: 'block', 
        width: '30%',
        margin: '100px auto',
        borderRadius: '5px',
        background: 'white',
        padding: 30,
        }}>
            <h4 style={{color: ' #1DA1F2', display:'flex', justifyContent: "center", alignItems: "center", marginBottom: 15}}>
                <SiGnuprivacyguard style={{color: ' #1DA1F2', fontSize: 20}} className="mr-2"/>
                Login
            </h4>
            <Form>
                <Form.Group as={Col}>
                    <Form.Label style={{fontSize: 20, color: 'black'}}>
                        <span>User Name</span>
                    </Form.Label>
                    <Form.Control onChange={(e) => onValueChange(e)} value={login.username} name="username" type="text" placeholder="Enter User Name"/>
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label style={{fontSize: 20, color: 'black'}}>
                        <span>Password</span>
                    </Form.Label>
                    <Form.Control onChange={(e) => onValueChange(e) } name="password" value={login.password} type="password" placeholder="Enter Password"/>
                </Form.Group>
                <Button size="lg"  style={{color:' #1DA1F2'}} onClick={() => clickHandler()} style={{marginLeft: '40%', marginTop: 20}}>
                    Login
                </Button>
            </Form>
        </div>
    )
}

export default Login;