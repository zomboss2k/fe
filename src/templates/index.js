import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Spinner, Button, FormControl, Dropdown, Form, Alert, Row, Col } from 'react-bootstrap';
import { getAPI } from '../service/api.js';
import { useHistory } from 'react-router';
import { useSnackbar } from 'notistack';
import { FaRegTrashAlt, FaCommentAlt, FaElementor, FaWaze, FaHouseDamage, FaUserSlash } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";


const getPostAPI = () => {
    return getAPI("/showpost");
};
const deletePostAPI = (id) => {
    return getAPI('/deletepost/' + id);
}
function Index() {
    let name = "";
    const [searchValue, setSearchValue] = useState({ value: '' ,username:''});
    const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();
    const token = localStorage.getItem("token");
    console.log("token fist:" + token);
    const [postt, setPostt] = useState([]);
    const [ismyaccount, setissmyaccount] = useState(false);
    let islogin = false;
    if (token != null) {
        islogin = true;
        console.log("token: " + token);
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
                console.log("error: ", e);
            }
        };
        requestData();
    }, []);
    const _onDiscusion = (id) => {
        history.push('discusion/' + id);
    }
    useEffect(() => {
        document.title = "Cao Bắc Hội"
    }, []);
    const _onDelete = async (id) => {
        try {
            const rs = await deletePostAPI(id);
            if (rs.status === 200) {
                enqueueSnackbar("Xoa Thanh Cong", { variant: 'success' });
                history.push('/');
                window.location.reload(false);

            }
        } catch (e) {
            console.log("error: ", e);
        }

    }
    const _onEdit = (id) => {
        history.push('edit/' + id);
    }
    return (

        <div className="MainDiv">
            <div class="main_slider" style={{ backgroundImage: "url(assets/images/slider_1.jpg)" }}>
                <div class="container fill_height">
                    <div class="row align-items-center fill_height">
                        <div class="col">
                            <div class="main_slider_content">
                                <h1>Phòng trọ Đà Nẵng</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="banner">
                <div class="container">
                    <div class="row">
                        <div class="col-md-4">
                            <div class="banner_item align-items-center" style={{ backgroundImage: "url(assets/images/banner_1.jpg)" }}>
                                <div class="banner_category">
                                    <a href="/showbyid/1">Phòng trọ</a>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="banner_item align-items-center" style={{ backgroundImage: "url(assets/images/banner_2.jpg)" }}>
                                <div class="banner_category">
                                    <a href="showbyid/4">Căn hộ</a>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="banner_item align-items-center" style={{ backgroundImage: "url(assets/images/banner_3.jpg)" }}>
                                <div class="banner_category">
                                    <a href="showbyid/3">Ở ghép</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="new_arrivals">
                <div class="container">
                    <div class="row">
                        <div class="col text-center">
                            <div class="section_title new_arrivals_title">
                                <h2>Bài đăng mới</h2>
                            </div>
                        </div>
                    </div>

                    <div className="content" style={{ 'padding': '10px 0px' }}>
                        {postt.map((row) => (
                            <Card>
                                <Card.Header>{row.type}
                                    {name == row.username
                                        ? <div className="onCRUD" style={{ float: 'right', 'margin-right': '100px' }}>
                                            <Button variant="warning" onClick={() => _onEdit(row.post_ID)} style={{ 'margin-right': '30px' }}><FiEdit /></Button>
                                            <Button variant="danger" onClick={() => _onDelete(row.post_ID)}><FaRegTrashAlt /></Button>
                                        </div>
                                        : ""
                                    }
                                </Card.Header>
                                <div className="row">
                                    <div style={{ 'padding-left': '20px' }} >
                                        <Button variant="link" id='cmt' onClick={() => _onDiscusion(row.post_ID)}>
                                            <img src="https://vnn-imgs-f.vgcloud.vn/2020/03/03/15/nha-tro.jpg" alt="dogs" class="img-thumbnail" style={{ 'width': '300px', 'padding': '0px 15px' }}></img>
                                        </Button>
                                    </div>
                                    <div className="col">

                                        <Card.Body>
                                            <Card.Title>{row.title}</Card.Title>
                                            {name === row.username
                                                ? <i style={{ 'color': 'green', 'font-weight': 'italic', 'font-size': '15px' }}>Giá thuê: {row.cost}</i>
                                                : <i style={{ 'color': 'green', 'font-weight': 'italic', 'font-size': '15px' }}>Người đăng : {row.username}</i>
                                            }
                                            <Card.Text>{row.detail}</Card.Text>
                                            {/*     <Button variant="link" id='cmt'onClick={() => _onDiscusion(row.post_ID)}><FaCommentAlt /> Discusion</Button> */}
                                        </Card.Body>

                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                    {/* <div class="row">
                        <div class="col">
                            <div class="product-grid" data-isotope='{ "itemSelector": ".product-item", "layoutMode": "fitRows" }'>
                                {postt.map((row) => (
                                    <div class="product-item ">
                                        <div className="product product_filter">
                                            <div class="product_image">
                                                <img src="assets/images/product_3.png" alt="" />
                                            </div>
                                            <div class="favorite"></div>
                                            <div class="product_info">
                                                <h6 class="product_name"><a href="#">{row.type}</a></h6>
                                                <div class="product_price">$120.00</div>
                                            </div>
                                        </div>
                                        <div class="red_button add_to_cart_button"><a href="#">add to cart</a></div>
                                    </div>
                                ))} 
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>


        </div>


        // <div className="container" style={{'margin-top':'150px'}} >
        //     <div className="content" style={{'padding':'10px 0px'}}>
        //         {postt.map((row) =>(

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
    );
}
export default Index;