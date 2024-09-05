import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import firebase from '../firebaseInit'; 
import './componentstyle.css';
import { parseDate } from '../../context/dateparser.mjs';

const OrderReport = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tagID, setTagID] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('currentMonth');
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
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
      const fetchOrders = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/orders/${tagID}`);
          const data = await response.data;
          setOrders(data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching orders:', error);
        }
      };

      fetchOrders();
    }
  }, [tagID]);

  // Filter Earnings
  const filterEarnings = useCallback((orders) => {
    
    if (!Array.isArray(orders) || orders.length === 0) {
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
  
    const filteredOrders = orders.filter((item) => {
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
    return filteredOrders;
  }, [selectedFilter]);
  
  useEffect(() => {
    console.log('Current search term:', searchTerm);
    console.log('Current selected filter:', selectedFilter);
  
    const dateFiltered = filterEarnings(orders);
  
    const searchFiltered = dateFiltered.filter(item => 
      item.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    // Calculate total quantity and sales based on filtered data
    const calculatedTotalQuantity = searchFiltered.filter(item => item.Qty == '1').length;
    const calculatedTotalSales = searchFiltered.reduce((acc, item) => acc + item.Price, 0);

    // Update state with filtered data and calculated totals
    setFilteredData(searchFiltered);
    setTotalQuantity(calculatedTotalQuantity);
    setTotalSales(calculatedTotalSales);
    
    setFilteredData(searchFiltered);
  }, [orders, searchTerm, selectedFilter, filterEarnings]);

  // Handle search
  useEffect(() => {
    setFilteredData(
        orders.filter(item =>
            item.productName.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );
  }, [searchTerm, orders]);

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
                  <h4 className="title">Order <span>Report</span></h4>
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
                <div className="col-md-6 col-sm-6">
                    <div className="summary-box">
                        <h4>Total Quantity</h4>
                        <p>{totalQuantity}</p>
                    </div>
                </div>
                <div className="col-md-6 col-sm-6">
                    <div className="summary-box">
                        <h4>Total Sales</h4>
                        <p>Rs. {totalSales.toFixed(2)}</p>
                    </div>
                </div>
            </div>
            </div>
            <div className="panel-body table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>ASIN</th>
                    <th>Date</th>
                    <th>QTY</th>
                    <th>Price</th>
                    <th>Update Date</th>
                  </tr>
                </thead>
                <tbody>
                {currentEntries.map((order, index) => {
                  const date = new Date(order.date);
                  const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;

                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{order.productName}</td>
                      <td>{order.asin}</td>
                      <td>{formattedDate}</td>
                      <td>{order.Qty}</td>
                      <td>{order.Price}</td>
                      <td>{new Date(order.updateDate).toLocaleDateString()}</td>
                    </tr>
                  );
                })}
                </tbody>
              </table>
            </div>
            <div className="panel-footer">
              <div className="row">
                <div className="col col-sm-6 col-xs-6">Showing <b>{currentEntries.length}</b> out of <b>{orders.length}</b> entries</div>
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

export default OrderReport;
