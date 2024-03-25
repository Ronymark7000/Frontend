import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import img1 from '../../../assets/1.png'
import img2 from '../../../assets/2.png'
import img3 from '../../../assets/3.png'
import img4 from '../../../assets/4.png'
import img5 from '../../../assets/5.png'
import './CarousalPage.css' 

function CarouselPage() {
  return (
    <div>
    <Carousel>
    <Carousel.Item>
      <img style={{height:'70vh'}}
        className="d-block w-100"
        src={img4}
        alt="First slide"
      />
      <Carousel.Caption>
        <h3>-- Party Wears --</h3>
        <p>Sparkle and Shine: Elevate Your Party Look with Our Stunning Jewelry Collection!</p>
      </Carousel.Caption>
    </Carousel.Item>

    <Carousel.Item>
      <img style={{height:'70vh'}}
        className="d-block w-100"
        src={img2}
        alt="Second slide"
      />
      <Carousel.Caption>
        <h3>-- Get Your's Now --</h3>
        <p>Dazzle with Elegance: Get Yours Now from Our Diamond Ring Collection!</p>
      </Carousel.Caption>
    </Carousel.Item>

    <Carousel.Item>
      <img style={{height:'70vh'}}
        className="d-block w-100"
        src={img3}
        alt="Third slide"
      />
      <Carousel.Caption style={{ color: '#434343' }}>
        <h3>-- Custom Rings --</h3>
        <p>
          Craft Your Story: Explore Our Custom Ring Collection Today!
        </p>
      </Carousel.Caption>
    </Carousel.Item>

    <Carousel.Item>
      <img style={{height:'70vh'}}
        className="d-block w-100"
        src={img1}
        alt="First slide"
      />
      <Carousel.Caption>
        <h3>--Bracelets--</h3>
        <p>Adorn Your Wrist: Explore Our Exquisite Bracelet Collection Today!</p>
      </Carousel.Caption>
    </Carousel.Item>
    
    <Carousel.Item>
      <img style={{height:'70vh'}}
        className="d-block w-100"
        src={img5}
        alt="First slide"
      />
      <Carousel.Caption>
        <h3>--Classic Rings--</h3>
        <p>Eternal Elegance: Discover Timeless Beauty in Our Classic Rings Collection!</p>
      </Carousel.Caption>
    </Carousel.Item>

  </Carousel>
  </div>
  )
}

export default CarouselPage