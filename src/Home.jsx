import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Button, Container, Row, Col, Card, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';

const Home = () => {
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [menuItems, setMenuItems] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [newMenuItem, setNewMenuItem] = useState({
    category: '',
    name: '',
    description: '',
    price: '',
  });

  const fetchMenuItems = async (category) => {
    const response = await axios.get(`http://localhost:4000/api/menu/${category}`);
    setMenuItems((prev) => ({ ...prev, [category]: response.data }));
  };

  const addMenuItem = async (item) => {
    await axios.post('http://localhost:4000/api/menu', item);
    if (item.category) fetchMenuItems(item.category);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMenuItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    addMenuItem(newMenuItem);
    setShowModal(false);
    setNewMenuItem({ category: '', name: '', description: '', price: '' });
  };

  return (
    <>
      <Navbar style={{ backgroundColor: '#121618' }} expand="lg">
        <Container>
          <Navbar.Brand href="#">
            <img src="brand.png" alt="Logo" style={{ width: '150px', marginRight: '10px' }} />
            <span style={{ color: '#0796EF' }}>DEEP</span>
            <span style={{ color: 'white' }}>NET</span>
            <span style={{ color: '#857878' }}>SOFT</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ background: "white" }} />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto fw-bold">
              <Nav.Link href="/" className="nav-link">HOME</Nav.Link>
              <Nav.Link href="#MENU" className="nav-link">MENU</Nav.Link>
              <Nav.Link href="#MAKE_A_RESERVATION" className="nav-link">MAKE A RESERVATION</Nav.Link>
              <Nav.Link href="#CONTACT" className="nav-link">CONTACT</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div id="MENU" className="menu-section">
        <img src="div1.jpg" alt="Menu background" />
        <div className="menu-content">
          <h1 className='fw-bold'>MENU</h1>
          <p>Please take a look at our menu featuring food, drinks, and brunch. If you'd like to place an order, use the "Order Online" button located below the menu.</p>
        </div>
      </div>

      <div className="menu-buttons d-flex">
        <Button variant="success" className="me-2" onClick={() => setShowModal(true)}>
          Add Menu Item
        </Button>
        {['food', 'drinks', 'brunch'].map((category) => (
          <Button
            key={category}
            style={{
              backgroundColor: selectedMenu === category ? 'blue' : 'black',
              color: selectedMenu === category ? 'white' : 'white',
              border: selectedMenu === category ? 'none' : '1px solid blue',
            }}
            onClick={() => {
              setSelectedMenu(category);
              fetchMenuItems(category);
            }}
          >
            {category.toUpperCase()}
          </Button>
        ))}
      </div>

      {selectedMenu && menuItems[selectedMenu] && (
        <div className="menu-items">
          <h2 style={{ color: '#800020', marginTop: "-100px" }}>{selectedMenu.toUpperCase()}</h2>
          {menuItems[selectedMenu].map((item, index) => (
            <div key={index} className="menu-item">
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p><strong>{item.price}</strong></p>
            </div>
          ))}
        </div>
      )}

      <Container id="CONTACT" className="mt-5 p-5" style={{ backgroundColor: 'black', color: 'white' }}>
        <Row>
          <Col md={4} style={{ backgroundImage: 'url(image.jpg)', backgroundSize: 'cover' }}>
            <Card className="text-center custom-card">
              <Card.Body>
                <Card.Title>Connect with Us</Card.Title>
                <Card.Text>
                  <i className="bi bi-telephone"></i> +91 9567843340<br />
                  <i className="bi bi-envelope"></i> info@deepnetsoft.com
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="text-center custom-card">
              <Card.Body>
                <span style={{ color: '#0796EF' }}>DEEP</span>
                <span style={{ color: 'white' }}>NET</span>
                <span style={{ color: '#857878' }}>SOFT</span>
                <Card.Text className="flex d-flex gap-2">
                  <i className="bi bi-facebook"></i> Facebook<br />
                  <i className="bi bi-twitter"></i> Twitter<br />
                  <i className="bi bi-youtube"></i> YouTube<br />
                  <i className="bi bi-instagram"></i> Instagram
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="text-center custom-card">
              <Card.Body>
                <Card.Title>Find us</Card.Title>
                <Card.Text>
                  <i className="bi bi-geo-alt"></i> First floor, Geo infopark, Kakkanad
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Menu Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                name="category"
                value={newMenuItem.category}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Category</option>
                <option value="food">Food</option>
                <option value="drinks">Drinks</option>
                <option value="brunch">Brunch</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={newMenuItem.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={newMenuItem.description}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                name="price"
                value={newMenuItem.price}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Add Item
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Home;
