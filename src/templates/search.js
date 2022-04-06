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
import { FiEdit } from "react-icons/fi";
import { getAPI } from "../service/api.js";
import { useHistory, useParams } from "react-router";
import { useSnackbar } from "notistack";
import {
    FaRegTrashAlt,
    FaCommentAlt,
    FaElementor,
    FaWaze,
    FaHouseDamage,
    FaUserSlash,
} from "react-icons/fa";
import Headers from './Headers';    
import Footer from './Footer'; 

const searchAPI = (value) => {
  return getAPI("/search/"+value);
};
const deletePostAPI = (id) => {
    return getAPI('/deletepost/'+id);
}
function Search(){
    let {value} = useParams();
    console.log("gt lay dc: "+value);
    let name = "";
    const [searchValue,setSearchValue] = useState({value:''});
    const [post,setPost] = useState({post_ID: ''})
    const history = useHistory();
    const {enqueueSnackbar} = useSnackbar();
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
        document.title = "Cao Bắc Hội - Tìm Kiếm"
    }, []);
    const _onDiscusion = (id) => {
        history.push('/');
        history.push('discusion/'+id);
    }
    const _onDelete = async (id) => {
        try{
            const rs = await deletePostAPI(id);
            if(rs.status === 200){
                enqueueSnackbar("Xoa Thanh Cong" ,{variant:'success'});
                history.push('/');
                window.location.reload(false);
                
            }
        }catch(e){
            console.log("error: ",e);
        }

    }
    const _onEdit = (id) => {
        history.push('/');
        history.push('edit/'+id);
    }
    const onValueChange = (event) =>{
        setSearchValue(prev =>({...prev, value:event.target.value}));
        console.log("your comment "+searchValue.value)
    }
    const _onSearch =(value) => {
        history.push('/');
        history.push('search/'+value);
        window.location.reload(false);
    }
    useEffect(() => {
        const requestData = async (props) => {

        try {
            const result = await searchAPI(value);
            if (result.status === 200) {
                setPostt(result.data);
            }
        } catch (e) {
            console.log("error: ",e);
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
                                            : <i style={{ 'color': 'green', 'font-weight': 'italic', 'font-size': '15px' }}>Người đăng : {row.username}-- Giá thuê: {row.cost}</i>
                                        }
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
export default Search;