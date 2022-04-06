import React, { useState, useEffect } from "react";
import "./admin.css";
import "./vendors/mdi/css/materialdesignicons.min.css"
import "./vendors/feather/feather.css"
import "./vendors/base/vendor.bundle.base.css"
import "./vendors/flag-icon-css/css/flag-icon.min.css"
import "./vendors/font-awesome/css/font-awesome.min.css"
import "./vendors/jquery-bar-rating/fontawesome-stars-o.css"
import "./vendors/jquery-bar-rating/fontawesome-stars.css"



// import { getAPI } from '../../service/api.js';

// const getuser = (usr) => {
//     return getAPI('/showname/' + usr);
// }
function Admin() {

    return (
        <>
            <div className="container-scroller">
                {/* partial:partials/_navbar.html */}
                <nav className="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
                    <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
                        <div className="center logo_container">
                            <a href="/">colo<span>home</span></a>
                        </div>
                    </div>
                    <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end">
                        <button className="navbar-toggler navbar-toggler align-self-center" type="button" data-toggle="minimize">
                            <span className="icon-menu" />
                        </button>
                        <ul className="navbar-nav mr-lg-2">
                            <li className="nav-item nav-search d-none d-lg-block">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="search">
                                            <i className="icon-search" />
                                        </span>
                                    </div>
                                    <input type="text" className="form-control" placeholder="Search Projects.." aria-label="search" aria-describedby="search" />
                                </div>
                            </li>
                        </ul>
                        <ul className="navbar-nav navbar-nav-right">
                            <li className="nav-item dropdown d-lg-flex d-none">
                                <button type="button" className="btn btn-info font-weight-bold">+ Create New</button>
                            </li>
                            <li className="nav-item dropdown d-flex">
                                <a className="nav-link count-indicator dropdown-toggle d-flex justify-content-center align-items-center" id="messageDropdown" href="#" data-toggle="dropdown">
                                    <i className="icon-air-play mx-0" />
                                </a>
                                <div className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list" aria-labelledby="messageDropdown">
                                    <p className="mb-0 font-weight-normal float-left dropdown-header">Messages</p>
                                    <a className="dropdown-item preview-item">
                                        <div className="preview-thumbnail">
                                            <img src="images/faces/face4.jpg" alt="image" className="profile-pic" />
                                        </div>
                                        <div className="preview-item-content flex-grow">
                                            <h6 className="preview-subject ellipsis font-weight-normal">David Grey
                                            </h6>
                                            <p className="font-weight-light small-text text-muted mb-0">
                                                The meeting is cancelled
                                            </p>
                                        </div>
                                    </a>
                                    <a className="dropdown-item preview-item">
                                        <div className="preview-thumbnail">
                                            <img src="images/faces/face2.jpg" alt="image" className="profile-pic" />
                                        </div>
                                        <div className="preview-item-content flex-grow">
                                            <h6 className="preview-subject ellipsis font-weight-normal">Tim Cook
                                            </h6>
                                            <p className="font-weight-light small-text text-muted mb-0">
                                                New product launch
                                            </p>
                                        </div>
                                    </a>
                                    <a className="dropdown-item preview-item">
                                        <div className="preview-thumbnail">
                                            <img src="images/faces/face3.jpg" alt="image" className="profile-pic" />
                                        </div>
                                        <div className="preview-item-content flex-grow">
                                            <h6 className="preview-subject ellipsis font-weight-normal"> Johnson
                                            </h6>
                                            <p className="font-weight-light small-text text-muted mb-0">
                                                Upcoming board meeting
                                            </p>
                                        </div>
                                    </a>
                                </div>
                            </li>
                            <li className="nav-item dropdown d-flex mr-4 ">
                                <a className="nav-link count-indicator dropdown-toggle d-flex align-items-center justify-content-center" id="notificationDropdown" href="#" data-toggle="dropdown">
                                    <i className="icon-cog" />
                                </a>
                                <div className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list" aria-labelledby="notificationDropdown">
                                    <p className="mb-0 font-weight-normal float-left dropdown-header">Settings</p>
                                    <a className="dropdown-item preview-item">
                                        <i className="icon-head" /> Profile
                                    </a>
                                    <a className="dropdown-item preview-item">
                                        <i className="icon-inbox" /> Logout
                                    </a>
                                </div>
                            </li>
                            <li className="nav-item dropdown mr-4 d-lg-flex d-none">
                                <a className="nav-link count-indicatord-flex align-item s-center justify-content-center" href="#">
                                    <i className="icon-grid" />
                                </a>
                            </li>
                        </ul>
                        <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
                            <span className="icon-menu" />
                        </button>
                    </div>
                </nav>
                {/* partial */}
                <div className="container-fluid page-body-wrapper">
                    {/* partial:partials/_sidebar.html */}
                    <nav className="sidebar sidebar-offcanvas" id="sidebar">
                        <div className="user-profile">
                            <div className="user-image">
                                <img src={require("./images/faces/face28.png").default} />
                            </div>
                            <div className="user-name">
                                Edward Spencer
                            </div>
                            <div className="user-designation">
                                Developer
                            </div>
                        </div>
                        <ul className="nav">
                            <li className="nav-item">
                                <a className="nav-link" href="index.html">
                                    <i className="icon-box menu-icon" />
                                    <span className="menu-title">Dashboard</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" data-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
                                    <i className="icon-disc menu-icon" />
                                    <span className="menu-title">UI Elements</span>
                                    <i className="menu-arrow" />
                                </a>
                                <div className="collapse" id="ui-basic">
                                    <ul className="nav flex-column sub-menu">
                                        <li className="nav-item"> <a className="nav-link" href="pages/ui-features/buttons.html">Buttons</a></li>
                                        <li className="nav-item"> <a className="nav-link" href="pages/ui-features/typography.html">Typography</a></li>
                                    </ul>
                                </div>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="pages/forms/basic_elements.html">
                                    <i className="icon-file menu-icon" />
                                    <span className="menu-title">Form elements</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="pages/charts/chartjs.html">
                                    <i className="icon-pie-graph menu-icon" />
                                    <span className="menu-title">Charts</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="pages/tables/basic-table.html">
                                    <i className="icon-command menu-icon" />
                                    <span className="menu-title">Tables</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="pages/icons/feather-icons.html">
                                    <i className="icon-help menu-icon" />
                                    <span className="menu-title">Icons</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" data-toggle="collapse" href="#auth" aria-expanded="false" aria-controls="auth">
                                    <i className="icon-head menu-icon" />
                                    <span className="menu-title">User Pages</span>
                                    <i className="menu-arrow" />
                                </a>
                                <div className="collapse" id="auth">
                                    <ul className="nav flex-column sub-menu">
                                        <li className="nav-item"> <a className="nav-link" href="pages/samples/login.html"> Login </a></li>
                                        <li className="nav-item"> <a className="nav-link" href="pages/samples/login-2.html"> Login 2 </a></li>
                                        <li className="nav-item"> <a className="nav-link" href="pages/samples/register.html"> Register </a></li>
                                        <li className="nav-item"> <a className="nav-link" href="pages/samples/register-2.html"> Register 2 </a></li>
                                        <li className="nav-item"> <a className="nav-link" href="pages/samples/lock-screen.html"> Lockscreen </a></li>
                                    </ul>
                                </div>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="docs/documentation.html">
                                    <i className="icon-book menu-icon" />
                                    <span className="menu-title">Documentation</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                    {/* partial */}
                    <div className="main-panel">
                        <div className="content-wrapper">
                            <div className="row">
                                <div className="col-sm-12 mb-4 mb-xl-0">
                                    <h4 className="font-weight-bold text-dark">Hi, welcome back!</h4>
                                    <p className="font-weight-normal mb-2 text-muted">APRIL 1, 2019</p>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-xl-3 flex-column d-flex grid-margin stretch-card">
                                    <div className="row flex-grow">
                                        <div className="col-sm-12 grid-margin stretch-card">
                                            <div className="card">
                                                <div className="card-body">
                                                    <h4 className="card-title">Customers</h4>
                                                    <p>23% increase in conversion</p>
                                                    <h4 className="text-dark font-weight-bold mb-2">43,981</h4>
                                                    <canvas id="customers" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-12 stretch-card">
                                            <div className="card">
                                                <div className="card-body">
                                                    <h4 className="card-title">Orders</h4>
                                                    <p>6% decrease in earnings</p>
                                                    <h4 className="text-dark font-weight-bold mb-2">55,543</h4>
                                                    <canvas id="orders" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-9 d-flex grid-margin stretch-card">
                                    <div className="card">
                                        <div className="card-body">
                                            <h4 className="card-title">Website Audience Metrics</h4>
                                            <div className="row">
                                                <div className="col-lg-5">
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit amet cumque cupiditate</p>
                                                </div>
                                                <div className="col-lg-7">
                                                    <div className="chart-legends d-lg-block d-none" id="chart-legends" />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <canvas id="web-audience-metrics-satacked" className="mt-3" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xl-4 grid-margin stretch-card">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between mb-3">
                                                <h4 className="card-title">Market Trends</h4>
                                                <div className="dropdown">
                                                    <button className="btn btn-sm dropdown-toggle text-dark pt-0 pr-0" type="button" id="dropdownMenuSizeButton3" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                        This week
                                                    </button>
                                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuSizeButton3">
                                                        <h6 className="dropdown-header">This week</h6>
                                                        <h6 className="dropdown-header">This month</h6>
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="chart-legends-market-trend" className="chart-legends mt-1">
                                            </div>
                                            <div className="row mt-2 mb-2">
                                                <div className="col-6">
                                                    <div className="text-small"><span className="text-success">18.2%</span> higher </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="text-small"><span className="text-danger">0.7%</span> higher </div>
                                                </div>
                                            </div>
                                            <div className="marketTrends mt-4">
                                                <canvas id="marketTrendssatacked" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-4 grid-margin stretch-card">
                                    <div className="card">
                                        <div className="card-body">
                                            <h4 className="card-title">Traffic Sources</h4>
                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <div className="d-flex justify-content-between mt-2 text-dark mb-2">
                                                        <div><span className="font-weight-bold">4453</span> Leads</div>
                                                        <div>Goal: 2000</div>
                                                    </div>
                                                    <div className="progress progress-md grouped mb-2">
                                                        <div className="progress-bar  bg-danger" role="progressbar" style={{ width: '30%' }} aria-valuenow={25} aria-valuemin={0} aria-valuemax={100} />
                                                        <div className="progress-bar bg-info" role="progressbar" style={{ width: '20%' }} aria-valuenow={50} aria-valuemin={0} aria-valuemax={100} />
                                                        <div className="progress-bar  bg-primary" role="progressbar" style={{ width: '10%' }} aria-valuenow={25} aria-valuemin={0} aria-valuemax={100} />
                                                        <div className="progress-bar bg-warning" role="progressbar" style={{ width: '10%' }} aria-valuenow={50} aria-valuemin={0} aria-valuemax={100} />
                                                        <div className="progress-bar bg-success" role="progressbar" style={{ width: '5%' }} aria-valuenow={50} aria-valuemin={0} aria-valuemax={100} />
                                                        <div className="progress-bar bg-light" role="progressbar" style={{ width: '25%' }} aria-valuenow={50} aria-valuemin={0} aria-valuemax={100} />
                                                    </div>
                                                </div>
                                                <div className="col-sm-12">
                                                    <div className="traffic-source-legend">
                                                        <div className="d-flex justify-content-between mb-1 mt-2">
                                                            <div className="font-weight-bold">SOURCE</div>
                                                            <div className="font-weight-bold">TOTAL</div>
                                                        </div>
                                                        <div className="d-flex justify-content-between legend-label">
                                                            <div><span className="bg-danger" />Google Search</div>
                                                            <div>30%</div>
                                                        </div>
                                                        <div className="d-flex justify-content-between legend-label">
                                                            <div><span className="bg-info" />Social Media</div>
                                                            <div>20%</div>
                                                        </div>
                                                        <div className="d-flex justify-content-between legend-label">
                                                            <div><span className="bg-primary" />Referrals</div>
                                                            <div>10%</div>
                                                        </div>
                                                        <div className="d-flex justify-content-between legend-label">
                                                            <div><span className="bg-warning" />Organic Traffic</div>
                                                            <div>10%</div>
                                                        </div>
                                                        <div className="d-flex justify-content-between legend-label">
                                                            <div><span className="bg-success" />Google Search</div>
                                                            <div>5%</div>
                                                        </div>
                                                        <div className="d-flex justify-content-between legend-label">
                                                            <div><span className="bg-light" />Email Marketing</div>
                                                            <div>25%</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-4 grid-margin stretch-card">
                                    <div className="card">
                                        <div className="card-body">
                                            <h4 className="card-title mb-3">Recent Activity</h4>
                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <div className="text-dark">
                                                        <div className="d-flex pb-3 border-bottom justify-content-between">
                                                            <div className="mr-3"><i className="mdi mdi-signal-cellular-outline icon-md" /></div>
                                                            <div className="font-weight-bold mr-sm-4">
                                                                <div>Deposit has updated to Paid</div>
                                                                <div className="text-muted font-weight-normal mt-1">32 Minutes Ago</div>
                                                            </div>
                                                            <div><h6 className="font-weight-bold text-info ml-sm-2">$325</h6></div>
                                                        </div>
                                                        <div className="d-flex pb-3 pt-3 border-bottom justify-content-between">
                                                            <div className="mr-3"><i className="mdi mdi-signal-cellular-outline icon-md" /></div>
                                                            <div className="font-weight-bold mr-sm-4">
                                                                <div>Your Withdrawal Proceeded</div>
                                                                <div className="text-muted font-weight-normal mt-1">45 Minutes Ago</div>
                                                            </div>
                                                            <div><h6 className="font-weight-bold text-info ml-sm-2">$4987</h6></div>
                                                        </div>
                                                        <div className="d-flex pb-3 pt-3 border-bottom justify-content-between">
                                                            <div className="mr-3"><i className="mdi mdi-signal-cellular-outline icon-md" /></div>
                                                            <div className="font-weight-bold mr-sm-4">
                                                                <div>Deposit has updated to Paid                            </div>
                                                                <div className="text-muted font-weight-normal mt-1">1 Days Ago</div>
                                                            </div>
                                                            <div><h6 className="font-weight-bold text-info ml-sm-2">$5391</h6></div>
                                                        </div>
                                                        <div className="d-flex pt-3 justify-content-between">
                                                            <div className="mr-3"><i className="mdi mdi-signal-cellular-outline icon-md" /></div>
                                                            <div className="font-weight-bold mr-sm-4">
                                                                <div>Deposit has updated to Paid</div>
                                                                <div className="text-muted font-weight-normal mt-1">3 weeks Ago</div>
                                                            </div>
                                                            <div><h6 className="font-weight-bold text-info ml-sm-2">$264</h6></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xl-9 grid-margin-lg-0 grid-margin stretch-card">
                                    <div className="card">
                                        <div className="card-body">
                                            <h4 className="card-title">Top Sellers</h4>
                                            <div className="table-responsive mt-3">
                                                <table className="table table-header-bg">
                                                    <thead>
                                                        <tr>
                                                            <th>
                                                                Country
                                                            </th>
                                                            <th>
                                                                Revenue
                                                            </th>
                                                            <th>
                                                                Vs Last Month
                                                            </th>
                                                            <th>
                                                                Goal Reached
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                <i className="flag-icon flag-icon-us mr-2" title="us" id="us" /> United States
                                                            </td>
                                                            <td>
                                                                $911,200
                                                            </td>
                                                            <td>
                                                                <div className="text-success"><i className="icon-arrow-up mr-2" />+60%</div>
                                                            </td>
                                                            <td>
                                                                <div className="row">
                                                                    <div className="col-sm-10">
                                                                        <div className="progress">
                                                                            <div className="progress-bar bg-info" role="progressbar" style={{ width: '25%' }} aria-valuenow={25} aria-valuemin={0} aria-valuemax={100} />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-sm-2">
                                                                        25%
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <i className="flag-icon flag-icon-at mr-2" title="us" id="at" /> Austria
                                                            </td>
                                                            <td>
                                                                $821,600
                                                            </td>
                                                            <td>
                                                                <div className="text-danger"><i className="icon-arrow-down mr-2" />-40%</div>
                                                            </td>
                                                            <td>
                                                                <div className="row">
                                                                    <div className="col-sm-10">
                                                                        <div className="progress">
                                                                            <div className="progress-bar bg-info" role="progressbar" style={{ width: '50%' }} aria-valuenow={25} aria-valuemin={0} aria-valuemax={100} />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-sm-2">
                                                                        50%
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <i className="flag-icon flag-icon-fr mr-2" title="us" id="fr" /> France
                                                            </td>
                                                            <td>
                                                                $323,700
                                                            </td>
                                                            <td>
                                                                <div className="text-success"><i className="icon-arrow-up mr-2" />+40%</div>
                                                            </td>
                                                            <td>
                                                                <div className="row">
                                                                    <div className="col-sm-10">
                                                                        <div className="progress">
                                                                            <div className="progress-bar bg-info" role="progressbar" style={{ width: '10%' }} aria-valuenow={25} aria-valuemin={0} aria-valuemax={100} />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-sm-2">
                                                                        10%
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="py-1">
                                                                <i className="flag-icon flag-icon-de mr-2" title="us" id="de" /> Germany
                                                            </td>
                                                            <td>
                                                                $833,205
                                                            </td>
                                                            <td>
                                                                <div className="text-danger"><i className="icon-arrow-down mr-2" />-80%</div>
                                                            </td>
                                                            <td>
                                                                <div className="row">
                                                                    <div className="col-sm-10">
                                                                        <div className="progress">
                                                                            <div className="progress-bar bg-info" role="progressbar" style={{ width: '70%' }} aria-valuenow={25} aria-valuemin={0} aria-valuemax={100} />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-sm-2">
                                                                        70%
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="pb-0">
                                                                <i className="flag-icon flag-icon-ae mr-2" title="ae" id="ae" /> united arab emirates
                                                            </td>
                                                            <td className="pb-0">
                                                                $232,243
                                                            </td>
                                                            <td className="pb-0">
                                                                <div className="text-success"><i className="icon-arrow-up mr-2" />+80%</div>
                                                            </td>
                                                            <td className="pb-0">
                                                                <div className="row">
                                                                    <div className="col-sm-10">
                                                                        <div className="progress">
                                                                            <div className="progress-bar bg-info" role="progressbar" style={{ width: '60%' }} aria-valuenow={25} aria-valuemin={0} aria-valuemax={100} />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-sm-2">
                                                                        0%
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 grid-margin-lg-0 grid-margin stretch-card">
                                    <div className="card">
                                        <div className="card-body">
                                            <h4 className="card-title mb-3">Overall rating</h4>
                                            <div className="d-flex">
                                                <div>
                                                    <h4 className="text-dark font-weight-bold mb-2 mr-2">4.3</h4>
                                                </div>
                                                <div>
                                                    <select id="over-all-rating" name="rating" autoComplete="off">
                                                        <option value={1}>1</option>
                                                        <option value={2}>2</option>
                                                        <option value={3}>3</option>
                                                        <option value={4}>4</option>
                                                        <option value={5}>5</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <p className="mb-4">Based on 186 reviews</p>
                                            <div className="row">
                                                <div className="col-sm-2 pr-0">
                                                    <div className="d-flex">
                                                        <div>
                                                            <div className="text-dark font-weight-bold mb-2 mr-2">5</div>
                                                        </div>
                                                        <div>
                                                            <i className="fa fa-star text-warning" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-sm-9 pl-2">
                                                    <div className="row">
                                                        <div className="col-sm-10">
                                                            <div className="progress progress-lg mt-1">
                                                                <div className="progress-bar bg-warning" role="progressbar" style={{ width: '80%' }} aria-valuenow={25} aria-valuemin={0} aria-valuemax={100} />
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-2 p-lg-0">
                                                            80%
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row mt-2">
                                                <div className="col-sm-2 pr-0">
                                                    <div className="d-flex">
                                                        <div>
                                                            <div className="text-dark font-weight-bold mb-2 mr-2">4</div>
                                                        </div>
                                                        <div>
                                                            <i className="fa fa-star text-warning" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-sm-9 pl-2">
                                                    <div className="row">
                                                        <div className="col-sm-10">
                                                            <div className="progress progress-lg mt-1">
                                                                <div className="progress-bar bg-warning" role="progressbar" style={{ width: '45%' }} aria-valuenow={25} aria-valuemin={0} aria-valuemax={100} />
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-2 p-lg-0">
                                                            45%
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row mt-2">
                                                <div className="col-sm-2 pr-0">
                                                    <div className="d-flex">
                                                        <div>
                                                            <div className="text-dark font-weight-bold mb-2 mr-2">3</div>
                                                        </div>
                                                        <div>
                                                            <i className="fa fa-star text-warning" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-sm-9 pl-2">
                                                    <div className="row">
                                                        <div className="col-sm-10">
                                                            <div className="progress progress-lg mt-1">
                                                                <div className="progress-bar bg-warning" role="progressbar" style={{ width: '30%' }} aria-valuenow={25} aria-valuemin={0} aria-valuemax={100} />
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-2 p-lg-0">
                                                            30%
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row mt-2">
                                                <div className="col-sm-2 pr-0">
                                                    <div className="d-flex">
                                                        <div>
                                                            <div className="text-dark font-weight-bold mb-2 mr-2">2</div>
                                                        </div>
                                                        <div>
                                                            <i className="fa fa-star text-warning" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-sm-9 pl-2">
                                                    <div className="row">
                                                        <div className="col-sm-10">
                                                            <div className="progress progress-lg mt-1">
                                                                <div className="progress-bar bg-warning" role="progressbar" style={{ width: '8%' }} aria-valuenow={25} aria-valuemin={0} aria-valuemax={100} />
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-2 p-lg-0">
                                                            8%
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row mt-2">
                                                <div className="col-sm-2 pr-0">
                                                    <div className="d-flex">
                                                        <div>
                                                            <div className="text-dark font-weight-bold mb-2 mr-2">5</div>
                                                        </div>
                                                        <div>
                                                            <i className="fa fa-star text-warning" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-sm-9 pl-2">
                                                    <div className="row">
                                                        <div className="col-sm-10">
                                                            <div className="progress progress-lg mt-1">
                                                                <div className="progress-bar bg-warning" role="progressbar" style={{ width: '1%' }} aria-valuenow={25} aria-valuemin={0} aria-valuemax={100} />
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-2 p-lg-0">
                                                            1%
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <p className="mb-2 mt-3 mb-3 text-dark font-weight-bold">Rating by category</p>
                                                    <div className="d-flex">
                                                        <div>
                                                            <div className="text-dark font-weight-bold mb-2 mr-2">4.3</div>
                                                        </div>
                                                        <div className="mr-2">
                                                            <i className="fa fa-star text-warning" />
                                                        </div>
                                                        <div><p>Work/Management</p></div>
                                                    </div>
                                                    <div className="d-flex">
                                                        <div>
                                                            <div className="text-dark font-weight-bold mb-2 mr-2">3.5</div>
                                                        </div>
                                                        <div className="mr-2">
                                                            <i className="fa fa-star text-warning" />
                                                        </div>
                                                        <div><p>Salary/Culture</p></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* content-wrapper ends */}
                        {/* partial:partials/_footer.html */}
                        <footer className="footer">
                            <div className="d-sm-flex justify-content-center justify-content-sm-between">
                                <span className="text-muted d-block text-center text-sm-left d-sm-inline-block">Copyright © bootstrapdash.com 2020</span>
                                <span className="float-none float-sm-right d-block mt-1 mt-sm-0 text-center"> Free <a href="https://www.bootstrapdash.com/" target="_blank">Bootstrap dashboard templates</a> from Bootstrapdash.com</span>
                            </div>
                        </footer>
                        {/* partial */}
                    </div>
                    {/* main-panel ends */}
                </div>
                {/* page-body-wrapper ends */}
            </div>
        </>
    );
}
export default Admin;