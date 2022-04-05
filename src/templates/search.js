import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    Card,
    Spinner,
    Button,
    FormControl,
    Dropdown,
    Form,
    Alert,
    Row,
    Col,
} from "react-bootstrap";
import { getAPI } from "../service/api.js";
import { useHistory, useParams } from "react-router";
import { useSnackbar } from "notistack";
import {
    FaCommentAlt,
    FaElementor,
    FaWaze,
    FaHouseDamage,
    FaUserSlash,
} from "react-icons/fa";
import Headers from './Headers';    
import Footer from './Footer';    


const searchAPI = (value) => {
    return getAPI("/search/" + value);
};
const deletePostAPI = (id) => {
    return getAPI("/deletepost/" + id);
};
function Search() {
    let { value } = useParams();
    console.log("gt lay dc: " + value);
    let name = "";
    const [searchValue, setSearchValue] = useState({ value: "" });
    const [post, setPost] = useState({ post_ID: "" });
    const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();
    const token = localStorage.getItem("token");
    console.log("token fist:" + token);
    const [postt, setPostt] = useState([]);
    let islogin = false;
    if (token != null) {
        islogin = true;
        console.log("token: " + token);
        name = token.split("=")[1];
    }
    useEffect(() => {
        document.title = "Abc Forum";
    }, []);
    const _onDiscusion = (id) => {
        history.push("/");
        history.push("discusion/" + id);
    };
    const _onDelete = async (id) => {
        try {
            const rs = await deletePostAPI(id);
            if (rs.status === 200) {
                enqueueSnackbar("Xoa Thanh Cong", { variant: "success" });
                history.push("/");
                window.location.reload(false);
            }
        } catch (e) {
            console.log("error: ", e);
        }
    };
    const _onEdit = (id) => {
        history.push("/");
        history.push("edit/" + id);
    };
    const onValueChange = (event) => {
        setSearchValue((prev) => ({ ...prev, value: event.target.value }));
        console.log("your comment " + searchValue.value);
    };
    const _onSearch = (value) => {
        history.push("/");
        history.push("search/" + value);
        window.location.reload(false);
    };
    useEffect(() => {
        const requestData = async (props) => {
            try {
                const result = await searchAPI(value);
                if (result.status === 200) {
                    setPostt(result.data);
                }
            } catch (e) {
                console.log("error: ", e);
            }
        };
        requestData();
    }, []);
    return (
        <>
            <Headers />
            <div className="container" style={{ "margin-top": "150px" }}>
                
                <div className="content" style={{ padding: "10px 0px" }}>
                    {postt.map((row) => (
                        <Card>
                            <Card.Header>{row.type}</Card.Header>
                            <Card.Body>
                                <Card.Title>{row.title}</Card.Title>
                                <Card.Text>{row.detail}</Card.Text>
                                <Button
                                    variant="link"
                                    id="cmt"
                                    onClick={() => _onDiscusion(row.post_ID)}
                                >
                                    Discusion
                                </Button>
                                {name === row.username ? (
                                    <div
                                        className="onCRUD"
                                        style={{ float: "right", "margin-right": "100px" }}
                                    >
                                        <Button
                                            variant="warning"
                                            onClick={() => _onEdit(row.post_ID)}
                                            style={{ "margin-right": "30px" }}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="danger"
                                            onClick={() => _onDelete(row.post_ID)}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                ) : (
                                    "Posted by: " + row.username
                                )}
                            </Card.Body>
                        </Card>
                    ))}
                </div>
                <Footer />
            </div>
        </>
    );
}
export default Search;
