import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { FaGoogle, FaGithub, FaFacebook, FaTwitter, FaWhatsapp, FaLinkedin, FaInstagram, FaPinterest, FaUser } from 'react-icons/fa';
import ListGroup from 'react-bootstrap/ListGroup';
import BrandCarousel from '../BrandCarousel/BrandCarousel';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import { GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import './RightSideNav.css'


const RightSideNav = () => {
    const navigate = useNavigate();

    const { user, providerLogin } = useContext(AuthContext);

    const googleProvider = new GoogleAuthProvider()
    const handleGoogleSignIn = () => {
        providerLogin(googleProvider)
            .then(result => {
                const user = result.user;
                console.log(user)
                navigate('/')
            })
            .catch(error => {
                console.error('error', error.message)
            })
    }
    const githubProvider = new GithubAuthProvider()
    const handleGithubSubmit = () => {
        providerLogin(githubProvider)
            .then(result => {
                const user = result.user;
                console.log(user)
                navigate('/')
            })
            .catch(error => {
                console.error('error', error.message)
            })
    }
    return (
        <div>
            <ButtonGroup vertical>
                {
                    user?.uid ?
                        <>
                            <Image rounded style={{ width: '100%', margin: 'auto' }} src={user?.photoURL}></Image>
                            <h3 className='mx-auto mt-2'>{user?.displayName}</h3>
                            <Link variant="outline-primary" className='mx-auto my-2 rounded-2' to='/profile'><Button ><FaUser className='me-2'></FaUser> View Profile</Button>
                            </Link>


                        </>
                        :

                        <>
                            <Button onClick={handleGoogleSignIn} className='mb-2 rounded-2' variant="outline-primary"><FaGoogle></FaGoogle>  Login With Google</Button>
                            <Button onClick={handleGithubSubmit} className='rounded-2' variant="outline-dark"><FaGithub></FaGithub>  Login With Github</Button>
                        </>


                }
            </ButtonGroup>

            <div className='mt-5'>
                <h5>Find us on</h5>


                <ListGroup>
                    <ListGroup.Item className='mb-2 rounded-2' ><FaFacebook></FaFacebook>  Facebook</ListGroup.Item>
                    <ListGroup.Item className='mb-2 rounded-2' ><FaInstagram></FaInstagram>  Instagram</ListGroup.Item>
                    <ListGroup.Item className='mb-2 rounded-2' ><FaTwitter></FaTwitter>  Twitter</ListGroup.Item>
                    <ListGroup.Item className='mb-2 rounded-2' ><FaWhatsapp></FaWhatsapp>  Whatsapp</ListGroup.Item>
                    <ListGroup.Item className='mb-2 rounded-2' ><FaLinkedin></FaLinkedin>  Linkedin</ListGroup.Item>
                    <ListGroup.Item className='mb-2 rounded-2' ><FaPinterest></FaPinterest>  Pinterest</ListGroup.Item>
                </ListGroup>
            </div>


            <div>
                <BrandCarousel></BrandCarousel>
            </div>
        </div>
    );
};

export default RightSideNav;