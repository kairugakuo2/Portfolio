import { TypeAnimation } from 'react-type-animation'
const Intro = () => {

    return (
        <section id="intro" style={{ marginLeft:75, marginRight:75, padding:0, textAlign:"center" }}>
            <h1 className="myName" style={{margin: 0}}>
                <TypeAnimation sequence={[
                    "Hi, I'm Gakuo 👋"]}
                    speed={{type:'keyStrokeDelayInMs', value:250}}
                    repeat={1}
                />
            </h1>
            <h2 style={{ fontSize: "1.75rem", margin: 10}}>I make stuff sometimes</h2>
            <p style={{ fontSize: "1.25rem", margin: 10}}>
                I'm an Sophomore at the University of Oklahoma and aspiring software engineer with a passion for
                Web Development and Machine Learning. Welcome to my portfolio!
            </p>
            <button className="button" style={{fontSize: "1.5rem", margin: 10}}>
                Say Hello!
            </button>

        </section>
    );
};

export default Intro;