import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

const Login = () => {
    const [error, setError] = useState('');
    const { signIn, setLoading } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';
    const handleSignIn = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                form.reset();
                setError('');
                if (user.emailVerified) {
                    navigate(from, { replace: true })
                }
                else {
                    toast.error('Your Email is Not Verified. Please Verify your Email address')
                }

            })
            .catch(error => {
                console.error('error', error.message);
                setError(error.message);
            })
            .finally(() => {
                setLoading(false)
            })


    }
    return (
        <Form onSubmit={handleSignIn}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control name='email' type="email" placeholder="Enter email" required />

            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control name='password' type="password" placeholder="Password" required />
            </Form.Group>

            <Form.Text className="text-danger mb-3">
                {error}
            </Form.Text>
            <br />
            <Button className="mb-3" variant="primary" type="submit">
                Login
            </Button>
            <br />
            <Form.Text className="text-info">
                You Don't jave an Account? Please <Link to='/register'>Create Account</Link>
            </Form.Text>
        </Form>
    );
};

export default Login;