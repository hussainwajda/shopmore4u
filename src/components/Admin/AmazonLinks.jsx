import React, { useState, useEffect } from 'react';
import firebase from '../firebaseInit';
import { auth, db } from '../firebaseInit';
import getUserName from '../Navbar/getUsername';

export default function AmazonLinks() {
  // username
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        try {
          const fetchedUsername = await getUserName();
          setUsername(fetchedUsername);
        } catch (error) {
          console.error('Error fetching username:', error.message);
        }
      } else {
        setUser(null);
        setUsername(''); // Clear username if user is logged out
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="p-4 space-y-6">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Welcome, {username} Jii</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Refresh</button>
      </header>

      <section className="mb-4">
        <h2 className="text-2xl font-semibold mb-2">Amazon Deals History</h2>
        <div className="flex space-x-4">
          <div className="flex-1 p-4 bg-white dark:bg-zinc-700 rounded-lg shadow">
            <h3 className="text-lg font-semibold flex items-center">
              Total Deals
            </h3>
            <div className="mt-2 p-4 bg-zinc-100 dark:bg-zinc-600 rounded-lg">
              <p className="text-zinc-500 dark:text-zinc-300">Keep Going...</p>
            </div>
          </div>
          <div className="flex-1 p-4 bg-white dark:bg-zinc-700 rounded-lg shadow">
            <h3 className="text-lg font-semibold flex items-center">
              Today Amazon Deals
            </h3>
            <div className="mt-2 p-4 bg-zinc-100 dark:bg-zinc-600 rounded-lg">
              <p className="text-zinc-500 dark:text-zinc-300">Be Consistent...</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-zinc-700 p-4 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <label htmlFor="entries" className="mr-2">Show</label>
            <select id="entries" className="border rounded px-2 py-1">
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            <span>entries</span>
          </div>
          <div className="flex items-center space-x-2">
            <label htmlFor="search" className="mr-2">Search:</label>
            <input id="search" type="text" className="border rounded px-2 py-1" />
          </div>
        </div>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-100">
              <th className="border p-2">Brand</th>
              <th className="border p-2">Title</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Deal Code</th>
              <th className="border p-2">Created</th>
              <th className="border p-2">Username</th>
              <th className="border p-2">URLs</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2">Toreto</td>
              <td className="border p-2">Toreto Bang Pro 10W Wireless Bluetooth Speaker - Dual Audio Drivers, Powerful Bass Radiator, Fast Ch</td>
              <td className="border p-2">Computers & Accessories</td>
              <td className="border p-2">DFF2024059218EF9E5025</td>
              <td className="border p-2">2024-05-24 14:34:38</td>
              <td className="border p-2">Arbaz bhai</td>
              <td className="border p-2">
                <button className="bg-red-500 text-white px-2 py-1 rounded mr-2">Copy long URL</button>
                <button className="bg-blue-500 text-white px-2 py-1 rounded">Copy short URL</button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}
