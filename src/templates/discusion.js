import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, FormControl, Dropdown, Form, Alert, Row, Col,ListGroup,ListGroupItem,Container } from 'react-bootstrap';
import { useSnackbar } from 'notistack';
import { getAPI } from '../service/api.js';
import { useParams, useHistory } from 'react-router';
import axios from 'axios';

import Images from './images'
import InputGroup from 'react-bootstrap/InputGroup'
import { FaTrash, FaElementor, FaWaze, FaHouseDamage, FaUserSlash, FaRegHandPointRight, FaThumbsUp,FaTrashAlt,FaHeart } from "react-icons/fa";
// import "./main_styles.css"

const discusionAPI = (id) => {
    return getAPI("/selectpost/" + id);
}
const submitcmt = (data) => {
    const url = "http://127.0.0.1:5000/api/addcmt"
    return axios.post(url, data)
}
const showbyID = (id) => {
    return getAPI('/showcmtbyID/' + id)
}
const deleteComment = (id) => {
    return getAPI('/deletecomment/' + id)
}
const reportComment = (id) => {
    return getAPI('/report/' + id)
}
const like = (id) => {
    return getAPI('/like/' + id)
}
const getidimage=(id)=>{
    return getAPI('/getidimage/'+id)
}
const getimage = (id) => {
    return getAPI('/getimage/'+id)
}
const getname = (usr)=>{
    return getAPI('/getname/'+usr)
}
function Discusion() {
    let { id } = useParams();
    const history = useHistory();
    const [postt, setPostt] = useState([]);
    const { enqueueSnackbar } = useSnackbar();
    const [searchValue, setSearchValue] = useState({ value: '' });
    let name = "";
    const token = localStorage.getItem("token");
    console.log("token fist:" + token);
    const [fname,setFname] = useState("");
    let islogin = false;
    if (token != null) {
        islogin = true;
        console.log("token: " + token);
        name = token.split('=')[1];
    }
    const[ids,setids] = useState([]);
    const[files,setfiles] = useState([]);
    const [info,setInfo] = useState([]);
    const onValueSChange = (event) =>{
        setSearchValue(prev =>({...prev, value:event.target.value}));
        console.log("your comment "+searchValue.value)
    }
    const _onSearch = (value) => {
        console.log(value);
        history.push('/search/' + value)
    }
    const _onviewuser =(usr)=>{
        history.push('/infouser/'+usr);
    }
    const [comment, setComment] = useState([]);
    const [cmt, setCmt] = useState({ comment: '', username: name, post_ID: id });
    const onValueChange = (event) => {
        setCmt(prev => ({ ...prev, comment: event.target.value }));
        console.log("your comment " + cmt.comment)
    }
    const [uname,setUname]= useState("");
    useEffect(() => {
        document.title = "Cao Bắc Hội - Thảo Luận"
    }, []);
    const _onDeleteCmt = async (id) => {
        try {
            const rs = await deleteComment(id);
            if (rs.status == 200) {
                enqueueSnackbar("Xoa Thanh Cong", { variant: 'success' });
                window.location.reload(false);
            }
        } catch (e) {
            console.log("error: ", e);
        }
    }
    
    const _onReport = async (id) => {
        try {
            const rs = await reportComment(id);
            if (rs.status == 200) {
                enqueueSnackbar("Report Thanh Cong", { variant: 'success' });
                window.location.reload(false);
            }
        } catch (e) {
            console.log("error: ", e);
        }
    }
    const _onLike = (id) => {
        like(id);
        console.log(id)
        window.location.reload(false);
    }
    const _getimage = (id)=>{
        return ("http://localhost:5000/api/getimage/"+id)
    }
    
    const onSubmit = async () => {
        const data = new FormData();
        data.append("comment", cmt.comment);
        data.append("username", cmt.username);
        data.append("post_ID", cmt.post_ID);
        try {
            const rs = await submitcmt(data);
            console.log(JSON.stringify(rs))
            if (rs.status === 200) {
                enqueueSnackbar("Successfully !!", { variant: 'success' });
                window.location.reload(false);
            }
            else {
                console.log(rs.data)
                enqueueSnackbar("Please Try Again !", { variant: "error" });
            }
        } catch (e) {
            console.log("error: " + e);
            enqueueSnackbar("Please Try Again", { variant: 'error' });
        }
    }
    useEffect(() => {
        const requestData = async (props) => {
            try {
                const result = await discusionAPI(id);
                if (result.status === 200) {
                    setPostt(result.data);
                    //setUname(result.data[0]['username']);
                    const rs= await getname(result.data[0]['username']);
                        if(rs.status === 200){
                            setInfo(rs.data);
                        }
                    
                }
            } catch (e) {
                console.log("error: ", e);
            }
    
    };
    requestData();
        
        const requestid = async (props) => {
            try{
                const rs = await getidimage(id);
                if (rs.status === 200) {
                    setids(rs.data['id_image']);
                    console.log('ids: ', rs.data['id_image']);
                }
            }catch (e) {
                console.log("error: ",e);
            }
        };
        requestid();
        
        const requestcmt = async (props) => {
            try {
                const rs = await showbyID(id);
                if (rs.status === 200) {
                    setComment(rs.data);
                }
            } catch (e) {
                console.log("error: ", e);
            }
        };
        requestcmt();
    }, []);
    const setImage=(id)=>{
        setSelectedImg(("http://localhost:5000/api/getimage/"+id))
    }
    const [selectedImg, setSelectedImg] = useState([]);

    return (
        // <div className="container" style={{'bgcolor':''}} >
        //     <div className="header" >
        //         <nav class="navbar navbar-default navbar-static-top" role="navigation" style={{'background-color':'greenyellow'}}>
        //         <Dropdown>
        //             <Dropdown.Toggle variant="success" id="dropdown-basic"> <FaElementor />
        //             </Dropdown.Toggle>
        //             <Dropdown.Menu>
        //            <Dropdown.Item href="showbyid/1">Cho Thuê</Dropdown.Item>
        //             <Dropdown.Item href="showbyid/2">Cần Thuê</Dropdown.Item>
        //             <Dropdown.Item href="showbyid/3">Ở Ghép</Dropdown.Item>
        //             <Dropdown.Item href="showbyid/4">Mua Bán, Trao đổi</Dropdown.Item>
        //             <Dropdown.Item href="showbyid/5">Căn Hộ</Dropdown.Item>
        //             <Dropdown.Item href="showbyid/6">Other</Dropdown.Item>
        //             </Dropdown.Menu>
        //             </Dropdown>
        //             <Link class="navbar-brand" to={{pathname: "/"}} style={{width:'10px'}}>
        //                 <FaHouseDamage />
        //             </Link>
        //         <Form inline>
        //             <FormControl type="text" placeholder="enter your key..." className="mr-sm-2" name='searchValue'onChange = {onValueSChange}/>
        //             <Button variant="outline-success" id='search'onClick={() => _onSearch(searchValue.value)}>Search</Button>
        //         </Form>
        //         {name 
        //         ?<Alert class="" style={{color:'chocolate'}}><FaWaze/> {name}</Alert>  
        //         :console.log("name: "+name) }
        //         <ul class="nav navbar-nav" style={{float:'right','flex-direction':'unset'}}>
        //             <li style={{width:'80px','margin-right':'10px'}}>
        //                 {islogin
        //                 ?<Link to={{pathname: "/addpost"}}>Add Post</Link>
        //                 :<Link to={{pathname: "/login"}}>Sign in</Link>}
        //             </li>
        //             <li className="active">
        //                 {islogin 
        //                 ?<Link to={{pathname: "/sigout"}}><FaUserSlash /></Link>   
        //                 :<Link to={{pathname: "/resigter"}}>Sign Up</Link>}
        //             </li>
        //         </ul>
        //     </nav>
        //     </div>
        //     <div className="content">
        //         {postt.map((row) =>(
        //             <Card>
        //                 <Card.Header>{row.type}</Card.Header>
        //                 <div className="row">
        //                     <div className="col">
        //                         <div className="container">
        //                             <img src={selectedImg} alt="Selected" class="selected img-thumbnail"></img>
        //                         </div>
        //                         <div className = "imgContainer">
        //                             {Images.map((img, index) => (
        //                                 <img 
        //                                     style={{ border: selectedImg === img ? "4px solid #ccc" : ""}}
        //                                     key = {index} 
        //                                     src={img} 
        //                                     alt="dog"
        //                                     onClick = {()=> setSelectedImg(img)}
        //                                 />
        //                             ))}
        //                         </div>
        //                     </div>
        //                     <div className="col">
        //                         <Card.Body  stle={{'background-color':'darkgray'}}>
        //                             <Card.Title>{row.title}</Card.Title>
        //                             <Card.Text>
        //                                 {row.detail}
        //                                 </Card.Text>
        //                         </Card.Body>
        //                         {comment.map((row) =>(<Card.Body>
        //                             <Card.Text>
        //                                 <p>--- pushed by : {row.username} --- at: {row.time.split('.')[0]} <Button variant="link" id='like'onClick={() => _onLike(row.comment_ID)}><FaThumbsUp /></Button>
        //                                 {name == row.username 
        //                                 ?<Button variant="link" id='delcmt'onClick={() => _onDeleteCmt(row.comment_ID)}><FaTrash /></Button>
        //                                 :<Button variant="link" id='report'onClick={() => _onReport(row.comment_ID)}>Report</Button>}</p> 
        //                                 <FaRegHandPointRight /><b>{row.point} | </b><i>{row.detail}</i>
        //                             </Card.Text>
        //                         </Card.Body>))}
        //                     </div>
        //                 </div>
        //                 {islogin
        //                         ?<><Form.Label style={{'font-weight':'bold','margin-left':'10px','font-size':'30px'}}>Put Your Every You Think That It ...</Form.Label>
        //                             <Form.Control as='textarea' row='3' onChange = {onValueChange} name='comment'></Form.Control>
        //                             <Button variant="primary" id='push-comment' type="submit" onClick = {onSubmit}>PUSH
        //                             </Button></>
        //                         :enqueueSnackbar("Vui Long Dang Nhap Truoc!", { variant: "error" })}
        //             </Card>
        //         ))}

        //     </div>
        //     <div className="footer" style={{'background-color':'gray','color':'white'}}>
        //             <Row style={{padding:'10px'}}>
        //                 <Col xs={{ order: 'first' }}>ABC Developers was founded by developers, for developers. It is now a valuable resource for people who want to make the most of their mobile devices, from customizing the look and feel to adding new functionality</Col>
        //                 <Col xs>Contact us with:
        //                 <br/>Email: dotuanthinh37.work@gmail.com<br/>Phone Number: +84335833737<br/>Address: 566 Nui Thanh, Hai Chau, TP Da Nang
        //                 </Col>
        //                 <Col xs={{ order: 'last' }}>
        //                     <div class="block">
        //                         <h3 class="block-minorHeader">Subscribe to our newsletter</h3>
        //                         Receive the freshest Android; development news right in your inbox!
        //                         <form class="xda_subscribeForm" action="" method="post" id="newsletters-2-form"/>
        //                         <input id="wpml-2email" type="text" name="email" class="input" placeholder="your@email"/>
        //                         <button type="submit" name="subscribe"><i class="mdi mdi-arrow-right"></i></button>
        //                         <input type="hidden" id="2list-list-select" name="list_id[]" value="3"/>
        //                     </div>
        //                 </Col>
        //             </Row>                             
        //     </div>                   
        // </div>
        <div class="super_container">
            <div className="container single_product_container">
                <div className="row">
                    <div className="col">
                        {/* Breadcrumbs */}
                        <div className="breadcrumbs d-flex flex-row align-items-center">
                            <ul>
                                <li><a href="/">Home</a></li>
                                <li><a href='#'><i className="fa fa-angle-right" aria-hidden="true" />
                                    {
                                        postt.map((row) =>(
                                            row.type
                                        ))
                                    }
                                </a></li>
                                <li className="active"><a href="#"><i className="fa fa-angle-right" aria-hidden="true" />
                                {
                                        postt.map((row) =>(
                                            row.title
                                        ))
                                    }
                                </a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-7">
                        <div className="single_product_pics">
                            <div className="row">
                                <div className="col-lg-12 thumbnails_col order-lg-1 order-2">
                                    <div className="single_product_thumbnails">
                                        {/* <div className="row">
                                            
                                        <div className="col-lg-6">

                                        <ul>
                                            
                                        </ul>
</div>
                                        </div> */}
                                        <Container>
                                            <Row>
                                            {ids.map((index) => (
                                                <Col xs><img key={index}
                                                    src={_getimage(index)}
                                                    alt="dog"
                                                    onClick=""
                                                    width="250" height="200"
                                                    />
                                                    </Col>
                                            ))}
                                                
                                            </Row>
                                            </Container>
                                    </div>
                                </div>
                                
                                <div className='col'>
                                    
                                
                                </div>
                                {/* <div className="col-lg-9 image_col order-lg-2 order-1">
                                    <div className="single_product_image">
                                        <div className="single_product_image_background" src={selectedImg} alt="Selected" />
                                    </div>
                                </div> */}
                            </div>
                            <div className='info' style={{'margin-top':'100px'}}>
                                {info.map((row)=>(
                                     <Card style={{ width: '18rem' }}>
                                     <Card.Img variant="top" />
                                     <Card.Body>
                                         <Card.Title><h3>{row.name}</h3></Card.Title>
                                         <Card.Text>
                                         Một người dùng sử dụng website thường xuyên và trao đổi thân thiện. Tỉ lệ phản hồi 99% dưới 5 phút.
                                         </Card.Text>
                                     </Card.Body>
                                     <ListGroup className="list-group-flush">
                                         <ListGroupItem>{row.email}</ListGroupItem>
                                         <ListGroupItem>{row.phone}</ListGroupItem>
                                         
                                     </ListGroup>
                                     <Card.Body>
                                         <Card.Link href="#">Gọi</Card.Link>
                                         <Card.Link href="#">Gửi Email</Card.Link>
                                     </Card.Body>
                                     </Card>
                                ))}
                               
                            </div>
                        </div>
                        
                    </div>
                    
                    <div className="col-lg-5">
                        <div className="product_details">
                            <div className="product_details_title">
                                <h2>
                                {
                                        postt.map((row) =>(
                                            row.title
                                        ))
                                    }
                                </h2>
                                <i style={{'color':'green'}}>
                                {
                                        postt.map((row) =>(
                                            row.detail
                                        ))
                                    }
                                </i>
                            </div>
                            
                            <div className="free_delivery d-flex flex-row align-items-center justify-content-center">
                                <span className="ti-truck" /><span>
                                {
                                        postt.map((row) =>(
                                            row.address
                                        ))
                                    }
                                </span>
                            </div>
                            <b>Giá cho thuê:</b>
                            <div className="original_price">
                            
                            {
                                        postt.map((row) =>(
                                            row.cost *1.5
                                        ))
                                    } vnd
                            </div>
                            
                            <div className="product_price">
                            
                            {
                                        postt.map((row) =>(
                                            row.cost
                                        ))
                                    } vnd
                            </div>
                            <ul className="star_rating">
                                <li><i className="fa fa-star" aria-hidden="true" /></li>
                                <li><i className="fa fa-star" aria-hidden="true" /></li>
                                <li><i className="fa fa-star" aria-hidden="true" /></li>
                                <li><i className="fa fa-star" aria-hidden="true" /></li>
                                <li><i className="fa fa-star-o" aria-hidden="true" /></li>
                            </ul>
                            
                            <div className="quantity d-flex flex-column flex-sm-row align-items-sm-center">
                                <span>Diện Tích:</span>
                                <div className="quantity_selector">
                                {
                                        postt.map((row) =>(
                                            row.dientich
                                        ))
                                    }
                                </div>
                                
                                
                            </div>
                            
                            <hr></hr>
                            
                            {comment.map((row) =>(<Card.Body>
                                <Card.Text>
                                    <h3 style={{'font-size':'30px','color':'green','font-weight':'bold'}}>{row.username}</h3>
                                    <i style={{'font-size':'12px','color':'chocolate'}}>
                                        {row.time.split('.')[0]}
                                        <div style={{'float':'right','width':'10px','height':'10px'}}>
                                        {row.username == name
                                            ?<div>
                                                <a href=''><FaTrashAlt fixedWidth /></a>
                                                <a href=''><FaHeart fixedWidth/></a>{row.point}
                                            </div>     
                                            :<a href=''><FaHeart fixedWidth/> {row.point}</a>
                                            }
                                        </div>
                                    </i>
                                    
                                    <p style={{'font-size':'20px','color':'blue'}}>{row.detail}</p>
                                </Card.Text>
                            </Card.Body>))}
                            <Form>
                            {
                                islogin
                                    ?   

                                        <InputGroup className="mb-3">
                                        <Form.Control
                                        placeholder="Bình luận của bạn luôn công khai"
                                        aria-label="Recipient's username"
                                        aria-describedby="basic-addon2"
                                        onChange={onValueChange}
                                        />
                                        <Button variant="outline-secondary" id="button-addon2" onClick={onSubmit}>
                                        Đăng
                                        </Button>
                                        </InputGroup>
                                    :<Form.Label htmlFor="disabledTextInput">Bạn phải đăng nhập trước</Form.Label>
                                
                            }
                            
                            </Form>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>

    );
}
export default Discusion;