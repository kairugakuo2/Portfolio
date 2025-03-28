import React, { useEffect } from "react";
import './styles/App.css'
import NavBar from './components/NavBar';
import FadeInSection from './components/FadeInSection';
import Intro from "./sections/Intro.jsx";
import About from "./sections/About.jsx";
import Experience from "./sections/Experience.jsx";



const App = () => {
    useEffect(() => {
        //reset the scroll position on load
        setTimeout(() => {
            window.scrollTo(0, 0);

        }, 0);
    }, []);
    return (
        <div className="App" >
            <NavBar/>

            <div className="content">
                <FadeInSection>
                    <Intro />
                </FadeInSection>
                <FadeInSection>
                    <About />
                </FadeInSection>
                <FadeInSection>
                    <Experience />
                </FadeInSection>
            </div>


        </div>
    );
};
export default App
