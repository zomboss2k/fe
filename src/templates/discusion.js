import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Card, Spinner,Button, FormControl, Dropdown, Form,Alert } from 'react-bootstrap';
import {useSnackbar} from 'notistack';
import { useHistory } from 'react-router';
import axios from 'axios';
import {getAPI} from '../service/api.js';

const getPostAPI = () => {
  return getAPI("/showpost");
}
function Discusion() {
    const [postt, setPostt] = useState([]);
    const history = useHistory();
    const {enqueueSnackbar} = useSnackbar();
    let name = "";
    const token = localStorage.getItem("token");
    console.log("token fist:"+token);
    
    let islogin = false;
    if(token != null){
        islogin = true;
        console.log("token: "+token);
        name = token.split('=')[1];
    }
    const [cmt,setCmt] = useState({comment:'',username:name});
    const onValueChange = (event) =>{
        setCmt(prev =>({...prev, comment:event.target.value}));
    }
    const onSubmit = async ()=>{
    }
        useEffect(() => {
        const requestData = async () => {
        try {
            const result = await getPostAPI();
            if (result.status === 200) {
                setPostt(result.data);
            }
        } catch (e) {
            console.log("error: ",e);
        }
    };
    requestData();
    }, []);
    return(
        <div className="container" style={{'bgcolor':''}} >
            <div className="header" >
                <nav class="navbar navbar-default navbar-static-top" role="navigation" style={{'background-color':'greenyellow'}}>
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic"> Type
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">IT</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Learning</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Working</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Photography</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Free Lance</Dropdown.Item>
                    </Dropdown.Menu>
                    </Dropdown>
                    <Link class="navbar-brand" to={{pathname: "/"}} style={{width:'10px'}}>ABC FORUM</Link>
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-success">Search</Button>
                </Form>
                {name 
                ?<Alert class="">Hello {name} !!</Alert>  
                :console.log("name: "+name) }
                <ul class="nav navbar-nav" style={{float:'right','flex-direction':'unset'}}>
                    <li style={{width:'80px','margin-right':'10px'}}>
                        {islogin
                        ?<Link to={{pathname: "/addpost"}}>Add Post</Link>
                        :<Link to={{pathname: "/login"}}>Sign in</Link>}
                    </li>
                    <li className="active">
                        {islogin 
                        ?<Link to={{pathname: "/sigout"}}>Sign Out</Link>   
                        :<Link to={{pathname: "/resigter"}}>Sign Up</Link>}
                    </li>
                </ul>
            </nav>
            </div>
            <div className="content">
                {postt.map((row) =>(
                    <Card>
                    <Card.Header>{row.type}</Card.Header>
                    <Card.Body>
                        <Card.Title>{row.title}</Card.Title>
                        <Card.Text>
                            {row.detail}
                            </Card.Text>
                            <Link to = 'discusion?'>Discusion</Link>
                    </Card.Body>
                </Card>
                ))}
                            {islogin
                            ?<><Form.Label>Put Your Every You Think That It ...</Form.Label>
                                <Form.Control as='textarea' row='3' onChange = {onValueChange}></Form.Control>
                                <Button variant="primary" type="submit" onClick = {onSubmit}>PUSH
                                </Button></>
                            :enqueueSnackbar("Vui Long Dang Nhap Truoc!", { variant: "error" })}
            </div>
            <div className="footer">
                <h4>day la footer</h4>     
            </div>           
        </div>
    );
}
export default Discusion;