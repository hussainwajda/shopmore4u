import React, { useState } from 'react';
import axios from 'axios';
import './componentstyle.css';
import '../login/login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag } from '@fortawesome/free-solid-svg-icons';

const AdminPanel = () => {
  const [tagID, setTagID] = useState('');
  const [file, setFile] = useState(null);

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
      await axios.post('https://shopmore4u.webwhizinfosys.com/upload', formData, {
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
                    <div className="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
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
          </div>
        </div>
      </div>
    </div>  
    </div>
  );
};

export default AdminPanel;
