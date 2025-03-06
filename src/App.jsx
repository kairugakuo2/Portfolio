import React from "react";
import './styles/App.css'
import NavBar from './components/NavBar';
import Intro from "./sections/Intro.jsx";

const App = () => {
    return (
        <div className="App" >
            <NavBar/>
            <Intro />
            <Intro />
            <Intro />
            <Intro />

        </div>
    );
};
export default App
