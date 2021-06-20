import React from 'react';
import { Redirect } from 'react-router-dom';
function Sigout(){
    localStorage.removeItem("token");
    return(
        <Redirect to = 'index'/>
    );
}
export default Sigout;