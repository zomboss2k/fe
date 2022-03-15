import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { Spinner, Button, FormControl, Dropdown, Form, Alert } from 'react-bootstrap';
import { FaCommentAlt, FaElementor, FaWaze, FaHouseDamage, FaUserSlash } from "react-icons/fa";
import "./post.css"


const submitloginAPI = (data) => {
    const url = "http://127.0.0.1:5000/api/addpost"
    return axios.post(url, data)
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
function AddPost() {
    let name = "";
    const token = localStorage.getItem("token");
    console.log("token: " + token);
    const usr = token.split("=")[1];
    const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();
    const [info, setInfo] = useState({ title: '', tpye: '', dientich: '', diachi: '', detail: '', cost: '', username: usr })
    let islogin = false;
    if (token != null) {
        islogin = true;
        console.log("token: " + token);
        name = token.split('=')[1];
    }
    useEffect(() => {
        document.title = "Add Post"
    }, []);
    ///
    const onValueChangeTitle = (event) => {
        setInfo(prev => ({ ...prev, title: event.target.value }));
    }
    const onValueChangeDetail = (event) => {
        setInfo(prev => ({ ...prev, detail: event.target.value }));
    }
    const getValueType = (event) => {
        setInfo(prev => ({ ...prev, type: event.target.value }));
    }
    const onValueChangeDientich = (event) => {
        setInfo(prev => ({ ...prev, dientich: event.target.value }));
    }
    const onValueChangeDiachi = (event) => {
        setInfo(prev => ({ ...prev, diachi: event.target.value }));
    }
    const onValueChangeCost = (event) => {
        setInfo(prev => ({ ...prev, cost: event.target.value }));
    }
    console.log("type: " + info.type);
    console.log("detail:" + info.detail);
    console.log("username:" + info.username);
    const onAdd = async () => {
        const data = new FormData();
        data.append("title", info.title);
        data.append("type", info.type);
        data.append("dientich", info.dientich);
        data.append("diachi", info.diachi);
        data.append("detail", info.detail);
        data.append("username", info.username);
        data.append("cost", info.cost);
        try {
            const rs = await submitloginAPI(data);
            console.log(JSON.stringify(rs))
            if (rs.status === 200) {
                enqueueSnackbar("Tạo Bài Đăng  Thành Công", { variant: 'success' });
                history.push('index');
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

    // post images
    const [selectedImages, setSelectedImages] = useState([]);
    const onSelectFile = (event) => {
        const selectedFiles = event.target.files;
        const selectedFilesArray = Array.from(selectedFiles);

        const imagesArray = selectedFilesArray.map((file) => {
            return URL.createObjectURL(file);
        });

        setSelectedImages((previousImages) => previousImages.concat(imagesArray));
    };

    return (

        <div class="container" style={{ width: '100%', 'margin-top': '170px'}}>
            
            <h1 style={{ 'margin': '30px 0', color: 'chocolate' }}>Tải lên bài viết của bạn</h1>
            <div className="row">
                <div className="col">
                    <div class="col">
                        <TextField style={{ width: '100%' }} id="standard-basic" name="title" label="Tiêu đề" onChange={onValueChangeTitle} variant="standard" />
                    </div>
                    <br />
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
                    <div class="col mt-4">
                        <TextField style={{ width: '100%' }}
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
                    <div class="col mt-4">
                        <TextField style={{ width: '100%' }} id="standard-basic" name="title" label="Diện Tích" onChange={onValueChangeDientich} variant="standard" />
                        <br />
                    </div>
                    <div className="col mt-4">
                        <TextField style={{ width: '100%' }} id="standard-basic" name="diachi" label="Địa Chỉ" onChange={onValueChangeDiachi} variant="standard" />
                        <br />
                    </div>
                    <div className="col mt-4">
                        <TextField style={{ width: '100%' }} id="standard-basic" name="detail" label="Chi Tiết" onChange={onValueChangeDetail} variant="standard" />
                        <br />
                    </div>
                    <div className="col mt-4">
                        <TextField style={{ width: '100%' }} s id="standard-basic" name="cost" label="Giá Thuê" onChange={onValueChangeCost} variant="standard" />
                        <br />
                    </div>
                </div>
                <div className="col">
                    <section>
                        <label className="labelImgs">
                            + Thêm Ảnh
                            <br />
                            <span>up to 10 images</span>
                            <input
                                type="file"
                                name="images"
                                onChange={onSelectFile}
                                multiple
                                accept="image/png , image/jpeg, image/webp"
                            />
                        </label>
                        <br />

                        {selectedImages.length > 0 &&
                            (selectedImages.length > 10 ? (
                                <p className="error">
                                    You can't upload more than 10 images! <br />
                                    <span>
                                        please delete <b> {selectedImages.length - 10} </b> of them{" "}
                                    </span>
                                </p>
                            ) : (
                                <button
                                    id='add'
                                    className="upload-btn"
                                    onClick={onAdd}
                                >
                                    UPLOAD {selectedImages.length} IMAGE
                                    {selectedImages.length === 1 ? "" : "S"}
                                </button>
                            ))}

                        <div className="images">
                            {selectedImages &&
                                selectedImages.map((image, index) => {
                                    return (
                                        <div key={image} className="image">
                                            <img src={image} height="200" alt="upload" />
                                            <button
                                                id='add'
                                                onClick={() =>
                                                    setSelectedImages(selectedImages.filter((e) => e !== image))
                                                }
                                            >
                                                delete image
                                            </button>
                                            <p>{index + 1}</p>
                                        </div>
                                    );
                                })}
                        </div>
                    </section>
                </div>
            </div>
            {/* <button type="button" class="btn btn-success" id='add' onClick={onAdd} style={{ "margin": '10px 270px', 'margin-bottom': '30px' }}>Thêm</button> */}
        </div>
    );
}
export default AddPost;