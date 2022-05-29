import React, {useState} from 'react'
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert, Card, Button } from "react-bootstrap";
import { useAuth } from '../context/UserAuthContext';

const Signup =() => {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState("");
const {signUp} = useAuth();
const navigate = useNavigate();

const handlesubmit = async (e) =>{
    e.preventDefault();
    setError("");
    try{
        await signUp(email, password);
        navigate("/");
    }catch(err){
        setError(err.message);
    }
}
  return (
    <>
    <Card>
        <Card.Body>
        <h2 className="text-center mb-4">Kindred Signup</h2>
        {error && <Alert variant='danger'>{error}</Alert>}
        <Form onSubmit={handlesubmit}>
          <Form.Group controlId="Email">
              <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email address"
              onChange ={ (e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="Password">
              <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange ={ (e) => setPassword(e.target.value)}
            />
          </Form.Group>
            <Button variant="primary w-100" type="Submit">
              Sign up
            </Button>
        </Form>
      </Card.Body>
      </Card>
      <div className="w-100 box mt-2 text-center">
        Already have an account? <Link to="/">Log In</Link>
      </div>
    </>
  )
}

export default Signup
