import React from 'react'

const Header = () => {
    return (
        <header>
            {/* Top bar starts */}
            <div className="top-bar">
                <div className="container">
                    {/* Contact starts */}
                    <div className="tb-contact pull-left">
                        {/* Email */}
                        <i className="fa fa-envelope color" /> &nbsp; <a href="mailto:contact@admin.com">contact@admin.com</a>
                        &nbsp;&nbsp;
                        {/* Phone */}
                        <i className="fa fa-phone color" /> &nbsp; 0826484137
                    </div>
                    {/* Contact ends */}
                    {/* Langauge starts */}
                    <div className="tb-language dropdown pull-right">
                        <a href="signin.html">Đăng nhập</a>
                    </div>
                    {/* Language ends */}
                    {/* Search section for responsive design */}
                    <div className="tb-search pull-left">
                        <a href="#" className="b-dropdown"><i className="fa fa-search square-2 rounded-1 bg-color white" /></a>
                        <div className="b-dropdown-block">
                            <form>
                                {/* Input Group */}
                                <div className="input-group">
                                    <input type="text" className="form-control" placeholder="Tìm kiếm phòng trọ" />
                                    <span className="input-group-btn">
                                        <button className="btn btn-color" type="button">Tìm kiếm</button>
                                    </span>
                                </div>
                            </form>
                        </div>
                    </div>
                    {/* Search section ends */}
                    {/* Social media starts */}
                    <div className="tb-social pull-right">
                        <div className="brand-bg text-right">
                            {/* Brand Icons */}
                            <a href="#" className="facebook"><i className="fa fa-facebook square-2 rounded-1" /></a>
                            <a href="#" className="twitter"><i className="fa fa-twitter square-2 rounded-1" /></a>
                            <a href="#" className="google-plus"><i className="fa fa-google-plus square-2 rounded-1" /></a>
                        </div>
                    </div>
                    {/* Social media ends */}
                    <div className="clearfix" />
                </div>
            </div>
            {/* Top bar ends */}
            {/* Header One Starts */}
            <div className="header-1">
                {/* Container */}
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 col-sm-4">
                            {/* Logo section */}
                            <div className="logo">
                                <h1><a href="index.html"><i className="fa fa-bookmark-o" /> LookCare</a></h1>
                            </div>
                        </div>
                        <div className="col-md-6 col-md-offset-2 col-sm-5 col-sm-offset-3 hidden-xs">
                            {/* Search Form */}
                            <div className="header-search">
                                <form>
                                    {/* Input Group */}
                                    <div className="input-group">
                                        <input type="text" className="form-control" placeholder="Tìm kiếm phòng trọ" />
                                        <span className="input-group-btn">
                                            <button className="btn btn-color" type="button">Tìm kiếm</button>
                                        </span>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Navigation starts */}
                <div className="navi">
                    <div className="container">
                        <div className="navy">
                            <ul>
                                {/* Main menu */}
                                <li><a href="#">Home</a>
                                    {/* Submenu */}
                                    <ul>
                                        <li><a href="index.html">Home 1</a></li>
                                        <li><a href="index-2.html"><span>Home 2</span></a></li>
                                        <li><a href="index-3.html"><span>Home 3</span></a></li>
                                    </ul>
                                </li>
                                <li><a href="#">Features</a>
                                    <ul>
                                        <li><a href="#">Footer</a>
                                            <ul>
                                                <li><a href="footer-one.html">Footer1</a></li>
                                                <li><a href="footer-two.html">Footer2</a></li>
                                                <li><a href="footer-three.html">Footer3</a></li>
                                            </ul>
                                        </li>
                                        <li><a href="#">Price Table</a>
                                            <ul>
                                                <li><a href="price-table-one.html">Price Table1</a></li>
                                                <li><a href="price-table-two.html">Price Table2</a></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                                <li><a href="#">Category</a>
                                    <ul>
                                        <li><a href="#">Laptop</a>
                                            <ul>
                                                <li><a href="#">Vaio</a></li>
                                                <li><a href="#">Samsung</a></li>
                                                <li><a href="#">Toshiba</a></li>
                                                <li><a href="#">HP</a></li>
                                            </ul>
                                        </li>
                                        <li><a href="#">Smartphone</a>
                                            <ul>
                                                <li><a href="#">Iphone</a></li>
                                                <li><a href="#">Oppo</a></li>
                                                <li><a href="#">Nokia</a></li>
                                                <li><a href="#">Sony</a></li>
                                                <li><a href="#">Samsung</a></li>
                                            </ul>
                                        </li>
                                        <li><a href="#">Accessories</a>
                                            <ul>
                                                <li><a href="#">Headphone</a></li>
                                                <li><a href="#">Adapter</a></li>
                                                <li><a href="#">Bag</a></li>
                                                <li><a href="#">Baby doll</a></li>
                                            </ul>
                                        </li>
                                        {/* Multi level menu */}
                                        <li><a href="#">Multi Level Menu</a>
                                            <ul>
                                                {/* Sub menu */}
                                                <li><a href="#">Menu #1</a></li>
                                                <li><a href="#">Menu #1</a></li>
                                                <li><a href="#">Menu #1</a>
                                                    <ul>
                                                        {/* Sub menu */}
                                                        <li><a href="#">Menu #2</a></li>
                                                        <li><a href="#">Menu #2</a></li>
                                                        <li><a href="#">Menu #2</a>
                                                            <ul>
                                                                {/* Sub menu */}
                                                                <li><a href="#">Menu #3</a></li>
                                                                <li><a href="#">Menu #3</a></li>
                                                                <li><a href="#">Menu #3</a></li>
                                                            </ul>
                                                        </li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                                <li><a href="#">Blog</a>
                                    <ul>
                                        <li><a href="blog.html"><span>Blog Default</span></a></li>
                                        <li><a href="blog-masonry.html"><span>Blog Masonry</span></a></li>
                                        <li><a href="blog-full-width.html"><span>Blog Full Width</span></a></li>
                                        <li><a href="single-post.html"><span>Single Page 1</span></a></li>
                                        <li><a href="single-post-v2.html"><span>Single Page 2</span></a></li>
                                    </ul>
                                </li>
                                <li><a href="#">Pages</a>
                                    <ul>
                                        <li><a href="shop.html"><span>Shop</span></a></li>
                                        <li><a href="single-product.html"><span>Single product</span></a></li>
                                        <li><a href="shopping-cart.html"><span>Cart</span></a></li>
                                        <li><a href="checkout.html"><span>Checkout</span></a></li>
                                        <li><a href="wishlist.html"><span>Wishlist</span></a></li>
                                        <li><a href="signin.html"><span>Sign In</span></a></li>
                                        <li><a href="signup.html"><span>Sign Up</span></a></li>
                                        <li><a href="404.html"><span>404 Page</span></a></li>
                                    </ul>
                                </li>
                                <li><a href="about.html">About Us</a></li>
                                <li><a href="contact.html">Contact Us</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                {/* Navigation ends */}
            </div>
            {/* Header one ends */}
        </header>
    )
}

export default Header