import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { getAuth } from 'firebase/auth';
import { database, storage } from './firebase';
import { doc, setDoc, collection, query, updateDoc } from "firebase/firestore";
import {  ref, uploadBytes } from "firebase/storage";


const ProfileEdit = () => {
  const [phoneNumber, setPhone] = useState("");
  const [displayName, setdisplayName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    const docRef = doc(database, "users", auth.currentUser.uid)
    await updateDoc(docRef, {
      phone: phoneNumber,
      address: address,
      name: displayName,
      email: email,
      dob: dob,
    });
  }
  return (
    <>
      <h2 className="text-center mb-4">Update Profile</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="displayName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Name" onChange={(e) => setdisplayName(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="phoneNumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control type="phone" placeholder="phone" onChange={(e) => setPhone(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control type="text" placeholder="Address" onChange={(e) => setAddress(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>email</Form.Label>
          <Form.Control type="text" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="dob">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control type="text" placeholder="DateOfBirth" onChange={(e) => setDob(e.target.value)} />
        </Form.Group>
     
     
        <Button variant="primary w-100" type="Submit">Save</Button>
       
      </Form>



    </>
  );
};

export default ProfileEdit;