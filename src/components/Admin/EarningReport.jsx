import React, { useState, useEffect } from 'react';
import axios from 'axios';
import firebase from '../firebaseInit'; 
import 'firebase/firestore';
import './componentstyle.css';

const EarningsReport = () => {
  const [earnings, setEarnings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tagID, setTagID] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const entriesPerPage = 20;
  

  
  useEffect(() => {
    const fetchTagID = async () => {
      try {
        const user = firebase.auth().currentUser;
        if (user) {
          const userDoc = await firebase.firestore().collection('users').doc(user.uid).get();
          if (userDoc.exists) {
            const data = userDoc.data();
            setTagID(data.tag);
          }
        }
      } catch (error) {
        console.error('Error fetching tagID from Firebase:', error);
      }
    };

    fetchTagID();
  }, []);

  useEffect(() => {
    if (tagID) {
      const fetchEarnings = async () => {
        try {
          const response = await fetch(`https://shopmore4u.webwhizinfosys.com/earnings/${tagID}`);
          const data = await response.json();
          setEarnings(data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching earnings:', error);
        }
      };

      fetchEarnings();
    }
  }, [tagID]);

  const getStatusStyle = (itemStatus, returnStatus) => {
    if (returnStatus==="1") {
      return { backgroundColor: 'red', statusText: 'Returned' };
    } else if (itemStatus==="1") {
      return { backgroundColor: 'green', statusText: 'Shipped' };
    } else {
      return { backgroundColor: 'gray', statusText: 'Unknown' };
    }
  };

  // handle search
  useEffect(() => {
    setFilteredData(
        earnings.filter(item =>
            item.productName.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );
  }, [searchTerm, earnings]);

const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
};  


  // pagination
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredData.slice(indexOfFirstEntry, indexOfLastEntry);

  const totalPages = Math.ceil(filteredData.length / entriesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // summary boxes
  const totalQuantity = earnings.filter(item => item.returnStatus !== '1').length;
  const totalSales = earnings.filter(item => item.returnStatus !== '1').reduce((acc, item) => acc + item.revenue, 0);
  const totalCommission = earnings.filter(item => item.returnStatus !== '1').reduce((acc, item) => acc + item.fees, 0);
  const returns = earnings.filter(item => item.returnStatus == '1').reduce((acc,item) => acc + item.revenue, 0);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-offset-1 col-md-12">
          <div className="panel">
            <div className="panel-heading">
              <div className="row">
                <div className="col col-sm-3 col-xs-12">
                  <h4 className="title">Earnings <span>Report</span></h4>
                </div>
                <div className="col-sm-9 col-xs-12 text-right">
                  <div className="btn_group">
                    <input type="text" className="form-control" placeholder="Search" value={searchTerm} onChange={handleSearch} />
                    <button className="btn btn-default" title="Reload"><i className="fa fa-sync-alt"></i></button>
                    <button className="btn btn-default" title="Pdf"><i className="fa fa-file-pdf"></i></button>
                    <button className="btn btn-default" title="Excel"><i className="fas fa-file-excel"></i></button>
                  </div>
                </div>
              </div>
              <div className="row summary-boxes">
                <div className="col-md-3 col-sm-6">
                    <div className="summary-box">
                        <h4>Total Quantity</h4>
                        <p>{totalQuantity}</p>
                    </div>
                </div>
                <div className="col-md-3 col-sm-6">
                    <div className="summary-box">
                        <h4>Total Sales</h4>
                        <p>Rs. {totalSales.toFixed(2)}</p>
                    </div>
                </div>
                <div className="col-md-3 col-sm-6">
                    <div className="summary-box">
                        <h4>Commission</h4>
                        <p>Rs. {totalCommission.toFixed(2)}</p>
                    </div>
                </div>
                <div className="col-md-3 col-sm-6">
                    <div className="summary-box">
                        <h4>Returns</h4>
                        <p>Rs. {returns.toFixed(2)}</p>
                    </div>
                </div>
            </div>
            </div>
            <div className="panel-body table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Product Name</th>
                    <th>Date</th>
                    <th>Revenue</th>
                    <th>Fees</th>
                    <th>Status</th>
                    <th>Update Date</th>
                  </tr>
                </thead>
                <tbody>
                  {currentEntries.map((earning, index) => {
                    const { backgroundColor, statusText } = getStatusStyle(earning.itemStatus, earning.returnStatus);
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{earning.productName}</td>
                        <td>{new Date(earning.date).toLocaleDateString()}</td>
                        <td>{earning.revenue}</td>
                        <td>{earning.fees}</td>
                        <td style={{ backgroundColor }}>{statusText}</td>
                        <td>{new Date(earning.updateDate).toLocaleDateString()}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="panel-footer">
              <div className="row">
                <div className="col col-sm-6 col-xs-6">showing <b>{currentEntries.length}</b> out of <b>{earnings.length}</b> entries</div>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarningsReport;
