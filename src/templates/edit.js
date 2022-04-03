import React,{useState,useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {getAPI} from '../service/api.js';
import {useSnackbar} from 'notistack';
import { useHistory,useParams } from 'react-router';
import Form from 'react-bootstrap/Form';
import axios  from 'axios';

const showpostID = (id) => {
    return getAPI('/selectpost/'+id);
}
const editPost= (data) => {
    const url = "http://127.0.0.1:5000/api/editpost"
    return axios.post(url,data)
}
function Edit(){
    let {id} = useParams();
    console.log('id: '+id);
    const token = localStorage.getItem("token");
    console.log("token: " + token);
    const usr = token.split("=")[1];
    const history = useHistory();
    const {enqueueSnackbar} = useSnackbar();
    const [postt, setPostt] = useState([]);
    const [info, setInfo] = useState({post_ID:id ,title: '', tpye: '',detail:'',username:usr})
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
    console.log("title:"+info.title);
    const _onEdit = async () => {
        const data = new FormData();
        data.append("post_ID",info.post_ID)
        data.append("title",info.title);
        data.append("type",info.type);
        data.append("detail",info.detail);
        try{
            const rs = await editPost(data);
            console.log(JSON.stringify(rs))
            if(rs.status === 200){
                enqueueSnackbar("Sửa Bài Đăng  Thành Công",{variant:'success'});
                history.push('/')
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
    useEffect(() => {
        document.title = "Edit Post-Abc Forum"
    }, []);
    useEffect(() => {
        console.log('id truoc:'+id);
        const requestData = async (props) => {
            console.log('id sau:'+id);
        try {
            const result = await showpostID(id);
            console.log('id sau 2:'+id);
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

        
        
        <div class="container" style={{width:'1000px',}}>
            <h1>SUA BAI DANG</h1>
            <div class="form-group" style={{margin:'50px 80px',padding:'10px'}}>
                <label for="inpuID" class="col-sm-2 control-label" >Post ID: </label>
                {postt.map((row) =>(
                <input type="text" value={row.post_ID} name="post_ID" class="form-control"style={{'width': '200px','margin-left':'20px','margin-bottom':'10px' }}></input>
                ))}
                <label for="inputtitle" class="col-sm-2 control-label">Title:</label>
                <div class="col-sm-10">
                    {postt.map((row) =>(
                    <input type="text" name="title" defaultValue={row.title} id="inputtitle" onChange={onValueChangeTitle} class="form-control" required="required" />
                    ))}
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
                    {postt.map((row) => (
                    <textarea name="detail" defaultValue = {row.detail} id="textareadetail" onChange={onValueChangeDetail}  class="form-control" rows="3" required="required"></textarea>
                    ))}
                    </div>
            </div><br/>
            <button type="button" class="btn btn-success" onClick={_onEdit}style={{"margin":'10px 270px','margin-bottom':'30px'}}>Edit</button>
        </div>

        

        
    );
}
export default Edit;