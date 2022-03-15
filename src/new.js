<div className="container" style={{'width':''}} >
            <div className="header" style={{'margin-top':'20px'}}>
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
                    <FormControl type="text" placeholder="enter your key..." className="mr-sm-2" name='searchValue' onChange = {onValueChange}/>
                    <Button variant="outline-success" id='search' onClick={() => _onSearch(searchValue.value)}>Search</Button>
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
                     
        </div>