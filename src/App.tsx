import React, {useState, useEffect} from "react";
import {
  Main,
  Services,
  Timeline,
  Expertise,
  Project,
  Contact,
  Navigation,
  Footer,
} from "./components";
import FadeIn from './components/FadeIn';
import './index.scss';

function App() {
    const [mode, setMode] = useState<string>('dark');

    const handleModeChange = () => {
        if (mode === 'dark') {
            setMode('light');
        } else {
            setMode('dark');
        }
    }

    useEffect(() => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
      }, []);

    return (
    <div className={`main-container ${mode === 'dark' ? 'dark-mode' : 'light-mode'}`}>
        <a className="skip-link" href="#main">Skip to content</a>
        <Navigation parentToChild={{mode}} modeChange={handleModeChange}/>
        <main id="main">
            <FadeIn transitionDuration={700}>
                <Main mode={mode}/>
                <Services/>
                <Project/>
                <Expertise/>
                <Timeline/>
                <Contact/>
            </FadeIn>
        </main>
        <Footer />
    </div>
    );
}

export default App;