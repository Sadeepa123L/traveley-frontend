import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Lenis from "lenis";
import 'lenis/dist/lenis.css';

import Home from "./components/Home/Home";
import NavBar from "./components/NavBar/Navbar";
import About from "./components/About/About";
import Services from "./components/Services/Services";
import Footer from "./components/Footer/Footer";

function App() {

    useEffect(() => {
        AOS.init({
            duration: 1000,
            offset: 100,
        });
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
        });
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);
        return () => {
            lenis.destroy();
        };

    }, []); 

    return(
        <>
        <NavBar/>
        <Home/>
        <About/>
        <Services/>
        <Footer/>
        </>
    );
}

export default App;