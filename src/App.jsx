import React, { useEffect, useState } from "react";
import './styles/App.css'
import { ThemeProvider } from './context/ThemeContext';
import NavBar from './components/NavBar';
import FadeInSection from './components/FadeInSection';
import CommandPalette from './components/CommandPalette';
import Intro from "./sections/Intro";
import About from "./sections/About";
import Experience from "./sections/Experience";
import Leadership from "./sections/Leadership";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";
import Footer from './components/Footer';



const App = () => {
    const [paletteOpen, setPaletteOpen] = useState(false);

    useEffect(() => {
        //reset the scroll position on load
        setTimeout(() => {
            window.scrollTo(0, 0);

        }, 0);
    }, []);

    useEffect(() => {
        console.log(
            "%c" +
            " ██████   █████  ██   ██ ██    ██  ██████  \n" +
            "██       ██   ██ ██  ██  ██    ██ ██    ██ \n" +
            "██   ███ ███████ █████   ██    ██ ██    ██ \n" +
            "██    ██ ██   ██ ██  ██  ██    ██ ██    ██ \n" +
            " ██████  ██   ██ ██   ██  ██████   ██████  ",
            "font-family: monospace; color: #2563EB;"
        );
        console.log(
            "%clike what you see? let's talk → kairugakuo2@gmail.com\n" +
            "https://github.com/kairugakuo2",
            "font-family: monospace; font-size: 12px;"
        );
    }, []);

    return (
        <ThemeProvider>
            <div className="App" >
                <NavBar onOpenPalette={() => setPaletteOpen(true)} />
                <CommandPalette
                    open={paletteOpen}
                    onOpen={() => setPaletteOpen(true)}
                    onClose={() => setPaletteOpen(false)}
                />

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
                    <FadeInSection>
                        <Leadership />
                    </FadeInSection>
                    <FadeInSection>
                        <Projects />
                    </FadeInSection>
                    <FadeInSection>
                        <Skills />
                    </FadeInSection>
                </div>

                <Footer />

            </div>
        </ThemeProvider>
    );
};
export default App
