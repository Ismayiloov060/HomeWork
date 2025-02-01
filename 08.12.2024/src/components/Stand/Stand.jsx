
import StandPhoto from './StandPhoto';
import StandText from './StandText';
import './Stand.css';


const Stand = () => {
    return (
      <div className="arrivals-carousel-container">
        <div className='arrivals-carousel'>
          <div className="arrivals-carousel-left-side">
            <StandText />
          </div>
          <div className="arrivals-carousel-right-side">
            <StandPhoto />
          </div>
        </div>
      </div>
    );
}


export default Stand;