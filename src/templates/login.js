import React, { useState,useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router';
import { Redirect,Link } from 'react-router-dom';
import "./login.css"


const submitloginAPI = (data) => {
    const url = "http://127.0.0.1:5000/api/login"
    return axios.post(url, data)
}
function Login() {
    const history = useHistory();
    const token = localStorage.getItem("token");
    console.log("token fist :" + token);
    const { enqueueSnackbar } = useSnackbar();
    const [info, setInfo] = useState({ username: '', password: '' })
    if (token != null) {
        history.push('index');
    }
    else {
        <Redirect to='login' />
    }
    
    const onValueChangeUsername = (event) => {
        setInfo(prev => ({ ...prev, username: event.target.value }));
    }
    const onValueChangePassword = (event) => {
        setInfo(prev => ({ ...prev, password: event.target.value }));
    }
    useEffect(() => {
        document.title = "Cao Bắc Hội - Đăng Nhập"
    }, []);
    const onSubmit = async () => {
        const data = new FormData();
        data.append("username", info.username);
        data.append("password", info.password);
        try {
            const rs = await submitloginAPI(data);
            console.log(JSON.stringify(rs))
            if (rs.status === 200) {
                localStorage.setItem("token", "EAAAAAEfhadfg=" + info.username);
                enqueueSnackbar("Dang Nhap Thanh Cong", { variant: 'success' });
                console.log("rs.xsrfCookieName: " + rs.xsrfCookieName);
                console.log("token: " + token);
                history.push('index');
                <Redirect to='login' />
            }
            else {
                enqueueSnackbar("Đăng nhập thất bại!", { variant: "error" });
            }
        } catch (e) {
            console.log("error: " + e);
            enqueueSnackbar("Dang Nhap That Bai", { variant: 'error' });
        }
    }
    return (
            <section class="ftco-section">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-md-12 col-lg-10">
                            <div class="wrap d-md-flex">
                                <div class="img" style={{'background-image': 'url(https://d9i9nmwzijaw9.cloudfront.net/423/45455/dc8a/4604/9c35/b2f573ba7781/original/436115.jpg)'}}>
                                </div>
                                <div class="login-wrap p-4 p-md-5">
                                    <div class="d-flex">
                                        <div class="w-100">
                                            <h3 class="mb-4">Đăng Nhập</h3>
                                        </div>
                                        <div class="w-100">
                                            <p class="social-media d-flex justify-content-end">
                                                <a href="#"
                                                    class="social-icon d-flex align-items-center justify-content-center"><span
                                                        class="fa fa-facebook"></span></a>
                                                <a href="#"
                                                    class="social-icon d-flex align-items-center justify-content-center"><span
                                                        class="fa fa-twitter"></span></a>
                                            </p>
                                        </div>
                                    </div>
                                    <form action="#" class="signin-form">
                                        <div class="form-group mb-3">
                                            <label class="label" for="name">Username</label>
                                            <input type="text" name="username" class="form-control" id="inputUsername" 
                                            onChange={onValueChangeUsername}
                                            required="required" placeholder="Username" />
                                        </div>
                                        <div class="form-group mb-3">
                                            <label class="label" for="password">Password</label>
                                            <input type="password" class="form-control" name="password" id="inputPassword"
                                            onChange={onValueChangePassword} placeholder="Password" required />
                                        </div>
                                        <div class="form-group">
                                            <button type="submit" class="form-control btn btn-primary rounded submit px-3"
                                            id='btn-login' onClick= {onSubmit}>Sign In</button>
                                        </div>
                                        <div class="form-group d-md-flex">
                                            <div class="w-50 text-left">
                                                <label class="checkbox-wrap checkbox-primary mb-0">Remember Me
                                                    <input type="checkbox" checked />
                                                    <span class="checkmark"></span>
                                                </label>
                                            </div>
                                            <div class="w-50 text-md-right">
                                                <a href="#">Forgot Password</a>
                                            </div>
                                        </div>
                                    </form>
                                    <p class="text-center">Bạn chưa có tài khoản? <a data-toggle="tab"><Link to={{pathname: "/resigter"}}>Đăng kí</Link></a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        
    );
}
export default Login;