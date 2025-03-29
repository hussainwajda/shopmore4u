import React, { useState, useEffect } from 'react';
import axios from 'axios';
import getUserName from '../Navbar/getUsername';
import { Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import firebase from '../firebaseInit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import './componentstyle.css';

export default function AmazonLinks() {
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [username, setUsername] = useState('');
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [todayDeals, setTodayDeals] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const entriesPerPage = 10;

  async function fetchProducts() {
    const user = await getUserName();
    if (user) {
      setUsername(user);
      try {
        // server host id = https://shopmore4u.webwhizinfosys.com
        const response = await axios.get(`https://server.shopmore4u.com/products/${user}`);
        setProducts(response.data.sort((a, b) => new Date(b.created) - new Date(a.created)));
        setTotalProducts(response.data.length);
        const today = new Date();
        const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const todayDealsCount = response.data.filter(product => new Date(product.created) >= todayStart).length;
        setTodayDeals(todayDealsCount);
      } catch (error) {
        console.error(error);
      }
    } else {
      setUsername('');
      setProducts([]);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    setFilteredData(
      products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, products]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredData.slice(indexOfFirstEntry, indexOfLastEntry);

  const totalPages = Math.ceil(filteredData.length / entriesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDelete = async (product) => {
    try {
      const idToken = await firebase.auth().currentUser.getIdToken(true);
      await axios.delete(`https://server.shopmore4u.com/products/${product.productId}`, {
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
    <div className="container">
      <div className="row">
        <div className="col-md-offset-1 col-md-12">
          <div className="panel">
            <div className="panel-heading">
              <div className="row">
                <div className="col col-sm-3 col-xs-12">
                  <h4 className="title">Amazon <span>Links</span></h4>
                </div>
                <div className="col-sm-9 col-xs-12 text-right">
                  <div className="btn_group">
                    <input type="text" className="form-control" placeholder="Search" value={searchTerm} onChange={handleSearch} />
                    <button className="btn btn-default" title="Reload" onClick={fetchProducts}><FontAwesomeIcon icon={faSync}/></button>
                  </div>
                </div>
              </div>
              <div className="row summary-boxes">
                <div className="col-md-6 col-sm-6">
                  <div className="summary-box">
                    <h4>Total Deals</h4>
                    <p>{totalProducts}</p>
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div className="summary-box">
                    <h4>Today Amazon Deals</h4>
                    <p>{todayDeals}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="panel-body table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Brand</th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Created</th>
                    <th>Username</th>
                    <th>URLs</th>
                    <th className="text-danger">Del</th>
                  </tr>
                </thead>
                <tbody>
                  {currentEntries.map((product, index) => (
                    <tr key={index}>
                      <td>{product.brand}</td>
                      <td>{product.title}</td>
                      <td>{product.category}</td>
                      <td>{new Date(product.created).toLocaleString()}</td>
                      <td>{product.username}</td>
                      <td>
                        <button className="btn btn-outline-primary btn-sm mr-2 mb-2 rounded" onClick={() => {navigator.clipboard.writeText(product.shortLink+"/"+product.title); alert("Long URL copied to clipboard!");}}> Long</button>
                        <button className="btn btn-outline-secondary btn-sm" onClick={() => {navigator.clipboard.writeText(product.shortLink); alert("short URL copied to clipboard!");}}>Short</button>
                      </td>
                      <td md={2} className="text-end">
                        <button className='btn-danger' variant="outline-danger" onClick={() => {
                          setSelectedProduct(product);
                          setShowModal(true);
                        }}>
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="panel-footer">
              <div className="row">
                <div className="col col-sm-6 col-xs-6">showing <b>{currentEntries.length}</b> out of <b>{products.length}</b> entries</div>
                <div className="col-sm-6 col-xs-6">
                  <ul className="pagination hidden-xs pull-right">
                    {[...Array(totalPages)].map((_, i) => (
                      <li key={i} className={currentPage === i + 1 ? 'active' : ''}>
                        <a onClick={() => paginate(i + 1)}>{i + 1}</a>
                      </li>
                    ))}
                  </ul>
                  <ul className="pagination visible-xs pull-right">
                    <li><a onClick={() => paginate(currentPage - 1)}>&lt;</a></li>
                    <li><a onClick={() => paginate(currentPage + 1)}>&gt;</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Confirm Delete</Modal.Title>
              </Modal.Header>
              <Modal.Body>Are you sure you want to delete this product?</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>No</Button>
                <Button variant="danger" onClick={() => handleDelete(selectedProduct)}>Yes</Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}
