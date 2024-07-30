import React, { useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import axios from 'axios';
import firebase from '../firebaseInit'; 

function NewDeal() {
  const [link, setLink] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [longUrl, setLongUrl] = useState('');
  const [affiliateUrl, setAffiliateUrl] = useState('');
  const [status, setStatus] = useState('N/A');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setStatus('Generating link...');
      const idToken = await firebase.auth().currentUser.getIdToken(true);
      console.log(idToken);
      // server host id = https://shopmore4u.webwhizinfosys.com
      const response = await axios.post('http://localhost:5000/generate-link', 
        { url: link },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${idToken}` 
          }
        }
      );
      const { shortLink, longLink, affiliateLink } = response.data;
      setShortUrl(shortLink);
      setLongUrl(longLink);
      setAffiliateUrl(affiliateLink);
      setStatus('Link generated successfully!');
    } catch (error) {
      console.error(error);
      setStatus('Failed to generate link');
    }
  };

  const handleCopy = (url) => {
    if (!navigator.clipboard) {
      // Fallback method for copying text
      const textArea = document.createElement('textarea');
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        alert('URL copied to clipboard');
      } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
      }
      document.body.removeChild(textArea);
      return;
    }
    navigator.clipboard.writeText(url).then(() => {
      alert('URL copied to clipboard');
    });
  };

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
        </Form>
      </Card>

      <div className="d-flex justify-content-center">
        <Button variant="success" className="me-2" onClick={() => handleCopy(shortUrl)}>Copy Short URL</Button>
        <Button variant="danger" onClick={() => handleCopy(longUrl)}>Copy Long URL</Button>
      </div>

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
