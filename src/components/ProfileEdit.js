import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { getAuth } from 'firebase/auth';
import { database, storage } from './firebase';
import { doc, setDoc, collection, query, updateDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { Link } from "react-router-dom";

import Header from "../Header";


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
    }).then(() => {
      window.location.href = "/profile"
    });
  }
  return (
    <>
      <Header />
      <h2 className="update_profile_title">Update Profile</h2>
      <Form onSubmit={handleSubmit} className="edit_profile_container">
          <Form.Group controlId="displayName" className = "edit_field_name">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Name" onChange={(e) => setdisplayName(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="phoneNumber" className = "edit_field_phone">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control type="phone" placeholder="Enter Phone" onChange={(e) => setPhone(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="address" className = "edit_field_address">
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" placeholder="Enter Address" onChange={(e) => setAddress(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="email" className = "edit_field_email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="text" placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="dob" className = "edit_field_dob">
            <Form.Label >Date of Birth</Form.Label>
            <Form.Control type="text" placeholder="Enter Birth Date" onChange={(e) => setDob(e.target.value)} />
          </Form.Group>
        <Button variant="primary w-100" type="Submit" className="profile_edit_btn">Save</Button>
      </Form>


    </>
  );
};

export default ProfileEdit;