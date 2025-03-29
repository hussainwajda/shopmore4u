import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import firebase from '../firebaseInit'; 
import 'firebase/firestore';
import './componentstyle.css';
import { parseDate } from '../../context/dateparser.mjs';

const EarningsReport = () => {
  // state declarations start
  const [earnings, setEarnings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tagID, setTagID] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('currentMonth');
  const entriesPerPage = 20;

  // state declarations end

  // Fetch TagID from Firebase
  useEffect(() => {
    const fetchTagID = async () => {
      try {
        const user = firebase.auth().currentUser;
        if (user) {
          const userDoc = await firebase.firestore().collection('users').doc(user.uid).get();
          if (userDoc.exists) {
            const data = userDoc.data();
            console.log(data.tag);
            setTagID(data.tag);
          }
        }
      } catch (error) {
        console.error('Error fetching tagID from Firebase:', error);
      }
    };

    fetchTagID();
  }, []);

  // Fetch Earnings from Server
  useEffect(() => {
    if (tagID) {
      const fetchEarnings = async () => {
        try {
          const response = await fetch(`https://server.shopmore4u.com/earnings/${tagID}`);
          const data = await response.json();
          console.log('Raw API response:', data);
          if (Array.isArray(data) && data.length > 0) {
            setEarnings(data);
          } else {
            console.error('API returned empty or non-array data');
          }
          setLoading(false);
        } catch (error) {
          console.error('Error fetching earnings:', error);
          setLoading(false);
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

  // Filter Earnings
  const filterEarnings = useCallback((earnings) => {
    
    if (!Array.isArray(earnings) || earnings.length === 0) {
      console.warn('filterEarnings received empty or non-array earnings');
      return [];
    }
  
    const now = new Date();
    console.log('Current date for filtering:', now);
  
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    const startOfLastQuarter = new Date(now.getFullYear(), now.getMonth() - 3, 1);
    const last7Days = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
  
    const filteredEarnings = earnings.filter((item) => {
      if (!item.date) {
        console.warn('Item missing date:', item);
        return false;
      }
  
      const itemDate = new Date(parseDate(item.date));
      if (isNaN(itemDate.getTime())) {
        console.warn('Invalid date for item:', item);
        return false;
      }
  
  
      let result;
      switch (selectedFilter) {
        case 'last7Days':
          result = itemDate >= last7Days && itemDate <= now;
          break;
        case 'lastMonth':
          result = itemDate >= startOfLastMonth && itemDate <= endOfLastMonth;
          break;
        case 'lastQuarter':
          result = itemDate >= startOfLastQuarter && itemDate < startOfMonth;
          break;
        case 'currentMonth':
        default:
          result = itemDate >= startOfMonth && itemDate <= now;
      }
      
      console.log('Item included in filter:', result);
      return result;
    });
    return filteredEarnings;
  }, [selectedFilter]);
  
  useEffect(() => {
    console.log('Current search term:', searchTerm);
    console.log('Current selected filter:', selectedFilter);
  
    const dateFiltered = filterEarnings(earnings);
  
    const searchFiltered = dateFiltered.filter(item => 
      item.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setFilteredData(searchFiltered);
  }, [earnings, searchTerm, selectedFilter, filterEarnings]);
  
  // Add this log in the render part of your component
  console.log('Rendering with filteredData:', filteredData);
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handleFilterChange = (e) => {
    setSelectedFilter(e.target.value);
    setCurrentPage(1); // Reset to first page on filter change
  };

  // Pagination
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredData.slice(indexOfFirstEntry, indexOfLastEntry);
  const totalPages = Math.ceil(filteredData.length / entriesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Summary boxes calculations
  const totalQuantity = filteredData.filter(item => item.returnStatus !== '1').length;
  const totalSales = filteredData.filter(item => item.returnStatus !== '1').reduce((acc, item) => acc + item.revenue, 0);
  const totalCommission = filteredData.filter(item => item.returnStatus !== '1').reduce((acc, item) => acc + item.fees, 0);
  const returns = filteredData.filter(item => item.returnStatus === '1').reduce((acc, item) => acc + item.fees, 0);

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
                  <span className='text-white m-2'>Filters:</span>
                    <select className="form-control filter-dropdown" value={selectedFilter} onChange={handleFilterChange}>
                      <option className="text-black" value="currentMonth">Current Month</option>
                      <option className="text-black" value="last7Days">Last 7 Days</option>
                      <option className="text-black" value="lastMonth">Last Month</option>
                      <option className="text-black" value="lastQuarter">Last Quarter</option>
                    </select>
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
                    const date = new Date(earning.date);
                    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{earning.productName}</td>
                        <td>{formattedDate}</td>
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
                <div className="col col-sm-6 col-xs-6">showing <b>{currentEntries.length}</b> out of <b>{filteredData.length}</b> entries</div>
                <div className="col-sm-6 col-xs-6">
                  <ul className="pagination hidden-xs pull-right">
                  {[...Array(totalPages)].map((_, i) => (
                      <li key={i} className={i + 1 === currentPage ? 'active' : ''}>
                        <button className='text-white m-2' onClick={() => paginate(i + 1)}>{i + 1}</button>
                      </li>
                    ))}
                  </ul>
                  <ul className="pagination visible-xs pull-right">
                    <li>
                      <button
                        className='m-2 text-white' onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
                        disabled={currentPage === 1}
                      >
                        &lt;
                      </button>
                    </li>
                    <li>
                      <button
                        className='m-2 text-white' onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
                        disabled={currentPage === totalPages}
                      >
                        &gt;
                      </button>
                    </li>
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