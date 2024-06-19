import React, { useState, useEffect } from 'react';
import axios from 'axios';
import getUserName from '../Navbar/getUsername';
import { Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import firebase from '../firebaseInit';

export default function AmazonLinks() {
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [username, setUsername] = useState('');
  const [products, setProducts] = useState([]);
  const [totalProducts, settotalProducts] = useState(0);
  const [todayDeals, setTodayDeals] = useState(0);


  async function fetchProducts() {
    const user = await getUserName();
    if (user) {
      setUsername(user);
      try {
          const response = await axios.get(`http://localhost:5000/products/${user}`);
          console.log(response.data);
          setProducts(response.data.sort((a, b) => new Date(b.created) - new Date(a.created)));
          settotalProducts(products.length);
          const today = new Date();
          const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
          const todayDealsCount = products.filter(product => new Date(product.created) >= todayStart).length;
          setTodayDeals(todayDealsCount);
        } catch (error) {
          console.error(error);
      }
  } else {
      setUsername('');
      setProducts([]); // Clear products when not logged in
  }
}

useEffect(() => {
    fetchProducts();
});

const handleDelete = async (product) => {
  try {
    const idToken = await firebase.auth().currentUser.getIdToken(true);
    await axios.delete(`http://103.93.16.46:6200/products/${product.productId}`, {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });
    setProducts(products.filter((p) => p.productId !== product.productId));
    setShowModal(false);
  } catch (error) {
    console.error('Error deleting product:', error);
  }
};

  return (
    <div className="container py-4">
      <header className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h4">Welcome, {username} Jii</h1>
        <button className="btn btn-primary" onClick={() => fetchProducts(username)}>Refresh</button>
      </header>

      <section className="mb-4">
        <h2 className="h5 mb-3">Amazon Deals History</h2>
        <div className="d-flex">
          <div className="flex-fill p-3 bg-light rounded shadow-sm mr-3">
            <h3 className="h6">Total Deals</h3>
            <div className="mt-2 p-3 bg-secondary text-white rounded">
              <p>{totalProducts}</p>
            </div>
          </div>
          <div className="flex-fill p-3 bg-light rounded shadow-sm">
            <h3 className="h6">Today Amazon Deals</h3>
            <div className="mt-2 p-3 bg-secondary text-white rounded">
              <p>{todayDeals}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-light p-4 rounded shadow-sm">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="d-flex align-items-center">
            <label htmlFor="entries" className="mr-2">Show</label>
            <select id="entries" className="form-control form-control-sm mr-2">
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            <span>entries</span>
          </div>
          <div className="d-flex align-items-center">
            <label htmlFor="search" className="mr-2">Search:</label>
            <input id="search" type="text" className="form-control form-control-sm" />
          </div>
        </div>
        <table className="table table-bordered">
          <thead className="thead-light">
            <tr>
              <th>Brand</th>
              <th>Title</th>
              <th>Category</th>
              <th>Created</th>
              <th>Username</th>
              <th>URLs</th>
              <th className='text-danger'>Del</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td>{product.brand}</td>
                <td>{product.title}</td>
                <td>{product.category}</td>
                <td>{new Date(product.created).toLocaleString()}</td>
                <td>{product.username}</td>
                <td>
                  <button className="btn btn-danger btn-sm mr-2" onClick={() => navigator.clipboard.writeText(product.originalLink)}>Copy long URL</button>
                  <button className="btn btn-primary btn-sm" onClick={() => navigator.clipboard.writeText(product.shortLink)}>Copy short URL</button>
                </td>
                <td md={2} className="text-end">
                <button className='btn-danger'
                  variant="outline-danger"
                  onClick={() => {
                    setSelectedProduct(product);
                    setShowModal(true);
                  }}
                >
                  🗑️
                </button>
              </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this product?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            No
          </Button>
          <Button variant="danger" onClick={() => handleDelete(selectedProduct)}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
      </section>
    </div>
  );
}
