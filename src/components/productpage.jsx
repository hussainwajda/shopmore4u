import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './productpage.css';

const ProductPage = () => {
    const { productId} = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://103.93.16.46:6200/product/${productId}`);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, [productId]);

    if (!product) return <div>Loading...</div>;

    return (
        <div className="product-container">
      <div className="product-content">
        <h1>{product.title}</h1>
        <div className="image-details">
          <img src={product.imageUrl} alt={product.title} className="product-image" />
          <div className="price-button-wrapper">
            <p className="product-price">Price: {product.price}</p>
            <button 
              onClick={() => window.location.href = product.affiliateLink}
              className="shop-now-button"
            >
              Shop Now
            </button>
          </div>
        </div>
        <p>{product.description}</p>
      </div>
    </div>
    );
};

export default ProductPage;
