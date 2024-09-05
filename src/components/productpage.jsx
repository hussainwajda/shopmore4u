import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltDown } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import {Helmet} from 'react-helmet';
import './productpage.css';
import AdsenseComponent from './adSense';


const ProductPage = () => {
    const { productId} = useParams();
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                // server host id = https://shopmore4u.webwhizinfosys.com
                const response = await axios.get(`http://localhost:5000/product/${productId}`);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product:', error);
                setError('error fetching product');
            }
        };

        fetchProduct();
    }, [productId]);

    if (error) return <div>{error}</div>;
    if (!product) return <div>Loading...</div>;

    const truncatedDescription = product.description.length > 160 
    ? product.description.substring(0, 157) + '...'
    : product.description;
    
    const metaTags = [
      { property: 'og:title', content: product.title },
      { property: 'og:description', content: product.description.substring(0, 30) }, // Adjust description length
      { property: 'og:image', content: product.imageUrl },
      { property: 'og:url', content: window.location.href },
      { property: 'og:type', content: 'product' },
    ];

    return (
      <div className="product-container">
        <Helmet>
        {metaTags.map((meta) => (
          <meta key={meta.name} {...meta} />
        ))}
        </Helmet>
      <div className="product-content">
        <h2 className='responsive-heading'>{product.title}</h2>
        <div className="image-details">
          <img src={product.imageUrl} alt={product.title} className="product-image" />
          <div className="price-button-wrapper">
            <p className="product-price">Price: {product.price}</p>
            <h3 className="product-price">Click on this button to shop on Amazon<FontAwesomeIcon icon={faLongArrowAltDown}></FontAwesomeIcon>
            </h3>
            <button 
              onClick={() => window.location.href = product.affiliateLink}
              className="shop-now-button"
            >
              Shop Now
            </button>
          </div>
        </div>
        <p className='desc'>{product.description}</p>
      </div>
      <AdsenseComponent />
    </div>
    );
};

export default ProductPage;
