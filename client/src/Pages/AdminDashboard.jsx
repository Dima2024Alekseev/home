import React from 'react';
import { Link } from 'react-router-dom';
import Header from "../Components/Header";
import Footer from "../Components/Footer/Footer";
import "../style/admin-dashboard.css";

const AdminDashboard = () => {
    return (
        <>
            <Header
                title='Панель администратора'
                showBlock={true}
                innerTitle="Панель администратора"
                linkText="Панель администратора"
                showGradient={true}
            />
            <main className="admin-dashboard-content">
                <section className="admin-dashboard-section">
                    <h2>Редактирование расписания</h2>
                    <Link to="/schedule-editor" className="admin-dashboard-link">Редактировать расписание</Link>
                </section>
                <section className="admin-dashboard-section">
                    <h2>Журнал посещаемости</h2>
                    <Link to="/attendance-journal" className="admin-dashboard-link">Редактировать журнал</Link>
                </section>

            </main>
            <Footer />
        </>
    );
};

export default AdminDashboard;