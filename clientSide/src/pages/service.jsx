import React from 'react';
import Card from 'react-bootstrap/Card';
import { useAuth } from '../store/auth';
import study from '../assets/images/study.png';

function Service() {
  const { services } = useAuth();

  if (!services || !Array.isArray(services)) {
    return <p>No services available.</p>;
  }

  return (
    <div className="page-container">
      <div className="content-wrap">
        <div className="container-fluid">
          <h1>Services</h1>
          <div className="row rowflex">
            {services.map((items, index) => {
              const { price, description, provider, service } = items;
              return (
                <div className="col col-12 col-md-3 col-lg-3 rowflex" key={index}>
                  <Card
                    style={{ width: '28rem', height: '47rem', backgroundColor: '#242424', color: '#f4f3ff' }}
                    className="mb-5 border border-light"
                  >
                    <Card.Img variant="top" src={study} className="img-fluid" />
                    <Card.Body>
                      <div className="d-flex justify-content-between">
                        <p>{provider}</p>
                        <p>{price}</p>
                      </div>
                      <Card.Title className="fw-bold fs-2 py-5">{service}</Card.Title>
                      <Card.Text>{description}</Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default Service;
