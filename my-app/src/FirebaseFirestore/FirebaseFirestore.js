
import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import './FirebaseFirestore.css';
import { database } from './config'
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore'

function FirebaseFirestore() {


  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [id, setId] = useState('');
  const [show, setShow] = useState(false);
  const [val, setVal] = useState([]);

  const value = collection(database, 'demo');

  useEffect(() => {
    const getData = async () => {
      const dbVal = await getDocs(value);
      setVal(dbVal.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };
    getData();
  }, []);

  const handleCreate = async () => {
    await addDoc(value, { fname, lname, email, password, mobile });
    setFname('');
    setLname('');
    setEmail('');
    setPassword('');
    setMobile('');
  };

  const handleDelete = async id => {
    const deleteVal = doc(database, 'demo', id);
    await deleteDoc(deleteVal);
  };

  const handleEdit = async (id, name1, name2, email, password, mobile) => {
    setFname(name1);
    setLname(name2);
    setEmail(email);
    setPassword(password);
    setMobile(mobile);
    setId(id);
    setShow(true);
  };

  const handleUpdate = async () => {
    const updateData = doc(database, 'demo', id);
    await updateDoc(updateData, { fname, lname, email, password, mobile });
    setShow(false);
    setFname('');
    setLname('');
    setEmail('');
    setPassword('');
    setMobile('');
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/data'); // Make a GET request to the API endpoint
        setData(response.data); // Update state with fetched data
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      <h1>User Login Page</h1>
      {/* Render the fetched data */}
      <div className="input-container">
        <input value={fname} onChange={e => setFname(e.target.value)} placeholder="First Name" />
        <input value={lname} onChange={e => setLname(e.target.value)} placeholder="Last Name" />
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
        <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" />
        <input value={mobile} onChange={e => setMobile(e.target.value)} placeholder="Mobile Number" />
        {!show ? <button onClick={handleCreate}>Create</button> : <button onClick={handleUpdate}>Update</button>}
      </div>
      <div className="data-container">
        {val.map(values => (
          <div key={values.id} className="data-item">
            <h2>{values.fname} {values.lname}</h2>
            <p>Email: {values.email}</p>
            <p>Password: {values.password}</p>
            <p>Mobile: {values.mobile}</p>
            <button onClick={() => handleDelete(values.id)}>Delete</button>
            <button onClick={() => handleEdit(values.id, values.fname, values.lname, values.email, values.password, values.mobile)}>Edit</button>
          </div>

        ))}
      </div>
    </div>
  );
}

export default FirebaseFirestore;
