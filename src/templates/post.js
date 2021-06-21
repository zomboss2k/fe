import React,{useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios  from 'axios';
import {useSnackbar} from 'notistack';
import { useHistory } from 'react-router';
import Form from 'react-bootstrap/Form';

const submitloginAPI= (data) => {
    const url = "http://127.0.0.1:5000/api/addpost"
    return axios.post(url,data)
}
function AddPost(){
    const token = localStorage.getItem("token");
    console.log("token: " + token);
    const usr = token.split("=")[1];
    const history = useHistory();
    const {enqueueSnackbar} = useSnackbar();
    const [info, setInfo] = useState({title: '', tpye: '',detail:'',username:usr})
    const onValueChangeTitle= (event) => {
        setInfo(prev =>({...prev, title:event.target.value}));
    }
    const onValueChangeDetail = (event) => {
        setInfo(prev =>({...prev, detail:event.target.value}));
    }
    const getValueType = (event) =>{
        setInfo(prev =>({...prev,type:event.target.value}));
    }
    console.log("type: "+info.type);
    console.log("detail:"+info.detail);
    console.log("username:"+info.username);
    const onAdd = async () => {
        const data = new FormData();
        data.append("title",info.title);
        data.append("type",info.type);
        data.append("detail",info.detail);
        data.append("username",info.username);
        try{
            const rs = await submitloginAPI(data);
            console.log(JSON.stringify(rs))
            if(rs.status === 200){
                enqueueSnackbar("Tạo Bài Đăng  Thành Công",{variant:'success'});
                history.push('index');
            }
            else {
                console.log(rs.data)
                enqueueSnackbar("Vui Lòng Thử Lại !", { variant: "error" });
            }
        }catch(e){
            console.log("error: " + e);
            enqueueSnackbar("Vui Lòng Thử Lại ",{variant:'error'});
        }
    }
    return (
        
        <div class="container" style={{width:'800px',}}>
            <h1>THEM BAI DANG</h1>
            <div class="form-group" style={{margin:'50px 80px',padding:'10px'}}>
                <label for="inputtitle" class="col-sm-2 control-label">Title:</label>
                <div class="col-sm-10">
                    <input type="text" name="title" id="inputtitle" onChange={onValueChangeTitle} class="form-control" required="required" />
                </div>
            </div>
            <div class="form-group"style={{margin:'10px 80px',padding:'10px'}}>
                <label for="inputtitle" class="col-sm-2 control-label">Type:</label>
                <Form.Group style={{width:'300px','margin-left':'20px'}}>
                <Form.Control as="select" onChange={getValueType}>
                    <option value='it'>IT</option>
                    <option value='learning'>Learning</option>
                    <option value='working'>Working</option>
                    <option value='photography'>Photography</option>
                    <option value='freelance'>Free Lance</option>
                    <option value='other'>Other</option>
                </Form.Control></Form.Group>
            </div>
            <div class="form-group"style={{margin:'50px 80px',padding:'10px'}}>
                <label for="textareadetail" class="col-sm-2 control-label">Detail:</label>
                <div class="col-sm-10">
                    <textarea name="detail" id="textareadetail" onChange={onValueChangeDetail}  class="form-control" rows="3" required="required"></textarea>
                </div>
            </div><br/>
            <button type="button" class="btn btn-success" onClick={onAdd}style={{"margin":'10px 270px','margin-bottom':'30px'}}>ADD</button>
        </div>
    );
}
export default AddPost;