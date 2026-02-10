import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Lenis from "lenis";
import 'lenis/dist/lenis.css';

import AppRoutes from "./components/routes/AppRoutes"; 

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

    return (
        <BrowserRouter>
            <AppRoutes /> 
        </BrowserRouter>
    );
}

export default App;