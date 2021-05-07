import React from 'react';
import './styles/LandingPage.css';
import { Link } from 'react-router-dom';
import CreateAnonUser from './CreateAnonUser';
import { Box, Button } from '@material-ui/core';
import AllProducts from './AllProducts';

const LandingPage = () => {
  return (
    <div className='landing-page'>
      <CreateAnonUser />
      <div className='carousel-container'>
          <section className='carousel' aria-label='Gallery'>
            <ol className='carousel__viewport'>
              <li id='carousel__slide1' className='carousel__slide'>
              <Link to='/products/16'>
                <div className='carousel__snapper' />
                </Link>
              </li>
              <li id='carousel__slide2' className='carousel__slide'>
              <Link to='/products/18'>
                <div className='carousel__snapper' />
                </Link>
              </li>
              <li id='carousel__slide3' className='carousel__slide'>
              <Link to='/products/34'>
                <div className='carousel__snapper' />
                </Link>
              </li>
              <li id='carousel__slide4' className='carousel__slide'>
              <Link to='/products/28'>
                <div className='carousel__snapper' />
                </Link>
              </li>
            </ol>
          </section>
      </div>
      <div className='welcome'>
        <Box
          className = "box-welcome"
           mx="auto"
           justify = "center"
           style={{ width: '24rem', height: '24rem', marginTop:'160px',backgroundColor: 'transparent', }}
        >
          <Link  style={{ textDecoration: 'none' }} to='/products'>
          <Button
            variant='contained'
            type='submit'
            color='primary'
            style={{ height: '4.5rem', width : '85%', marginTop: '10rem' }}
          >
            Continue as Guest
          </Button>
          </Link>
          <Link  style={{ textDecoration: 'none' }} to='/Login'>
          <Button
            variant='contained'
            type='submit'
            color='secondary'
            style={{ height: '4.5rem', marginTop: '.5rem', width : '85%'}}
          >
           Log In or Create an Account
          </Button>
          </Link>
        </Box>
      
      
      </div>
    </div>
  );
};

export default LandingPage;
