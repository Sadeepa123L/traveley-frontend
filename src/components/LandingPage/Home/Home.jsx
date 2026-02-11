import './Home.css'
import '../../Carousel/SpecialtiesCarousel'
import Homeimage from '../../../assets/HomeImg.jpg'
import SpecialtiesCarousel from '../../Carousel/SpecialtiesCarousel';


function Home (){
    return(
       <div className='home'>
            <div className='home-hero'>
                <h1 data-aos="fade-down" data-aos-duration="1000">
                    Traveley<span className='home-span'>Go</span>
                </h1>
                <img 
                    className='home-img' 
                    src={Homeimage} 
                    alt='homeimage'
                    data-aos="zoom-in"
                />
            </div>
            <div className='home-left'>            
                <p data-aos="fade-right" data-aos-delay="400">
                    Traveley connects you with the best travel agencies for unforgettable journeys. 
                    Book packages easily, explore hidden gems, and manage your trips from anywhere, anytime.
                </p>
                <button 
                    className='home-button'
                    data-aos="fade-right"
                    data-aos-offset="10"
                    data-aos-delay="400"
                >
                    Explore Services
                </button>
            </div>
            <div data-aos="fade-up" ><SpecialtiesCarousel /></div>
            
       </div>
    );
}

export default Home;