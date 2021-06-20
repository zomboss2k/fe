import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import { Card, Spinner,Button, FormControl, Dropdown, Form,Alert } from 'react-bootstrap';
import {useSnackbar} from 'notistack';
import { useHistory } from 'react-router';
import axios from 'axios';

const submitAddpostAPI= (data) => {
    const url = "http://127.0.0.1:5000/api/addpost"
    return axios.post(url,data)
}
function Discusion() {
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
        const data = new FormData();
        data.append('comment',cmt.comment);
        data.append('username',cmt.username);
        try{
            const rs = await submitAddpostAPI(data);
            console.log(JSON.stringify(rs))
            if(rs.status === 200){
                enqueueSnackbar("Successfuly !!",{variant:'success'});
                history.push('discusion');
            }
            else {
                console.log(rs.data)
                enqueueSnackbar("Please Try Again !", { variant: "error" });
            }
        }catch(e){
            console.log("error: " + e);
            enqueueSnackbar("Please Try Again ",{variant:'error'});
        }
    }
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
                <Card>
                    <Card.Header>Featured</Card.Header>
                    <Card.Body>
                        <Card.Title>Special title treatment</Card.Title>
                        <Card.Text>
                            Your Content
                            </Card.Text>
                            {islogin
                            ?<><Form.Label>Put Your Every You Think That It ...</Form.Label>
                                <Form.Control as='textarea' row='3' onChange = {onValueChange}></Form.Control>
                                <Button variant="primary" type="submit" onClick = {onSubmit}>PUSH
                                </Button></>
                            :enqueueSnackbar("Vui Long Dang Nhap Truoc!", { variant: "error" })}
                    </Card.Body>
                </Card>
            </div>
            <div className="footer">
                <h4>day la footer</h4>     
            </div>           
        </div>
    );
}
export default Discusion;