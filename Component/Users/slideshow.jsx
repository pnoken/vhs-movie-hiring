import React from 'react';
import { Fade } from 'react-slideshow-image';
import styles from '../../../styles/slideshow.module.css'
// import 'react-slideshow-image/dist/styles.css'



const MovieSlideshow = () => {
    const {slideContainer} = styles;

    const fadeImages = [
    'img/assortedmovies.jpg',
    'img/assortedmovies-2.jpg',
    'img/assortedmovies-3.jpg',
    'img/assortedmovies-4.jpg'
    ];
  return (
    <div className={slideContainer}>
      <Fade>

        <div className="each-fade">
          <div className="image-container">
            <img src={fadeImages[0]} style={{width:"75%", height: "480px"}}/>
          </div>
        </div>

        <div className="each-fade">
          <div className="image-container">
            <img src={fadeImages[1]} style={{width:"75%", height: "480px"}}/>
          </div>
        </div>

        <div className="each-fade">
          <div className="image-container">
            <img src={fadeImages[2]} style={{width:"75%", height: "480px"}}/>
          </div>
        </div>

        <div className="each-fade">
          <div className="image-container">
            <img src={fadeImages[3]} style={{width:"75%", height: "480px"}}/>
          </div>
        </div>

      </Fade>
    </div>
  )
}

export default MovieSlideshow