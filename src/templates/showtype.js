import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    Card,
    Spinner,
    Button,
    FormControl,
    Dropdown,
    Form,
    Alert,
    Row,
    Col,
} from "react-bootstrap";
import {FaRegTrashAlt} from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { getAPI } from "../service/api.js";
import { useHistory, useParams } from "react-router";
import { useSnackbar } from "notistack";
import {
    FaCommentAlt,
    FaElementor,
    FaWaze,
    FaHouseDamage,
    FaUserSlash,
} from "react-icons/fa";
import Headers from './Headers';
import Footer from './Footer';


const getPostAPI = (id) => {
    return getAPI("/showbytype/" + id);
};
const deletePostAPI = (id) => {
    return getAPI("/deletepost/" + id);
};
function ShowType() {
    let { id } = useParams();
    let name = "";
    const [searchValue, setSearchValue] = useState({ value: "" });
    const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();
    const token = localStorage.getItem("token");
    console.log("token fist:" + token);
    const [postt, setPostt] = useState([]);
    let islogin = false;
    if (token != null) {
        islogin = true;
        console.log("token: " + token);
        name = token.split("=")[1];
    }
    useEffect(() => {
        document.title = "Abc Forum";
    }, []);
    const _onDiscusion = (id) => {
        history.push("/");
        history.push("discusion/" + id);
    };
    const onValueChange = (event) => {
        setSearchValue((prev) => ({ ...prev, value: event.target.value }));
        console.log("your comment " + searchValue.value);
    };
    const _onSearch = (value) => {
        console.log(value);
        history.push("/search/" + value);
    };
    const _onDelete = async (id) => {
        try {
            const rs = await deletePostAPI(id);
            if (rs.status === 200) {
                enqueueSnackbar("Xoa Thanh Cong", { variant: "success" });
                history.push("/");
                window.location.reload(false);
            }
        } catch (e) {
            console.log("error: ", e);
        }
    };
    const _onEdit = (id) => {
        history.push("/");
        history.push("edit/" + id);
    };

    useEffect(() => {
        console.log("id truoc:" + id);
        const requestData = async (props) => {
            console.log("id sau:" + id);
            try {
                const result = await getPostAPI(id);
                console.log("id sau 2:" + id);
                if (result.status === 200) {
                    setPostt(result.data);
                }
            } catch (e) {
                console.log("error: ", e);
            }
        };
        requestData();
    }, []);
    return (
        <>
            <Headers />
            <div className="container" style={{ "margin-top": "200px" }}>
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
                                                : <i style={{ 'color': 'green', 'font-weight': 'italic', 'font-size': '15px' }}>Người đăng : {row.username} -- Giá thuê: {row.cost}</i>
                                                
                                            }
                                            <br/>
                                            <b style={{ 'color': 'brown'}}>Địa Chỉ: {row.address}</b>
                                            <Card.Text>{row.detail}</Card.Text>
                                            {/*     <Button variant="link" id='cmt'onClick={() => _onDiscusion(row.post_ID)}><FaCommentAlt /> Discusion</Button> */}
                                        </Card.Body>

                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                
            </div>
            <Footer />
        </>
    );
}
export default ShowType;
