import {Navbar, Nav, Button, Container, Dropdown} from 'react-bootstrap';
import { useContext } from 'react';
import {Link} from 'react-router-dom'
import { LoginContext } from '../controller/loginstate';
import { useHistory } from 'react-router-dom';
import {IoMdPower} from 'react-icons/io';
import {BiCodeAlt} from 'react-icons/bi';
import {FaTwitter,CgProfile} from 'react-icons/all';

const Header = () => {

    const { account,setAccount } = useContext(LoginContext);
    
    const history = useHistory();

    const clickHandler = () => {
        history.push('/');
        setAccount('');
    }

    return (
        <Navbar style={{height: 50, background: 'black', marginTop: 10}} sticky="top">
            <Link to='/Home' className="mx-auto">
                <Navbar.Brand>
                    
                    <span style={{color:'#ffffff', fontWeight: 600}}>Twit</span>
                    <span style={{color:' #1DA1F2', fontWeight: 600}}>It</span>
                    <FaTwitter className="mb-1" style={{color: '#1DA1F2'}}/>
                </Navbar.Brand>
            </Link>
            {
                account === '' ?
               <div></div>
                :
                <Nav className="ml-auto mx-auto">
                    <Link to='/add_Post'>
                        <Nav.Item  className="mr-4">
                            <Button variant="outline-light" style={{color:'#1DA1F2'}}>
                                Add Your Twit
                            </Button>
                        </Nav.Item>
                    </Link>
                    <Dropdown>
                        <Dropdown.Toggle variant="outline-light" id="dropdown-basic">
                            {account}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                        <Link to='/Myprofile'>
                        <div style={{color:'black', background:' white', marginLeft:14}}>
                               <p style={{marginLeft:10}}> Myprofile</p>
                            </div>
                            </Link>
                            <Link to='/Userpage'>
                        <div style={{color:'black', background:' white', marginLeft:14}}>
                               <p style={{marginLeft:10}}> users</p>
                            </div>
                            </Link>
                            <Dropdown.Item onClick={clickHandler}>
                                <IoMdPower />
                                Logout
                            </Dropdown.Item>
                        
                            
                        </Dropdown.Menu> 
                        

                    </Dropdown>
                </Nav> 
            }
        </Navbar>
    )
}

export default Header;
