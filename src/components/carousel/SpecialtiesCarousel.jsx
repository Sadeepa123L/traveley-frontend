import './SpecialtiesCarousel.css';

function SpecialtiesCarousel() {
    return(
         <div className='carousel'>
                <div className='group'>
                   <div className='card'>Adventure</div>
                    <div className='card'>Beaches</div>
                    <div className='card'>Wildlife</div>
                    <div className='card'>Heritage</div>
                    <div className='card'>Luxury</div>
                    {/* Duplicate */}
                   <div className='card'>Adventure</div>
                    <div className='card'>Beaches</div>
                    <div className='card'>Wildlife</div>
                    <div className='card'>Heritage</div>
                    <div className='card'>Luxury</div>
                </div>
            </div>
    );
}

export default SpecialtiesCarousel;