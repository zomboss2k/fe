import React,{useState,useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios  from 'axios';
import {useSnackbar} from 'notistack';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { Spinner,Button, FormControl, Dropdown, Form,Alert } from 'react-bootstrap';
import { FaCommentAlt,FaElementor,FaWaze,FaHouseDamage,FaUserSlash } from "react-icons/fa";

const submitloginAPI= (data) => {
    const url = "http://127.0.0.1:5000/api/addpost"
    return axios.post(url,data)
}
function AddPost(){
     let name = "";
    const token = localStorage.getItem("token");
    console.log("token: " + token);
    const usr = token.split("=")[1];
    const history = useHistory();
    const {enqueueSnackbar} = useSnackbar();
    const [info, setInfo] = useState({title: '', tpye: '',detail:'',username:usr})
    let islogin = false;
    if(token != null){
        islogin = true;
        console.log("token: "+token);
        name = token.split('=')[1];
    }
    useEffect(() => {
        document.title = "Add Post-Abc Forum"
    }, []);
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
        
        <div class="container" style={{width:'1000px',}}>
            <div className="header" >
                <nav class="navbar navbar-default navbar-static-top" role="navigation" style={{'background-color':'greenyellow'}}>
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic"> <FaElementor />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                    <Dropdown.Item href="showbyid/1">IT</Dropdown.Item>
                    <Dropdown.Item href="showbyid/2">Learning</Dropdown.Item>
                    <Dropdown.Item href="showbyid/3">Working</Dropdown.Item>
                    <Dropdown.Item href="showbyid/4">Photography</Dropdown.Item>
                    <Dropdown.Item href="showbyid/5">Free Lance</Dropdown.Item>
                    <Dropdown.Item href="showbyid/6">Other</Dropdown.Item>
                    </Dropdown.Menu>
                    </Dropdown>
                    <Link class="navbar-brand" to={{pathname: "/"}} style={{width:'10px'}}>
                        <FaHouseDamage />
                    </Link>
                <Form inline>
                    <FormControl type="text" placeholder="enter your key..." className="mr-sm-2" name='searchValue'/>
                    <Button variant="outline-success" id='search'>Search</Button>
                </Form>
                {name 
                ?<Alert class="" style={{color:'chocolate'}}><FaWaze/> {name}</Alert>  
                :console.log("name: "+name) }
                <ul class="nav navbar-nav" style={{float:'right','flex-direction':'unset'}}>
                    <li style={{width:'80px','margin-right':'10px'}}>
                        {islogin
                        ?<Link to={{pathname: "/addpost"}}>Add Post</Link>
                        :<Link to={{pathname: "/login"}}>Sign in</Link>}
                    </li>
                    <li className="active">
                        {islogin 
                        ?<Link to={{pathname: "/sigout"}}><FaUserSlash /></Link>   
                        :<Link to={{pathname: "/resigter"}}>Sign Up</Link>}
                    </li>
                </ul>
            </nav>
            </div>
            <h1 style={{'margin':'30px 200px',color:'chocolate'}}>THEM BAI DANG</h1>
            <div class="form-group" style={{margin:'50px 80px',padding:'10px'}}>
                <label for="inputtitle" class="col-sm-2 control-label">Title:</label>
                <div class="col-sm-10">
                    <input type="text" name="title" id="inputtitle" onChange={onValueChangeTitle} class="form-control" required="required" />
                </div>
            </div>
            <div class="form-group"style={{margin:'10px 80px',padding:'10px'}}>
                <label for="inputtitle" class="col-sm-2 control-label">Type:</label>
                <Form.Group style={{width:'300px','margin-left':'20px'}}>
                <Form.Control as="select" onChange={getValueType} id='type' defaultValue='Other'>
                    <option value='IT'>IT</option>
                    <option value='Learning'>Learning</option>
                    <option value='Working'>Working</option>
                    <option value='Photography'>Photography</option>
                    <option value='Free Lance'>Free Lance</option>
                    <option value='Other'>Other</option>
                </Form.Control></Form.Group>
            </div>
            <div class="form-group"style={{margin:'50px 80px',padding:'10px'}}>
                <label for="textareadetail" class="col-sm-2 control-label">Detail:</label>
                <div class="col-sm-10">
                    <textarea name="detail" id="textareadetail" onChange={onValueChangeDetail}  class="form-control" rows="3" required="required"></textarea>
                </div>
            </div><br/>
            <button type="button" class="btn btn-success" id='add' onClick={onAdd}style={{"margin":'10px 270px','margin-bottom':'30px'}}>ADD</button>
        </div>
    );
}
export default AddPost;