import React from "react";
import "../style/events.css";
import Header from "../Components/Header";
import Post from "../Components/Post"
import Footer from "../Components/Footer";


const Press = () => {
    return (
        <>
            <Header
                title="Пресс-центр"
                showBlock={true}
                innerTitle="Пресс-центр"
                linkText="Пресс-центр"
                showGradient={true}
            />
            <Post/>
            <Footer />
        </>
    );
};

export default Press;