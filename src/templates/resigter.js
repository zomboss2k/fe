import React, { useState,useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router';

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
        <div className="container">
            <h1 style={{ align: 'center', color: 'red', 'margin': '50px 200px' }}>Please fill all your information !!</h1>
            <div class="form-group" style={{ margin: '100px 300px' }}>
                <label for="inputUsername" class="col-sm-2 control-label">Username:</label>
                <div class="col-sm-10" style={{ width: '100px', height: '50px' }}>
                    <input type="text" name="username" id="inputUsername" class="form-control"
                        onChange={onValueChangeUsername}
                        required="required" pattern="" title="" style={{ width: '300px', }} />
                </div>
                <br /><br />
                <label for="inputpassword" class="col-sm-2 control-label">Password:</label>
                <div class="col-sm-10">
                    <input type="password" name="password" id="inputPassword" class="form-control"
                        onChange={onValueChangePassword}
                        required="required" title="" style={{ width: '300px', }} />
                </div>
                <br></br>
                <label for="inputrepassword" class="col-sm-2 control-label">Re_Password:</label>
                <div class="col-sm-10">
                    <input type="password" name="repassword"
                        onChange={onValueChangeRePassword}
                        id="inputrepassword" class="form-control" required="required" style={{ width: '300px', }} />
                </div>
                <br /><br />
                <label for="inputemail" class="col-sm-2 control-label">Email:</label>
                <div class="col-sm-10">
                    <input type="email" name="email"
                        onChange={onValueChangeEmail}
                        id="inputemail" class="form-control" required="required" style={{ width: '300px', }} />
                </div>
                <br /><br />
                <button type="button" class="btn btn-success" id='btn-create'
                    onClick={onCreate}
                    style={{ align: 'center', 'margin-left': '120px', 'margin-top': '50px' }}>Create</button>

            </div>
        </div >

    );
}
export default Resigter;