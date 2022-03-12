import React,{useState,useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios  from 'axios';
import {useSnackbar} from 'notistack';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { Spinner,Button, FormControl, Dropdown, Form,Alert } from 'react-bootstrap';
import { FaCommentAlt,FaElementor,FaWaze,FaHouseDamage,FaUserSlash } from "react-icons/fa";


const submitloginAPI= (data) => {
    const url = "http://127.0.0.1:5000/api/addpost"
    return axios.post(url,data)
}
const type = [
            {
                value: 'thue',
                label: 'Cho Thuê',
            },
            {
                value: 'tim',
                label: 'Tìm Phòng',
            },
            {
                value: 'ghep',
                label: 'Ở Ghép',
            },
            {
                value: 'homestay',
                label: 'Căn Hộ',
            },
            {
                value: 'other',     
                label: 'Khác',
            },
            ];
function AddPost(){
    let name = "";
    const token = localStorage.getItem("token");
    console.log("token: " + token);
    const usr = token.split("=")[1];
    const history = useHistory();
    const {enqueueSnackbar} = useSnackbar();
    const [info, setInfo] = useState({title: '', tpye: '',dientich:'',diachi:'',detail:'',cost:'',username:usr})
    let islogin = false;
    if(token != null){
        islogin = true;
        console.log("token: "+token);
        name = token.split('=')[1];
    }
    useEffect(() => {
        document.title = "Add Post"
    }, []);
    ///
    const onValueChangeTitle= (event) => {
        setInfo(prev =>({...prev, title:event.target.value}));
    }
    const onValueChangeDetail = (event) => {
        setInfo(prev =>({...prev, detail:event.target.value}));
    }
    const getValueType = (event) =>{
        setInfo(prev =>({...prev,type:event.target.value}));
    }
    const onValueChangeDientich= (event) => {
        setInfo(prev =>({...prev, dientich:event.target.value}));
    }
    const onValueChangeDiachi= (event) => {
        setInfo(prev =>({...prev, diachi:event.target.value}));
    }
    const onValueChangeCost= (event) => {
        setInfo(prev =>({...prev, cost:event.target.value}));
    }
    console.log("type: "+info.type);
    console.log("detail:"+info.detail);
    console.log("username:"+info.username);
    const onAdd = async () => {
        const data = new FormData();
        data.append("title",info.title);
        data.append("type",info.type);
        data.append("dientich",info.dientich);
        data.append("diachi", info.diachi);
        data.append("detail",info.detail);
        data.append("username",info.username);
        data.append("cost",info.cost);
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
                    <Dropdown.Item href="showbyid/1">Cho Thuê</Dropdown.Item>
                    <Dropdown.Item href="showbyid/2">Tìm Phòng</Dropdown.Item>
                    <Dropdown.Item href="showbyid/3">Ở Ghép</Dropdown.Item>
                    <Dropdown.Item href="showbyid/4">Căn Hộ</Dropdown.Item>
                    <Dropdown.Item href="showbyid/5">Other</Dropdown.Item>
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
            <h1 style={{'margin':'30px 200px',color:'chocolate'}}>TẢI LÊN BÀI VIẾT CỦA BẠN</h1>
            <div class="tieude">
                <TextField id="standard-basic" name = "title" label="Tiêu đề" onChange={onValueChangeTitle} variant="standard" />
            </div>
            <br/>
            {/* <div class="form-group"style={{margin:'10px 80px',padding:'10px'}}>
                <label for="inputtitle" class="col-sm-2 control-label">Type:</label>
                <Form.Group style={{width:'300px','margin-left':'20px'}}>
                <Form.Control as="select" onChange={getValueType} id='type' defaultValue='Other'>
                    <option value='IT'>Cho Thuê</option>
                    <option value='Learning'>Cần Thuê</option>
                    <option value='Working'>Ở Ghép</option>
                    <option value='Photography'>Mua Bán, Trao đổi</option>
                    <option value='Free Lance'>Căn Hộ</option>
                    <option value='Other'>Other</option>
                </Form.Control></Form.Group>
            </div> */}
            <div>
             <TextField
                id="outlined-select-currency-native"
                select
                label="Loại Bài Đăng"
                value={info.type}
                onChange={getValueType}
                SelectProps={{
                    native: true,
                }}
                helperText="Vui lòng chọn nhu cầu của bạn"
                >
                {type.map((option) => (
                    <option key={option.value} value={option.value}>
                    {option.label}
                    </option>
                ))}
            </TextField>
            </div>
            <div className="dientich">
                <TextField id="standard-basic" name = "title" label="Diện Tích" onChange={onValueChangeDientich} variant="standard" />
                    <br/>
            </div>
            <div className="diachi">
                <TextField id="standard-basic" name = "diachi" label="Địa Chỉ" onChange={onValueChangeDiachi} variant="standard" />
                    <br/>
            </div>
            <div className="detail">
                <TextField id="standard-basic" name = "detail" label="Chi Tiết" onChange={onValueChangeDetail} variant="standard" />
                    <br/>
            </div>
            <div className="cost">
                <TextField id="standard-basic" name = "cost" label="Giá Thuê" onChange={onValueChangeCost} variant="standard" />
                    <br/>
            </div>
            <button type="button" class="btn btn-success" id='add' onClick={onAdd}style={{"margin":'10px 270px','margin-bottom':'30px'}}>Thêm</button>
        </div>
    );
}
export default AddPost;