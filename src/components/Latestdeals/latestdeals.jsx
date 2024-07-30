import React, {useState, useEffect} from 'react'
import './latestdeals.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faHeart } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';


const PRODUCTS_PER_PAGE = 12;
export default function LatestDeals() {
	const [products,setProducts] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
  	const [totalProducts, setTotalProducts] = useState(0);
	const fetchProducts = async () => {
		try {
      // https://shopmore4u.webwhizinfosys.com
			const response = await axios.get(`http://localhost:5000/products?page=${currentPage}&limit=${PRODUCTS_PER_PAGE}`);
			setProducts(response.data.products);
			setTotalProducts(response.data.total);
		} catch (error) {
			console.error(error);
		}
	}

	useEffect(() => {
		fetchProducts();
	},[currentPage]);

	const handleNext = () => {
		if (currentPage < Math.ceil(totalProducts / PRODUCTS_PER_PAGE)) {
		  setCurrentPage(currentPage + 1);
		}
	  };
	
	  const handlePrevious = () => {
		if (currentPage > 1) {
		  setCurrentPage(currentPage - 1);
		}
	  };



  return (
    <div className="container-login100">
    <section className="section-products">
      <div className="container">
        <div className="row justify-content-center text-center">
          <div className="col-md-8 col-lg-6">
            <div className="header">
              <h2>Latest Deals</h2>
            </div>
          </div>
        </div>
        <div className="row">
          {products.map((product) => (
            <div className="col-md-6 col-lg-4 col-xl-3" key={product.productId}>
              <div className="single-product">
              <a href={product.shortLink} className="product_link">
                <div className="part-1" style={{ backgroundImage: `url(${product.imageUrl})` }}>
                  {product.discount && <span className="discount">{product.discount} off</span>}
                  {product.isNew && <span className="new">new</span>}
                  <ul>
                    <li><a href="#"><FontAwesomeIcon icon={faShoppingCart} /></a></li>
                    <li><a href="#"><FontAwesomeIcon icon={faHeart} /></a></li>
                  </ul>
                </div>
                </a>
                <a href={product.shortLink} className="product_link">
                <div className="part-2">
                  <h3 className="product-title">{product.title}</h3>
                  <h4 className="product-price">Rs.{product.price}</h4>
                </div>
                </a>
              </div>
            </div>
          ))}
        </div>
		<div className="pagination">
          <button onClick={handlePrevious} className={`prev-button ${currentPage === 1 ? 'disabled' : ''}`} disabled={currentPage === 1}>
            Previous
          </button>
          <button onClick={handleNext} className={`next-button ${currentPage >= Math.ceil(totalProducts / PRODUCTS_PER_PAGE) ? 'disabled' : ''}`}>
            Next
          </button>
        </div>
      </div>
    </section>
  </div> 
  )
}
