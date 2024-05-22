import React, { useRef } from 'react'
import './topcat.css';
import { Container, Row, Col } from 'react-bootstrap';
import homeapp from '../Assets/catg/laundry-machine.png'
import bpc from '../Assets/catg/mirror.png'
import mobile from '../Assets/catg/smartphone.png'
import fashion from '../Assets/catg/high-heel.png'
import kitchen from '../Assets/catg/knife.png'
import toy from '../Assets/catg/duck-toy.png'

export default function Topcat() {
  const categoryref = useRef(null);
  return (
    <>
      <Container ref={categoryref} className="topcat-container">
      <div class="row justify-content-center text-center">
						<div class="col-md-8 col-lg-6">
								<div class="header">
										<h2>Top Categories</h2>
								</div>
						</div>
				</div>
      <Row className="topcat-row">
        <Col xs={6} sm={4} md={2}>
          <div className="category-item">
            <img src={homeapp} alt="Category 1" width="100" height="100" />
            <p>Home and appliances</p>
          </div>
        </Col>
        <Col xs={6} sm={4} md={2}>
          <div className="category-item">
            <img src={bpc} alt="Category 2" width="100" height="100" />
            <p>Beauty and Cosmetics</p>
          </div>
        </Col>
        <Col xs={6} sm={4} md={2}>
          <div className="category-item">
            <img src={mobile} alt="Category 3" width="100" height="100" />
            <p>Mobile and acces.</p>
          </div>
        </Col>
        <Col xs={6} sm={4} md={2}>
          <div className="category-item">
            <img src={fashion} alt="Category 4" width="100" height="100" />
            <p>Clothing  & Acces.</p>
          </div>
        </Col>
        <Col xs={6} sm={4} md={2}>
          <div className="category-item">
            <img src={kitchen} alt="Category 5" width="100" height="100" />
            <p>Home and Kitchen</p>
          </div>
        </Col>
        <Col xs={6} sm={4} md={2}>
          <div className="category-item">
            <img src={toy} alt="Category 6" width="100" height="100" />
            <p>Toy and Games</p>
          </div>
        </Col>
      </Row>
    </Container>
    </>
  )
}
