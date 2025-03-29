// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faLongArrowAltDown } from '@fortawesome/free-solid-svg-icons';
// import axios from 'axios';
// import {Helmet} from 'react-helmet';
// import useMetaTags from '../hooks/useMetaTags';
// import DocumentMeta from 'react-document-meta';
// import './productpage.css';
// import AdsenseComponent from './adSense';


// const ProductPage = () => {
//     const { productId} = useParams();
//     const [product, setProduct] = useState(null);
//     const [error, setError] = useState(null);
//     // const [pageHtml, setPageHtml] = useState('');
    
//       // useEffect(() => {
//       //   const fetchProductPage = async () => {
//       //     try {
//       //       const response = await axios.get(`https://server.shopmore4u.in/meta/product/${productId}`);
//       //       setPageHtml(response.data);
//       //     } catch (error) {
//       //       console.error('Error fetching product page:', error);
//       //     }
//       //   };
    
//       //   fetchProductPage();
//       // }, [productId]);
    

//     useEffect(() => {
//         const fetchProduct = async () => {
//             try {
//                 // server host id = https://server.shopmore4u.in
//                 const response = await axios.get(`https://server.shopmore4u.in/api/product/${productId}`);
//                 setProduct(response.data);
//             } catch (error) {
//                 console.error('Error fetching product:', error);
//                 setError('error fetching product');
//             }
//         };

//         fetchProduct();


//     }, [productId]);

//     // useMetaTags({
//     //   title: product ? product.title : 'Loading...',
//     //   description: product ? product.description : '',
//     //   image: product ? product.imageUrl : '',
//     // });

//     const meta = product ? {
//       title: product.title || "Product Page",
//       description: product.description || "Product Description",
//       meta: {
//         charset: 'utf-8',
//         name: {
//           keywords: product.tags ? product.tags.join(', ') : '',
//           description: product.description || '',
//         },
//         property: {
//           'og:title': product.title || "Product Page",
//           'og:description': product.description || '',
//           'og:image': product.imageUrl || '',
//           'og:url': `https://shopmore4u.in/product/${product.id || productId}`
//         }
//       }
//     } : {};

//     if (error) return <div>{error}</div>;
//     if (!product) return <div>Loading...</div>;

//     // const truncatedDescription = product.description.length > 160 
//     // ? product.description.substring(0, 157) + '...'
//     // : product.description;
    
//     // const metaTags = [
//     //   { property: 'og:title', content: product.title },
//     //   { property: 'og:description', content: product.description.substring(0, 30) }, // Adjust description length
//     //   { property: 'og:image', content: product.imageUrl },
//     //   { property: 'og:url', content: window.location.href },
//     //   { property: 'og:type', content: 'product' },
//     // ];

//     // <Helmet>
//     //     {metaTags.map((meta) => (
//     //       <meta key={meta.name} {...meta} />
//     //     ))}
//     //     </Helmet>
//   //   <Helmet>
//   //   <title>{product.title}</title>
//   //   <meta name="description" content={product.description} />
//   //   <meta property="og:title" content={product.title} />
//   //   <meta property="og:description" content={product.description} />
//   //   <meta property="og:image" content={product.imageUrl} />
//   // </Helmet>

//     return (
//   <DocumentMeta {...meta}>
//       <div className="product-container">
//       <div className="product-content">
//         <h2 className='responsive-heading'>{product.title}</h2>
//         <div className="image-details">
//           <img src={product.imageUrl} alt={product.title} className="product-image" />
//           <div className="price-button-wrapper">
//             <p className="product-price">Price: {product.price}</p>
//             <h3 className="product-price">Click on this button to shop on Amazon<FontAwesomeIcon icon={faLongArrowAltDown}></FontAwesomeIcon>
//             </h3>
//             <button 
//               onClick={() => window.location.href = product.affiliateLink}
//               className="shop-now-button"
//             >
//               Shop Now
//             </button>
//           </div>
//         </div>
//         <p className='desc'>{product.description}</p>
//       </div>
//       <AdsenseComponent />
//     </div>
//   </DocumentMeta>  
//     );
// };

// export default ProductPage;

import React,{useEffect} from 'react';
import { useParams } from 'react-router-dom';

function ProductRedirect() {
  const { productId } = useParams(); // Extract productId from the route

  // Construct the PHP page URL dynamically using the productId
  const phpPageUrl = `https://shopmore4u.com/php/product-meta.php?productId=${productId}`;

  useEffect(() => {
    // Redirect to PHP page when the component is rendered
    window.location.href = phpPageUrl;
  }, []);

  return null;
}

export default ProductRedirect;
