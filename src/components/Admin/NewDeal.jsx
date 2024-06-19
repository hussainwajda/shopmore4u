import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';

function NewDeal() {
  // ... (component logic remains the same)
  const [link,setLink] = useState('')

  return (
    <Container>
      <h2 className="mt-4 mb-4">Link Generator</h2>

      <Card className="p-4 mb-4"> {/* Added spacing below the card */}
        <h5 className="mb-3">Important Points:</h5>
        <ul className="list-unstyled"> {/* Use unstyled list for custom bullets */}
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

        <Form.Group className="mb-3 mt-4">
          <Form.Label>Enter Link:</Form.Label>
          <Form.Control type="text" value={link} onChange={(e) => setLink(e.target.value)} />
        </Form.Group>

        <h5 className="mb-2">Status: N/A</h5> 

        <Button className='gnrtlnk' >Generate Link</Button>
      </Card>

      <div className="d-flex justify-content-center"> {/* Center the buttons */}
        <Button variant="success" className="me-2">Copy Short URL</Button> 
        <Button variant="danger">Copy Long URL</Button>
      </div>

      <style jsx>{`
        /* ... (responsive styles) */

        .bullet {
          margin-right: 10px; 
        }
        
        li {
          line-height: 1.6;  
        }
        .gnrtlnk{
          background-color: #254E70;
        }

        .gnrtlnk:hover{
          background-color: #62D9D9;
        }
      `}</style>
    </Container>
  );
}

export default NewDeal;
