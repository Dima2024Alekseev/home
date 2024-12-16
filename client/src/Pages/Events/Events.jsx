import React from "react";
import "./events.css";
import Header from "../../Components/Header";
import Posts from "../../Components/Post";
import Footer from "../../Components/Footer/Footer";

const Events = () => {
    return (
        <>
            <Header
                title="События"
                showBlock={true}
                showGradient={true}
                innerTitle="События Академии"
                linkText="События"
            />
            <Posts filterTag="#афиша" />
            <Footer />
        </>
    );
};

export default Events;
