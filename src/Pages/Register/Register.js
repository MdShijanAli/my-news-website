import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

const Register = () => {
    const [error, setError] = useState('');
    const [accepted, setAccepted] = useState(false);

    const { createUser, verifyEmail, updateUserProfile } = useContext(AuthContext);

    const handleAccepted = (event) => {
        setAccepted(event.target.checked);
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const photoURL = form.photoURL.value;
        const email = form.email.value;
        const password = form.password.value;

        createUser(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                setError('');
                form.reset();
                hanleUpdateUserProfile(name, photoURL);
                handleEmailVerification();
                toast.success('Please Verify Your Email Address!!! If don;t find please check spam folder')


            })
            .catch(error => {
                console.error('error', error.message)
                setError(error.message);
            })
        console.log(name, photoURL, email, password);
    }
    const hanleUpdateUserProfile = (name, photoURL) => {
        const profile = {
            displayName: name,
            photoURL: photoURL
        }
        updateUserProfile(profile)
            .then(() => {
                console.log('Name and Photo Updated')
            })
            .catch(error => {
                console.error('error', error.message)
            })

    }

    const handleEmailVerification = () => {
        verifyEmail()
            .then(() => {
                console.log('Verified')
            })
            .catch(error => {
                console.error(error);
            })
    }
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Your Name</Form.Label>
                <Form.Control name='name' type="text" placeholder="Enter Name" required />

            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPhoto">
                <Form.Label>Photo URL</Form.Label>
                <Form.Control name='photoURL' type="text" placeholder="Enter Photo URL" required />

            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control name='email' type="email" placeholder="Enter email" required />

            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control name='password' type="password" placeholder="Password" required />
            </Form.Group>

            <Form.Text className="text-danger">
                {error}
            </Form.Text>
            <br />
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check
                    type="checkbox"
                    onClick={handleAccepted}
                    label={<>Accept <Link to='/terms'>Tearms and Condition</Link></>} />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={!accepted}>
                Register
            </Button>
            <br />
            <Form.Text className="text-dark fw-bold">
                Already have an Account? Please <Link to='/login'>Login</Link>
            </Form.Text>
        </Form>
    );
};

export default Register;