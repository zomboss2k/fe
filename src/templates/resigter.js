import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router';
import './register.css'

const submitloginAPI = (data) => {
    const url = "http://127.0.0.1:5000/api/resigter"
    return axios.post(url, data)
}

function Resigter() {

    const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();
    const [info, setInfo] = useState({ name:'',username: '', password: '', repassword: '', email: '', phone: '' })
    //title
    useEffect(() => {
        document.title = "Cao Bắc Hội - Đăng Ký"
    }, []);
    // -----------------------value change----------------------
    const onValueChangeName = (event) => {
        setInfo(prev => ({ ...prev, name: event.target.value }));
    }
    const onValueChangeUsername = (event) => {
        setInfo(prev => ({ ...prev, username: event.target.value }));
    }
    const onValueChangePassword = (event) => {
        setInfo(prev => ({ ...prev, password: event.target.value }));
    }
    const onValueChangeRePassword = (event) => {
        setInfo(prev => ({ ...prev, repassword: event.target.value }));
    }
    const onValueChangeEmail = (event) => {
        setInfo(prev => ({ ...prev, email: event.target.value }));
    }
    const onValueChangePhone = (event) => {
        setInfo(prev => ({ ...prev, phone: event.target.value }));
    }
    const onCreate = async () => {
        const data = new FormData();
        data.append("name",info.name);
        data.append("username", info.username);
        data.append("password", info.password);
        data.append("repassword", info.repassword);
        data.append("email", info.email);
        data.append("phone", info.phone);
        try {
            const rs = await submitloginAPI(data);
            console.log(JSON.stringify(rs))
            if (rs.status === 200) {
                enqueueSnackbar("Tạo Tài Khoản Thành Công", { variant: 'success' });
                history.push('login');
            }
            else {
                console.log(rs.data)
                enqueueSnackbar("Vui Lòng Thử Lại !", { variant: "error" });
            }
        } catch (e) {
            console.log("error: " + e);
            enqueueSnackbar("Vui Lòng Thử Lại ", { variant: 'error' });
        }
    }
    return (
        <section style={{ "margin-top": "5rem" }} class="h-100 bg-dark">
            <div class="container py-5 h-100">
                <div class="row d-flex justify-content-center align-items-center h-100">
                    <div class="col">
                        <div class="card card-registration my-4">
                            <div class="row g-0">
                                <div class="col-xl-6 d-none d-xl-block">
                                    <img
                                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img4.webp"
                                        alt="Sample photo"
                                        class="img-fluid"
                                        style={{ "border-top-left-radius": ".25rem", "border-bottom-left-radius": ".25rem" }}
                                    />
                                </div>
                                <div class="col-xl-6">
                                    <div class="card-body p-md-4 text-black">
                                        <h3 class="mb-3 text-uppercase" style={{ 'text-align': 'center' }}>Đăng Kí Thành Viên</h3>

                                        <div class="row">
                                            <div class="col">
                                                <div class="form-outline">
                                                    <label class="form-label" for="form3Example1m">Họ và tên</label>
                                                    <input type="text" id="firstName" class="form-control form-control-lg"
                                                        onChange={onValueChangeName} required="required" />
                                                </div>
                                            </div>
                                        </div>

                                        <div class="form-outline mb-2">
                                            <label class="form-label" for="inputUsername">Tên đăng nhập</label>
                                            <input type="email" class="form-control form-control-lg" name="username"
                                                id="inputUsername" onChange={onValueChangeUsername} required="required" />
                                        </div>

                                        <div class="form-outline mb-2">
                                            <label class="form-label" for="inputemail">Email</label>
                                            <input type="email" class="form-control form-control-lg" name="email"
                                                id="inputemail" onChange={onValueChangeEmail} required="required" />
                                        </div>

                                            <label class="form-label" for="form3Example8">Số điện thoại</label>
                                        <div class="form-outline mb-2">
                                            <input type="text" onChange={onValueChangePhone} id="form3Example8" class="form-control form-control-lg" />
                                        </div>

                                        <div class="form-outline mb-2">
                                            <label class="form-label" for="inputpassword">Mật khẩu</label>
                                            <input type="password" name="password" id="inputPassword" class="form-control form-control-lg"
                                                onChange={onValueChangePassword} required="required" />
                                        </div>

                                        <div class="form-outline mb-2">
                                            <label class="form-label" for="inputrepassword">Nhập lại mật khẩu</label>
                                            <input type="password" name="repassword" id="inputrepassword" class="form-control form-control-lg"
                                                onChange={onValueChangeRePassword} required="required" />
                                        </div>

                                        <div class="d-flex justify-content-end pt-3">
                                            <button type="button" id='btn-create' class="btn btn-warning btn-lg ms-2" onClick={onCreate}>Resigter</button>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default Resigter;