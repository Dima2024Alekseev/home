import React, { useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Home from "./Pages/Home";
import About from "./Pages/About";
import Boxing from './Pages/Directions/Boxing';
import Grappling from './Pages/Directions/Grappling';
import Hand from './Pages/Directions/Hand-To-Hand-Combat';
import Karate from './Pages/Directions/Karate';
import Kickboxing from './Pages/Directions/Kickboxing';
import Mma from './Pages/Directions/MMA';
import Women from './Pages/Directions/Womens-Self-Defense';
import Events from "./Pages/Events";
import Press from './Pages/Press-Center';
import PageContact from "./Pages/Page-Contact";
import Schedule from "./Pages/Schedules/Schedule";
import Store from './Pages/Online-Store';
import Price from './Pages/Price';
import Authorization from './Pages/Account-Authorization';
import Waiting from './Pages/Waiting-List';
import ScheduleEditor from './Pages/ScheduleEditor';
import AdminDashboard from './Pages/AdminDashboard';
import AttendanceJournal from './Pages/AttendanceJournal';
import "./style/config.css";
import "./style/home.css";
import logo_title from "./img/log-club.png";
import useTitle from './Components/UseTitle';
import ScrollTop from './Components/ScrollTop';
import { NotificationProvider } from './Components/NotificationContext'; // Импортируем провайдер уведомлений

const AnimatedRoutes = () => {
  const location = useLocation();
  const nodeRef = useRef(null);

  const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return token !== null;
  };

  const isAdmin = () => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      return decodedToken.role === 'admin';
    }
    return false;
  };

  return (
    <TransitionGroup>
      <CSSTransition key={location.pathname} nodeRef={nodeRef} classNames="fade" timeout={150}>
        <div ref={nodeRef}>
          <Routes location={location}>
            <Route path="/home" element={<Home />} />
            <Route path="/boxing" element={<Boxing />} />
            <Route path="/grappling" element={<Grappling />} />
            <Route path="/hand-to-hand-combat" element={<Hand />} />
            <Route path="/karate" element={<Karate />} />
            <Route path="/kickboxing" element={<Kickboxing />} />
            <Route path="/mma" element={<Mma />} />
            <Route path="/womens-self-defense" element={<Women />} />
            <Route path="/about" element={<About />} />
            <Route path="/events" element={<Events />} />
            <Route path="/press-center" element={<Press />} />
            <Route path="/contact" element={<PageContact />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/online-store" element={<Store />} />
            <Route path="/price" element={<Price />} />
            <Route path="/authorization-account" element={<Authorization />} />
            <Route path="/waiting-list" element={<Waiting />} />
            <Route
              path="/schedule-editor"
              element={isAuthenticated() && isAdmin() ? <ScheduleEditor /> : <Navigate to="/authorization-account" />}
            />
            <Route
              path="/admin-dashboard"
              element={isAuthenticated() && isAdmin() ? <AdminDashboard /> : <Navigate to="/authorization-account" />}
            />
            <Route
              path="/attendance-journal" element={<AttendanceJournal />}
            />
          </Routes>
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default function App() {
  useTitle("Хулиган. Академия боевых единоборств", logo_title);

  return (
    <NotificationProvider>
      <Router>
        <ScrollTop />
        <AnimatedRoutes />
      </Router>
    </NotificationProvider>
  );
}
