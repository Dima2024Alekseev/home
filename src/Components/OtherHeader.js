import React from "react";
import { Link } from 'react-router-dom';
import logo from "./img/header-icon.png";
import { useState } from "react";
import Navbar from "./Navbar";
import MobileMenu from "./MobileMenu";


const Otherheader = () => {
    const [nav, setNav] = useState(false);
    return (
        <header id="inner">
            <div className="container-events">
                <div className={
                    nav ? ["header-flex", "active"].join(' ') : ["header-flex"]}>
                    <Link to="/home">
                        <div>
                            <img className="logo-header" src={logo} alt="" />
                        </div>
                    </Link>
                    <Navbar />
                    <Link to="/price">
                        <div className="price_button">
                            <p>Цены</p>
                        </div>
                    </Link>
                    <div className="header-contact">
                        <a href="tel:+79994451203" id="list-header">
                            <div>
                                <h3>+7 (999) 445-12-03</h3>
                            </div>
                        </a>
                        <a href="./waiting-list.html" id="list-header">
                            <div>
                                <p>Лист ожидания</p>
                            </div>
                        </a>
                        <div className="header-icons">
                            <a className="header-icons_1" href="https://vk.com/mmakansk">
                                <svg fill="white" className="social" version="1.1" xmlns="http://www.w3.org/2000/svg" width="31" height="28" viewBox="0 0 31 28">
                                    <title>vk</title>
                                    <path d="M29.953 8.125c0.234 0.641-0.5 2.141-2.344 4.594-3.031 4.031-3.359 3.656-0.859 5.984 2.406 2.234 2.906 3.313 2.984 3.453 0 0 1 1.75-1.109 1.766l-4 0.063c-0.859 0.172-2-0.609-2-0.609-1.5-1.031-2.906-3.703-4-3.359 0 0-1.125 0.359-1.094 2.766 0.016 0.516-0.234 0.797-0.234 0.797s-0.281 0.297-0.828 0.344h-1.797c-3.953 0.25-7.438-3.391-7.438-3.391s-3.813-3.938-7.156-11.797c-0.219-0.516 0.016-0.766 0.016-0.766s0.234-0.297 0.891-0.297l4.281-0.031c0.406 0.063 0.688 0.281 0.688 0.281s0.25 0.172 0.375 0.5c0.703 1.75 1.609 3.344 1.609 3.344 1.563 3.219 2.625 3.766 3.234 3.437 0 0 0.797-0.484 0.625-4.375-0.063-1.406-0.453-2.047-0.453-2.047-0.359-0.484-1.031-0.625-1.328-0.672-0.234-0.031 0.156-0.594 0.672-0.844 0.766-0.375 2.125-0.391 3.734-0.375 1.266 0.016 1.625 0.094 2.109 0.203 1.484 0.359 0.984 1.734 0.984 5.047 0 1.062-0.203 2.547 0.562 3.031 0.328 0.219 1.141 0.031 3.141-3.375 0 0 0.938-1.625 1.672-3.516 0.125-0.344 0.391-0.484 0.391-0.484s0.25-0.141 0.594-0.094l4.5-0.031c1.359-0.172 1.578 0.453 1.578 0.453z"></path>
                                </svg>
                            </a>
                            <a className="header-icons_1" href="https://t.me/mmakansk">
                                <svg fill="white" className="social" version="1.1" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28">
                                    <title>telegram</title>
                                    <path d="M18.578 20.422l2.297-10.828c0.203-0.953-0.344-1.328-0.969-1.094l-13.5 5.203c-0.922 0.359-0.906 0.875-0.156 1.109l3.453 1.078 8.016-5.047c0.375-0.25 0.719-0.109 0.438 0.141l-6.484 5.859-0.25 3.563c0.359 0 0.516-0.156 0.703-0.344l1.687-1.625 3.5 2.578c0.641 0.359 1.094 0.172 1.266-0.594zM28 14c0 7.734-6.266 14-14 14s-14-6.266-14-14 6.266-14 14-14 14 6.266 14 14z"></path>
                                </svg>
                            </a>
                        </div>
                    </div>
                    <a href="./registration.html">
                        <div className="personal-area">
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="3.6vw" height="3.2vw" viewBox="0 0 36 32">
                                <title>личный кабинет</title>
                                <path d="M0.5 31.983c0.268 0.067 0.542-0.088 0.612-0.354 1.030-3.843 5.216-4.839 7.718-5.435 0.627-0.149 1.122-0.267 1.444-0.406 2.85-1.237 3.779-3.227 4.057-4.679 0.034-0.175-0.029-0.355-0.165-0.473-1.484-1.281-2.736-3.204-3.526-5.416-0.022-0.063-0.057-0.121-0.103-0.171-1.045-1.136-1.645-2.337-1.645-3.294 0-0.559 0.211-0.934 0.686-1.217 0.145-0.087 0.236-0.24 0.243-0.408 0.221-5.094 3.849-9.104 8.299-9.13 0.005 0 0.102 0.007 0.107 0.007 4.472 0.062 8.077 4.158 8.206 9.324 0.004 0.143 0.068 0.277 0.178 0.369 0.313 0.265 0.459 0.601 0.459 1.057 0 0.801-0.427 1.786-1.201 2.772-0.037 0.047-0.065 0.101-0.084 0.158-0.8 2.536-2.236 4.775-3.938 6.145-0.144 0.116-0.212 0.302-0.178 0.483 0.278 1.451 1.207 3.44 4.057 4.679 0.337 0.146 0.86 0.26 1.523 0.403 2.477 0.536 6.622 1.435 7.639 5.232 0.060 0.223 0.262 0.37 0.482 0.37 0.043 0 0.086-0.006 0.13-0.017 0.267-0.072 0.425-0.346 0.354-0.613-1.175-4.387-5.871-5.404-8.393-5.95-0.585-0.127-1.090-0.236-1.336-0.344-1.86-0.808-3.006-2.039-3.411-3.665 1.727-1.483 3.172-3.771 3.998-6.337 0.877-1.14 1.359-2.314 1.359-3.317 0-0.669-0.216-1.227-0.644-1.663-0.238-5.604-4.237-10.017-9.2-10.088l-0.149-0.002c-4.873 0.026-8.889 4.323-9.24 9.83-0.626 0.46-0.944 1.105-0.944 1.924 0 1.183 0.669 2.598 1.84 3.896 0.809 2.223 2.063 4.176 3.556 5.543-0.403 1.632-1.55 2.867-3.414 3.676-0.241 0.105-0.721 0.22-1.277 0.352-2.541 0.604-7.269 1.729-8.453 6.147-0.071 0.267 0.087 0.54 0.354 0.612z"></path>
                            </svg>
                        </div>
                    </a>
                </div>
                <MobileMenu nav={nav} setNav={setNav}/>
                <div className="content">
                    <div className="title">
                        <h1>Расписание</h1>
                    </div>
                    <div className="links">
                        <div style={{ borderRight: '1px solid white', paddingRight: '10px' }}>
                            <Link to="/home">Главная</Link>
                        </div>
                        <div>
                            <Link to="/schedule" style={{ color: 'white', paddingLeft: '10px' }}>Расписание</Link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};
export default Otherheader;