import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Card, Spinner,Button, FormControl, Dropdown, Form,Alert,Row,Col } from 'react-bootstrap';
import {useSnackbar} from 'notistack';
import {getAPI} from '../service/api.js';
import { useParams } from 'react-router';
import axios  from 'axios';

const discusionAPI = (id) => {
  return getAPI("/selectpost/"+id);
}
const submitcmt= (data) => {
    const url = "http://127.0.0.1:5000/api/addcmt"
    return axios.post(url,data)
}
const showbyID = (id) => {
    return getAPI('/showcmtbyID/'+id)
}
function Discusion() {
    let {id} = useParams();
    const [postt, setPostt] = useState([]);
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
    const [comment,setComment] = useState([]);
    const [cmt,setCmt] = useState({comment:'',username:name,post_ID:id});
    const onValueChange = (event) =>{
        setCmt(prev =>({...prev, comment:event.target.value}));
        console.log("your comment "+cmt.comment)
    }
    useEffect(() => {
        document.title = "Discusion-Abc Forum"
    }, []);
    const onSubmit = async ()=>{
        const data = new FormData();
        data.append("comment",cmt.comment);
        data.append("username",cmt.username);
        data.append("post_ID",cmt.post_ID);
        try{
            const rs = await submitcmt(data);
            console.log(JSON.stringify(rs))
            if(rs.status === 200){
                enqueueSnackbar("Successfully !!",{variant:'success'});
                window.location.reload(false);
            }
            else {
                console.log(rs.data)
                enqueueSnackbar("Please Try Again !", { variant: "error" });
            }
        }catch(e){
            console.log("error: " + e);
            enqueueSnackbar("Please Try Again",{variant:'error'});
        }
    }
        useEffect(() => {
        const requestData = async (props) => {
        try {
            const result = await discusionAPI(id);
            if (result.status === 200) {
                setPostt(result.data);
            }
        } catch (e) {
            console.log("error: ",e);
        }
    };
    requestData();
        const requestcmt = async (props) => {
            try{
                const rs = await showbyID(id);
                if (rs.status === 200) {
                setComment(rs.data);
                }
            }catch (e) {
            console.log("error: ",e);
        }
        };
    requestcmt();
    }, []);
    return(
        <div className="container" style={{'bgcolor':''}} >
            <div className="header" >
                <nav class="navbar navbar-default navbar-static-top" role="navigation" style={{'background-color':'greenyellow'}}>
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic"> Type
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                    <Dropdown.Item href="../showbyid/1">IT</Dropdown.Item>
                    <Dropdown.Item href="../showbyid/2">Learning</Dropdown.Item>
                    <Dropdown.Item href="../showbyid/3">Working</Dropdown.Item>
                    <Dropdown.Item href="../showbyid/4">Photography</Dropdown.Item>
                    <Dropdown.Item href="../showbyid/5">Free Lance</Dropdown.Item>
                    <Dropdown.Item href="../showbyid/6">Other</Dropdown.Item>
                    </Dropdown.Menu>
                    </Dropdown>
                    <Link class="navbar-brand" to={{pathname: "/"}} style={{width:'10px'}}><Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                        </Spinner>
                    </Link>
                    
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
                    <Card.Body  stle={{'background-color':'darkgray'}}>
                        <Card.Title>{row.title}</Card.Title>
                        <Card.Text>
                            {row.detail}
                            </Card.Text>
                    </Card.Body>
                    {comment.map((row) =>(<Card.Body>
                        <Card.Text>
                            <p>--- pushed by : {row.username} --- at: {row.time.split('.')[0]}</p>
                            <i>{row.detail}</i>
                        </Card.Text>
                    </Card.Body>))}
                    {islogin
                            ?<><Form.Label>Put Your Every You Think That It ...</Form.Label>
                                <Form.Control as='textarea' row='3' onChange = {onValueChange} name='comment'></Form.Control>
                                <Button variant="primary" id='push-comment' type="submit" onClick = {onSubmit}>PUSH
                                </Button></>
                            :enqueueSnackbar("Vui Long Dang Nhap Truoc!", { variant: "error" })}
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
export default Discusion;