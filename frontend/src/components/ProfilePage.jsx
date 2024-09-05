import { useState } from "react";
import { Container, Row, Col, Card, Button, Image } from "react-bootstrap";
import "../styles/profilePage.css";

const ProfilePage = () => {
  // State to toggle between listings and sold items
  const [showListings, setShowListings] = useState(true);

  return (
    <Container className="profile-page border-container">
      <Row className="justify-content-center">
        <Col xs={12} md={8} className="text-center">
          <div className="profile-header">
            <Image
              src="../../images/aip.webp"
              roundedCircle
              className="profile-image"
            />
            <h2 className="profile-name">Michael</h2>
            <p className="profile-email">michael.trust@email.com</p>
          </div>
        </Col>
      </Row>

      <Row className="text-center mb-4 ">
        <Col xs={4}>
          <Card className="stats-card card-body-profile">
            <Card.Body>
              <h3>5.0</h3>
              <p className="rating-stars">★★★★★</p>
              <p>Rating</p>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={4}>
          <Card className="stats-card card-body-profile">
            <Card.Body>
              <h3>235</h3>
              <p>Reviews</p>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={4}>
          <Card className="stats-card card-body-profile">
            <Card.Body>
              <h3>112</h3>
              <p>Sold</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col className="text-center mb-4">
          <Button
            variant="outline-primary"
            className="toggle-btn"
            onClick={() => setShowListings(true)}
          >
            Listings
          </Button>
          <Button
            variant="outline-secondary"
            className="toggle-btn"
            onClick={() => setShowListings(false)}
          >
            Sold
          </Button>
        </Col>
      </Row>

      <Row className="listings-section">
        {showListings ? (
          <>
            {/* Current Listings */}
            <Col xs={12} md={6} lg={4} className="listing-card">
              <Card className="equal-height-card">
                <Card.Img variant="top" src="../../images/h1.webp" />
                <Card.Body>
                  <Card.Title>Brookvale Villa</Card.Title>
                  <Card.Text>
                    $320/month <br /> Austin, Texas
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} md={6} lg={4} className="listing-card">
              <Card className="equal-height-card">
                <Card.Img variant="top" src="../../images/h2.webp" />
                <Card.Body>
                  <Card.Title>The Overdale Apartment</Card.Title>
                  <Card.Text>
                    $290/month <br /> Jakarta, Indonesia
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} md={6} lg={4} className="listing-card">
              <Card className="equal-height-card">
                <Card.Img variant="top" src="../../images/h3.webp" />
                <Card.Body>
                  <Card.Title>The Midnight House</Card.Title>
                  <Card.Text>
                    $1290/month <br /> New York, USA
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </>
        ) : (
          <>
            {/* Sold Listings with "Sold" Tag */}
            <Col xs={12} md={6} lg={4} className="listing-card">
              <div className="sold-tag-container">
                <img
                  src="../../images/sold.png"
                  alt="Sold"
                  className="sold-tag"
                />
              </div>
              <Card className="equal-height-card">
                <Card.Img variant="top" src="../../images/h4.webp" />
                <Card.Body>
                  <Card.Title>Sunset Villa</Card.Title>
                  <Card.Text>
                    $750,000 <br /> Miami, Florida
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} md={6} lg={4} className="listing-card">
              <div className="sold-tag-container">
                <img
                  src="../../images/sold.png"
                  alt="Sold"
                  className="sold-tag"
                />
              </div>
              <Card className="equal-height-card">
                <Card.Img variant="top" src="../../images/h5.webp" />
                <Card.Body>
                  <Card.Title>Central Park Apartment</Card.Title>
                  <Card.Text>
                    $1,250,000 <br /> New York, USA
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </>
        )}
      </Row>
    </Container>
  );
};

export default ProfilePage;
