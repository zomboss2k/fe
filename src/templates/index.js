import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Card, Spinner,Button, FormControl, Dropdown, Form,Alert,Row,Col } from 'react-bootstrap';
import {getAPI} from '../service/api.js';
import axios from 'axios';

const instance = axios.create({
  baseURL: "http://127.0.0.1:5000/api/login",
});
const getPostAPI = () => {
  return getAPI("/showpost");
};

const getPost = async() => {
    return await instance.get('/api/showpost');
}
function Index() {
    let name = "";
    const token = localStorage.getItem("token");
    console.log("token fist:"+token);
    const [postt, setPostt] = useState([]);
    let islogin = false;
    if(token != null){
        islogin = true;
        console.log("token: "+token);
        name = token.split('=')[1];
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

    const _onDelete = async (id) => {
        console.log("onDelete")
    }
    const _onEdit = async (id) => {
        console.log("onEdit")
    }
    return(
        <div className="container" style={{'margin-top':'20px'}} >
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
            <div className="content" style={{'padding':'10px 0px'}}>
                {postt.map((row) =>(
                    <Card>
                    <Card.Header>{row.type}</Card.Header>
                    <Card.Body>
                        <Card.Title>{row.title}</Card.Title>
                        <Card.Text>
                            {row.detail}
                            </Card.Text>
                            <Link>Discusion</Link><br/>
                            {name == row.username
                            ?<div className="onCRUD" style={{float:'right','margin-right':'100px'}}>
                                <Button variant="warning" onClick={() => _onEdit(row.post_ID)} style={{'margin-right':'30px'}}>Edit</Button>
                                <Button variant="danger" onClick={() => _onDelete(row.post_ID)}>Delete</Button>
                            </div>
                            : "Posted by: "+name
                            }
                    </Card.Body>
                </Card>
                ))}
            </div>
            <div className="footer" style={{'background-color':'gray','color':'white'}}>
                    <Row style={{padding:'10px'}}>
                        <Col xs={{ order: 'first' }}>ABC Developers was founded by developers, for developers. It is now a valuable resource for people who want to make the most of their mobile devices, from customizing the look and feel to adding new functionality</Col>
                        <Col xs>Contact us with:
                        <br/>Email: dotuanthinh37.work@gmail.com<br/>Phone Number: +84335833737<br/>Address: 566 Nui Thanh, Hai Chau, TP Da Nang
                        </Col>
                        <Col xs={{ order: 'last' }}>
                            <div class="block">
                                <h3 class="block-minorHeader">Subscribe to our newsletter</h3>
                                Receive the freshest Android; development news right in your inbox!
                                <form class="xda_subscribeForm" action="" method="post" id="newsletters-2-form"/>
                                <input id="wpml-2email" type="text" name="email" class="input" placeholder="your@email"/>
                                <button type="submit" name="subscribe"><i class="mdi mdi-arrow-right"></i></button>
                                <input type="hidden" id="2list-list-select" name="list_id[]" value="3"/>
                            </div>
                        </Col>
                    </Row>                             
            </div>           
        </div>
    );
}
export default Index;