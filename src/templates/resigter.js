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
    const [info, setInfo] = useState({ username: '', password: '', repassword: '', email: '', facebook: '' })
    const onValueChangeUsername = (event) => {
        setInfo(prev => ({ ...prev, username: event.target.value }));
    }
    useEffect(() => {
        document.title = "Resigter-Abc Forum"
    }, []);
    const onValueChangePassword = (event) => {
        setInfo(prev => ({ ...prev, password: event.target.value }));
    }
    const onValueChangeRePassword = (event) => {
        setInfo(prev => ({ ...prev, repassword: event.target.value }));
    }
    const onValueChangeEmail = (event) => {
        setInfo(prev => ({ ...prev, email: event.target.value }));
    }
    const onCreate = async () => {
        const data = new FormData();
        data.append("username", info.username);
        data.append("password", info.password);
        data.append("repassword", info.repassword);
        data.append("email", info.email);
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
        <section class="h-100 bg-dark">
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
                                        style={{ "border-top-left-radius": ".25rem", "border-bottom-left-radius": ".25rem;" }}
                                    />
                                </div>
                                <div class="col-xl-6">
                                    <div class="card-body p-md-4 text-black">
                                        <h3 class="mb-3 text-uppercase" style={{ 'text-align': 'center' }}>Đăng Kí Thành Viên</h3>

                                        <div class="row">
                                            <div class="col-md-6 ">
                                                <div class="form-outline">
                                                    <input type="text" id="firstName" class="form-control form-control-lg"
                                                        onChange="" required="required" />
                                                    <label class="form-label" for="form3Example1m">Họ</label>
                                                </div>
                                            </div>
                                            <div class="col-md-6 mb-2">
                                                <div class="form-outline">
                                                    <input type="text" id="lastName" class="form-control form-control-lg"
                                                        onChange="" required="required" />
                                                    <label class="form-label" for="form3Example1n">Tên</label>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="form-outline mb-2">
                                            <input type="email" class="form-control form-control-lg" name="username"
                                                id="inputUsername" onChange={onValueChangeUsername} required="required" />
                                            <label class="form-label" for="inputUsername">Tên đăng nhập</label>
                                        </div>

                                        <div class="form-outline mb-2">
                                            <input type="email" class="form-control form-control-lg" name="email"
                                                id="inputemail" onChange={onValueChangeEmail} required="required" />
                                            <label class="form-label" for="inputemail">Email</label>
                                        </div>

                                        <div class="form-outline mb-2">
                                            <input type="text" id="form3Example8" class="form-control form-control-lg" />
                                            <label class="form-label" for="form3Example8">Địa chỉ</label>
                                        </div>

                                        <div class="form-outline mb-2">
                                            <input type="text" id="form3Example8" class="form-control form-control-lg" />
                                            <label class="form-label" for="form3Example8">Số điện thoại</label>
                                        </div>

                                        <div class="form-outline mb-2">
                                            <input type="password" name="password" id="inputPassword" class="form-control form-control-lg"
                                                onChange={onValueChangePassword} required="required" />
                                            <label class="form-label" for="inputpassword">Mật khẩu</label>
                                        </div>

                                        <div class="form-outline mb-2">
                                            <input type="password" name="repassword" id="inputrepassword" class="form-control form-control-lg"
                                                onChange={onValueChangeRePassword} required="required" />
                                            <label class="form-label" for="inputrepassword">Nhập lại mật khẩu</label>
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