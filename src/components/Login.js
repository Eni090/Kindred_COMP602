import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Alert, Card, Button } from 'react-bootstrap';
import GoogleButton from 'react-google-button';
import { useAuth } from '../context/UserAuthContext';

const Login = () => {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState("");
const {login, googleSignIn} = useAuth();
const navigate = useNavigate();

const handlesubmit = async (e) =>{
    e.preventDefault();
    setError("");
    try{
        await login(email, password);
        navigate("/home");
    }catch(err){
        setError(err.message);
    }
};

const handleGoogleSignIn = async(e) => {
    e.preventDefault();

    try{
        await googleSignIn();
        navigate("/home");
    } catch(err){
        setError(err.message);
    }
}

	return (
        <>
		<Card>
			<Card.Body>
					<h2 className="text-center mb-4">Kindred Login</h2>
                    {error && <Alert variant='danger'>{error}</Alert>}
					<Form onSubmit={handlesubmit}>
						<Form.Group controlId="email">
                            <Form.Label>Email </Form.Label>
							<Form.Control type="email" placeholder="Email address" 
                            onChange={(e) => setEmail(e.target.value)}
                            />
						</Form.Group>

						<Form.Group className = "mb-4" controlId="Password">
                            <Form.Label>Password </Form.Label>
							<Form.Control type="password" placeholder="Password" 
                            onChange={(e) => setPassword(e.target.value)}
                            />
						</Form.Group>	
							<Button variant="primary w-100" type="Submit">
								Log In
							</Button>
					</Form>
					<hr />
					<div>
						<GoogleButton className="g-btn w-100" type="dark" 
                        onClick={handleGoogleSignIn}
                        />
					</div>
                    	</Card.Body>
		</Card>
				<div className="w-100 box mt-2 text-center">
					Don't have an account? <Link to="/signup">Sign up</Link>
				</div>
		
        </>
	);
};

export default Login;
