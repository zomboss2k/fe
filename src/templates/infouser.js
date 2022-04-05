import React,{ useState,useEffect } from "react";
import Headers from './Headers';
import Footer from './Footer';
import { getAPI } from '../service/api.js';

const getuser=(usr)=>{
    return getAPI('/showname/'+usr);
}
function InfoUser(){

    return(
        <div></div>
    );
}
export default InfoUser;