import React from "react";
import { TypeAnimation } from 'react-type-animation'
const Intro = () => {

    return (
        <div className="intro">
            <h1 className="myName" >
                <TypeAnimation sequence={[
                    "Hi, I'm Gakuo 👋"]}
                    speed={{type:'keyStrokeDelayInMs', value:250}}
                    repeat={1}
                />
            </h1>
            <h2 >I make stuff sometimes</h2>
            <p>
                I'm an Sophomore at the University of Oklahoma and aspiring software engineer with a passion for
                Web Development and Machine Learning. Welcome to my portfolio!
            </p>
            <a href="mailto:kairugakuo2@gmail.com">
                <button  className="button" style={{fontSize: "1.5rem", margin: 10}}>
                    Say Hello!
                </button>
            </a>

        </div>
    );
};

export default Intro;