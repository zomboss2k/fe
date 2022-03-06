import React,{useState,useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios  from 'axios';
import {useSnackbar} from 'notistack';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { Spinner,Button, FormControl, Dropdown, Form,Alert } from 'react-bootstrap';
import { FaCommentAlt,FaElementor,FaWaze,FaHouseDamage,FaUserSlash } from "react-icons/fa";

const Send= (data) => {
    const url = "http://127.0.0.1:5000/api/"
    return axios.post(url,data)
}
function Chat() {
    const res = [];
    const [response,setResponse] = useState([]);
    const [info,setInfo] = useState({text:''});
    const onValueChange = (event) =>{
        setInfo(prev =>({...prev, text:event.target.value}));
    }
    const _onSubmit = async() =>{
        const data = new FormData();
        data.append("input_text",info.text);
        try {
            const rs = await Send(data);
            if(rs.status === 200){
                console.log("thanh cong");
                setResponse(rs.data);
            }
            else{
                console.log("error");
            }
        }catch(e){
            console.log("error")
        }
    }
    return(
        <div class="container">
            <h1>Hellooooo </h1>
            <div>
                <label>You: 
                </label>

            </div>
            <div class="response">
                <label value={response}></label>
            </div>

            <div class="input-group">
                <input type="text" name ='input_text' onChange={onValueChange} class="form-control" id="exampleInputAmount" placeholder="Input Something..."/>
                    <button onClick = {_onSubmit}type="button" class="btn btn-default">Send!</button>
            </div>
            
        </div>
        
    );
}
export default Chat;