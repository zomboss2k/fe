import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {useSnackbar} from 'notistack';
import { useHistory } from 'react-router';
import { Redirect } from 'react-router-dom';


const submitloginAPI= (data) => {
    const url = "http://127.0.0.1:5000/api/login"
    return axios.post(url,data)
}
function Login() {
    const history = useHistory();
    const token = localStorage.getItem("token");
    console.log("token fist :"+token);    
    const {enqueueSnackbar} = useSnackbar();
    const [info, setInfo] = useState({username: '', password: ''})
    if(token != null){
        history.push('index');
    }
    else {
        <Redirect to='login' />
    }
    const onValueChangeUsername = (event) => {
        setInfo(prev =>({...prev, username:event.target.value}));
    }
    const onValueChangePassword = (event) => {
        setInfo(prev =>({...prev, password:event.target.value}));
    }
    const onSubmit = async () => {
        const data = new FormData();
        data.append("username",info.username);
        data.append("password",info.password);
        try{
            const rs = await submitloginAPI(data);
            console.log(JSON.stringify(rs))
            if(rs.status === 200){
                localStorage.setItem("token","EAAAAAEfhadfg="+info.username);
                enqueueSnackbar("Dang Nhap Thanh Cong",{variant:'success'});
                console.log("rs.xsrfCookieName: "+rs.xsrfCookieName);
                console.log("token: "+token);
                    history.push('index');
                    <Redirect to='login' /> 
            }
            else {
                enqueueSnackbar("Đăng nhập thất bại!", { variant: "error" });
            }
        }catch(e){
            console.log("error: " + e);
            enqueueSnackbar("Dang Nhap That Bai",{variant:'error'});
        }
    }
    return(
        <div className="container">
            <h1 style={{align:'center',color:'red','margin':'50px 200px'}}>Please login to continue !!</h1>
            <div class="form-group" style={{margin:'100px 200px',}}>
                <label for="inputUsername" class="col-sm-2 control-label">Username:</label>
                <div class="col-sm-10">
                    <input type="text" name="username" id="inputUsername" class="form-control"
                    onChange={onValueChangeUsername}
                    required="required" pattern="" title="" style={{width:'300px',}}/>
                </div>
            <br/><br/>
                <label for="inputPassword" class="col-sm-2 control-label">Password:</label>
                <div class="col-sm-10">
                    <input type="password" name="password" id="inputPassword" class="form-control"
                    onChange={onValueChangePassword}
                    required="required" title="" style={{width:'300px',}}/>
                </div>
            <button type="button" class="btn btn-success" id='btn-login'
            onClick= {onSubmit}
            style={{align:'center','margin-left':'200px','margin-top':'50px'}}>Login</button>
        </div>
        </div>
    );
}
export default Login;