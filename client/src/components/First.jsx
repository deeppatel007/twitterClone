
import {Navbar, Nav, Button, Container, Dropdown} from 'react-bootstrap';
import { useContext } from 'react';
import {Link} from 'react-router-dom';
const First=()=>{
    return(
        <div style={{display: 'flex'}}>
        
        <img style={{width: '50rem', height: '42rem'}} src={"https://www.sundayguardianlive.com/wp-content/uploads/2020/07/Abhin-Twitter-response-edied.jpg"} />
       

         <div style={{marginTop:'25rem', marginLeft:'15rem'}}>
            
                        <Link to='/Signup'>
                            
                                <Button variant="outline-primary" size="sm">
                                    Signup
                                </Button>
                            
                        </Link>
                          <br></br> <br></br>
                        <Link to='/Login'>
                           
                                <Button  variant="outline-primary" size="sm">
                                    Login
                                </Button>
                            
                        </Link>
              
       <p >By signing up, you agree to the <span style={{color: 'blue'}}>Terms of Service</span> and <span style={{color: 'blue'}}>Privacy
            <br/> Policy</span>, including <span style={{color: 'blue'}}>Cookie Use.</span></p>
            
        </div>
       
    </div>

    )
};

export default First;