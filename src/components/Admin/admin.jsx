import React, { useState, useEffect } from 'react';
import axios from 'axios';
import firebase from '../firebaseInit';
import 'firebase/firestore';
import './componentstyle.css';
import '../login/login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button } from 'react-bootstrap'; // Importing Modal and Button from react-bootstrap

const AdminPanel = () => {
  const [uploadHistory, setUploadHistory] = useState([]);
  const [tagID, setTagID] = useState('');
  const [file, setFile] = useState(null);
  // const [uploadDate, setUploadDate] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);

  useEffect(() => {
    const fetchUploadHistory = async () => {
      try {
        const response = await fetch('https://server.shopmore4u.com/upload-history');
        const data = await response.json();
        setUploadHistory(data);
      } catch (error) {
        console.error('Error fetching upload history:', error);
      }
    };
  
    fetchUploadHistory();
  }, []);
  

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file || !tagID) {
      alert('Please select a file and enter a tag ID');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('tagID', tagID);

    try {
      await axios.post('https://server.shopmore4u.com/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('File uploaded successfully');
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file');
    }
  };

  const handleDelete = async () => {
    if (!selectedEntry) return;

    try {
      await axios.delete(`https://server.shopmore4u.com/upload-history/${selectedEntry._id}`);
      setUploadHistory(uploadHistory.filter(entry => entry._id !== selectedEntry._id));
      setShowModal(false);
      alert('File entry deleted successfully');
    } catch (error) {
      console.error('Error deleting file entry:', error);
      alert('Error deleting file entry');
    }
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-offset-1 col-md-12">
            <div className="panel">
              <div className="panel-heading">
                <div className="row">
                  <div className="col col-sm-3 col-xs-12">
                    <h4 className="title">Admin <span>Panel</span></h4>
                  </div>
                </div>
                <div className="row summary-boxes">
                  <div className="col-md-6 col-sm-6">
                    <div className="summary-box">
                      <p>**Upload excel file having 2 sheets (1st - earning report, 2nd - order report)**</p>
                      <div className="wrap-input100 validate-input">
                        <input 
                          className="input100" 
                          type="text" 
                          name="tag id" 
                          value={tagID} 
                          onChange={(e) => setTagID(e.target.value)}
                          placeholder="Enter Tag id" 
                        />
                        <span className="focus-input100"></span>
                        <span className="symbol-input100">
                          <FontAwesomeIcon icon={faTag} />
                        </span>
                      </div>
                      <input type="file" onChange={handleFileChange} />
                      <button className='btn' onClick={handleUpload}>Upload</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="panel-body table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>File Name</th>
                      <th>TagId</th>
                      <th>Upload Date</th>
                      <th className="text-danger">Del</th>
                    </tr>
                  </thead>
                  <tbody>
                    {uploadHistory.map((entry, index) => (
                      <tr key={index}>
                        <td>{entry.filename}</td>
                        <td>{entry.tagID}</td>
                        <td>{new Date(entry.uploadDate).toLocaleDateString()}</td>
                        <td className="text-end">
                          <Button 
                            className='btn-danger' 
                            onClick={() => {
                              setSelectedEntry(entry);
                              setShowModal(true);
                            }}>
                            🗑️
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this file entry? This action cannot be undone.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminPanel;
