import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, FormControl, Dropdown, Form, Alert, Row, Col } from 'react-bootstrap';
import { useSnackbar } from 'notistack';
import { getAPI } from '../service/api.js';
import { useParams, useHistory } from 'react-router';
import axios from 'axios';
import Images from './images'
import { FaTrash, FaElementor, FaWaze, FaHouseDamage, FaUserSlash, FaRegHandPointRight, FaThumbsUp } from "react-icons/fa";
import "./main_styles.css"
import "./style.css";

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
function Discusion() {
    let { id } = useParams();
    const history = useHistory();
    const [postt, setPostt] = useState([]);
    const { enqueueSnackbar } = useSnackbar();
    const [searchValue, setSearchValue] = useState({ value: '' });
    let name = "";
    const token = localStorage.getItem("token");
    console.log("token fist:" + token);

    let islogin = false;
    if (token != null) {
        islogin = true;
        console.log("token: " + token);
        name = token.split('=')[1];
    }
    const[ids,setids] = useState([]);
    const[files,setfiles] = useState([]);
    
    const onValueSChange = (event) =>{
        setSearchValue(prev =>({...prev, value:event.target.value}));
        console.log("your comment "+searchValue.value)
    }
    const _onSearch = (value) => {
        console.log(value);
        history.push('/search/' + value)
    }
    const [comment, setComment] = useState([]);
    const [cmt, setCmt] = useState({ comment: '', username: name, post_ID: id });
    const onValueChange = (event) => {
        setCmt(prev => ({ ...prev, comment: event.target.value }));
        console.log("your comment " + cmt.comment)
    }
    useEffect(() => {
        document.title = "Discusion-Abc Forum"
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
                    setids(rs.data);
                    console.log('ids: ', rs.data);
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

    const [selectedImg, setSelectedImg] = useState(Images[0]);

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
                                <li><a href="categories.html"><i className="fa fa-angle-right" aria-hidden="true" />Men's</a></li>
                                <li className="active"><a href="#"><i className="fa fa-angle-right" aria-hidden="true" />Single Product</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-7">
                        <div className="single_product_pics">
                            <div className="row">
                                <div className="col-lg-3 thumbnails_col order-lg-1 order-2">
                                    <div className="single_product_thumbnails">
                                        <ul>
                                            {Images.map((img, index) => (
                                                <li><img key={index}
                                                    src={img}
                                                    alt="dog"
                                                    onClick={() => setSelectedImg(img)}
                                                    data-image={img} /></li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-lg-9 image_col order-lg-2 order-1">
                                    <div className="single_product_image">
                                        <div className="single_product_image_background" src={selectedImg} alt="Selected" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-5">
                        <div className="product_details">
                            <div className="product_details_title">
                                <h2>Pocket cotton sweatshirt</h2>
                                <p>Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis. Pellentesque diam dolor, elementum etos lobortis des mollis ut...</p>
                            </div>
                            <div className="free_delivery d-flex flex-row align-items-center justify-content-center">
                                <span className="ti-truck" /><span>free delivery</span>
                            </div>
                            <div className="original_price">$629.99</div>
                            <div className="product_price">$495.00</div>
                            <ul className="star_rating">
                                <li><i className="fa fa-star" aria-hidden="true" /></li>
                                <li><i className="fa fa-star" aria-hidden="true" /></li>
                                <li><i className="fa fa-star" aria-hidden="true" /></li>
                                <li><i className="fa fa-star" aria-hidden="true" /></li>
                                <li><i className="fa fa-star-o" aria-hidden="true" /></li>
                            </ul>
                            <div className="product_color">
                                <span>Select Color:</span>
                                <ul>
                                    <li style={{ background: '#e54e5d' }} />
                                    <li style={{ background: '#252525' }} />
                                    <li style={{ background: '#60b3f3' }} />
                                </ul>
                            </div>
                            <div className="quantity d-flex flex-column flex-sm-row align-items-sm-center">
                                <span>Quantity:</span>
                                <div className="quantity_selector">
                                    <span className="minus"><i className="fa fa-minus" aria-hidden="true" /></span>
                                    <span id="quantity_value">1</span>
                                    <span className="plus"><i className="fa fa-plus" aria-hidden="true" /></span>
                                </div>
                                <div className="red_button add_to_cart_button"><a href="#">add to cart</a></div>
                                <div className="product_favorite d-flex flex-column align-items-center justify-content-center" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}
export default Discusion;