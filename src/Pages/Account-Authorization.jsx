import React from "react";
import "../style/profile.css";
import Header from "../Components/Header";
import Form from "../Components/Form";
import Footer from "../Components/Footer/Footer";

const Authorization = () => {

    return (
        <div id="inner">
            <Header
                title='Авторизация аккаунта' />
            <main>
                <Form
                    showFields={{ email: true, password: true, confirmPassword: true }}
                    formTitle='Авторизация'
                    title_button='Войти'
                />
            </main>
            <Footer />
        </div>
    );
};

export default Authorization;