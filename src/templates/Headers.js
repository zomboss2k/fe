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
const searchValue = (value) => {
    return getAPI('/search/' + value);
}
function Headers() {
    let name = "";
    const [searchValue, setSearchValue] = useState({ value: '' });
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
        document.title = "Abc Forum"
    }, []);
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
    const onValueChange = (event) => {
        setSearchValue(prev => ({ ...prev, value: event.target.value }));
        console.log("your comment " + searchValue.value)
    }
    const _onSearch = (value) => {
        console.log(value);
        history.push('/search/' + value)
    }

    return (
        <div className="MainDiv">
            <header className="header trans_300">
            {/* Top Navigation */}
            <div className="top_nav">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="top_nav_left">Hello welcome</div>
                        </div>
                        <div className="col-md-6 text-right">
                            <div className="top_nav_right">
                                <ul className="top_nav_menu">
                                    {/* Currency / Language / My Account */}
                                    <li className="currency">
                                        <a href="#">
                                            usd
                                            <i className="fa fa-angle-down" />
                                        </a>
                                        <ul className="currency_selection">
                                            <li><a href="#">cad</a></li>
                                            <li><a href="#">aud</a></li>
                                            <li><a href="#">eur</a></li>
                                            <li><a href="#">gbp</a></li>
                                        </ul>
                                    </li>
                                    <li className="language">
                                        <a href="#">
                                            English
                                            <i className="fa fa-angle-down" />
                                        </a>
                                        <ul className="language_selection">
                                            <li><a href="#">French</a></li>
                                            <li><a href="#">Italian</a></li>
                                            <li><a href="#">German</a></li>
                                            <li><a href="#">Spanish</a></li>
                                        </ul>
                                    </li>
                                    <li className="account">
                                        {name
                                            ? <>
                                                <a href="#">
                                                    {name}
                                                    <i className="fa fa-angle-down" />
                                                </a>
                                            </>
                                            : <>
                                                <a href="#">
                                                    My Account
                                                    <i className="fa fa-angle-down" />
                                                </a></>}

                                        <ul className="account_selection">
                                            <li>
                                                {islogin
                                                    ? <Link to={{ pathname: "/addpost" }}>Add Post</Link>
                                                    : <Link to={{ pathname: "/login" }}><i className="fa fa-sign-in" aria-hidden="true" />Sign In</Link>}
                                            </li>
                                            <li >
                                                {islogin
                                                    ? <Link to={{ pathname: "/sigout" }}><FaUserSlash /> Log Out</Link>
                                                    : <Link to={{ pathname: "/resigter" }}><i className="fa fa-user-plus" aria-hidden="true" />Register</Link>}
                                            </li>
                                        </ul>

                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Main Navigation */}
            <div className="main_nav_container">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-right">
                            <div className="logo_container">
                                <a href="/">colo<span>shop</span></a>
                            </div>
                            <nav className="navbar">
                                <ul className="navbar_menu">
                                    <li><a href="showbyid/1">Cho Thuê</a></li>
                                    <li><a href="showbyid/2">Tìm Phòng</a></li>
                                    <li><a href="showbyid/3">Ở Ghép</a></li>
                                    <li><a href="showbyid/4">Căn Hộ</a></li>
                                    <li><a href="showbyid/5">Other</a></li>
                                </ul>
                                <ul className="navbar_user">

                                    <Form inline>
                                        <FormControl type="text" placeholder="enter your key..." className="mr-sm-2" name='searchValue' onChange={onValueChange} />
                                        <Button className="fa fa-search" variant="outline-success" id='search' onClick={() => _onSearch(searchValue.value)}></Button>
                                    </Form>

                                </ul>
                                <div className="hamburger_container">
                                    <i className="fa fa-bars" aria-hidden="true" />
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        </div>
        
    );


}
export default Headers;