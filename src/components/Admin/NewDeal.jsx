import React, { useState } from 'react';
import { Container, Form, Button, Card, Modal } from 'react-bootstrap';
import axios from 'axios';
import firebase from '../firebaseInit';

function NewDeal() {
  const [link, setLink] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [longUrl, setLongUrl] = useState('');
  const [affiliateUrl, setAffiliateUrl] = useState('');
  const [status, setStatus] = useState('N/A');
  // const [error, setError] = useState('');
  const [excludedProductError, setExcludedProductError] = useState('');

  const [showBulkModal, setShowBulkModal] = useState(false);
  const [bulkLinks, setBulkLinks] = useState(['']);
  const [bulkResults, setBulkResults] = useState([]);

  const handleSubmit = async (e) => {
    setStatus('Generating link...');
    e.preventDefault();
    try{
    const result = await generateLink(link);
    if (result && !result.error) {
      setShortUrl(result.shortLink);
      setLongUrl(result.longLink);
      setAffiliateUrl(result.affiliateLink);
      setStatus('Link generated successfully!');
    } else if(result.error && result.message.includes('Amazon Associates Program Excluded Products')){
      setStatus("Failed To Generate The Link!!!");
      setExcludedProductError(result.message);
    }else{
      setStatus("Failed To Generate The Link!!!");
    };
  }catch(err) {
    setStatus("Failed To Generate The Link!!!");
    setExcludedProductError('');
  }  
};

  const handleBulkSubmit = async () => {
    setStatus('Generating links...');
    const results = await Promise.all(bulkLinks.map(link => generateLink(link)));
    setBulkResults(results.filter(result => !result.error));
    setShowBulkModal(false);
    setStatus('Links generated successfully!');
  };

  const generateLink = async (url) => {
    try {
      const idToken = await firebase.auth().currentUser.getIdToken(true);
      const response = await axios.post('https://server.shopmore4u.in/generate-link', 
        { url },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${idToken}` 
          }
        }
      );
      const { shortLink, longLink, affiliateLink } = response.data;
      return { shortLink, longLink, affiliateLink };
    } catch (error) {
      console.error(error);
      return { error: 'Failed to generate link' };
  }
};

  const handleCopy = (url) => {
    navigator.clipboard.writeText(url).then(() => {
      alert('URL copied to clipboard');
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

  const handleAddLink = () => setBulkLinks([...bulkLinks, '']);
  const handleRemoveLink = (index) => setBulkLinks(bulkLinks.filter((_, i) => i !== index));

  return (
    <Container>
      <h2 className="mt-4 mb-4">Link Generator</h2>
      <Card className="p-4 mb-4">
        <h5 className="mb-3">Important Points:</h5>
        <ul className="list-unstyled">
          <li className="mb-2">
            <span className="bullet">&#8226;</span> We have several affiliates including AMZ, Flipkart, Myntra, Nykaa, Ajio, Firstcry, and many others.
          </li>
          <li className="mb-2">
            <span className="bullet">&#8226;</span> We will attempt to convert shortened links (such as Bit.ly, Cutt.ly, Ekaro, Ern.li and more). However, if unsuccessful, please use direct links.
          </li>
          <li className="mb-2">
            <span className="bullet">&#8226;</span> Please ensure that you use only the link provided through our portal or bot, and avoid using direct links or links created by any unauthorized methods.
          </li>
          <li className="mb-2">
            <span className="bullet">&#8226;</span> Need assistance? Feel free to email us for support.
          </li>
        </ul>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3 mt-4">
            <Form.Label>Enter Link:</Form.Label>
            <Form.Control type="text" value={link} onChange={(e) => setLink(e.target.value)} />
          </Form.Group>

          <h5 className="mb-2">Status: {status}</h5>
          <Button className="gnrtlnk" type="submit">Generate Link</Button>
          {excludedProductError && <p style={{ color: 'orange' }}>{excludedProductError}</p>}
        </Form>
      </Card>

      <div className="d-flex justify-content-center">
        <Button variant="outline-success" className="me-2" onClick={() => handleCopy(shortUrl)}>Copy Short URL</Button>
        <Button variant="outline-danger" className="me-2" onClick={() => handleCopy(longUrl)}>Copy Long URL</Button>
        <Button variant='outline-primary' onClick={() => setShowBulkModal(true)}>Generate Multiple Links</Button>
      </div>

      <Modal show={showBulkModal} onHide={() => setShowBulkModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Generate Multiple Links</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {bulkLinks.map((link, index) => (
            <Form.Group key={index} className="mb-3">
              <Form.Label>Link {index + 1}</Form.Label>
              <Form.Control 
                type="text" 
                value={link} 
                onChange={(e) => {
                  const newLinks = [...bulkLinks];
                  newLinks[index] = e.target.value;
                  setBulkLinks(newLinks);
                }} 
              />
              <Button variant="outline-danger" className="mt-2" onClick={() => handleRemoveLink(index)}>Remove</Button>
            </Form.Group>
          ))}
          <Button variant="outline-success" onClick={handleAddLink}>Add Another Link</Button>
        </Modal.Body>
        <Modal.Footer>
          <button className='btn btn-outline-danger' onClick={() => setShowBulkModal(false)}>Close</button>
          <button className='btn btn-outline-primary' onClick={handleBulkSubmit}>Generate Links</button>
        </Modal.Footer>
      </Modal>

      <Modal show={bulkResults.length > 0} onHide={() => setBulkResults([])}>
        <Modal.Header closeButton>
          <Modal.Title>Generated Links</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {bulkResults.map((result, index) => (
            <div key={index} className="d-flex justify-content-between mb-3">
              <span>{result.shortLink}</span>
              <Button variant="outline-success" onClick={() => handleCopy(result.shortLink)}>Copy</Button>
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setBulkResults([])}>Close</Button>
        </Modal.Footer>
      </Modal>

      <style jsx>{`
        .bullet {
          margin-right: 10px; 
        }
        
        li {
          line-height: 1.6;  
        }
        .gnrtlnk {
          background-color: #254E70;
        }

        .gnrtlnk:hover {
          background-color: #62D9D9;
        }
      `}</style>
    </Container>
  );
}

export default NewDeal;
