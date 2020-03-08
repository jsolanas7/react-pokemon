import React, { Fragment } from 'react';
import './Hero.css';
import logo from '../../Assets/pikachu3.png'


const Hero = () => {
    let styles = {
        height: '150px',
         overflow: 'hidden',
         backgroundColor:'white'
    }
    let styles1 = {
        height: '100%',
        width: '100%'
    }
    let styles2 = {
        stroke: 'none',
        fill: '#F0E482'
    }

    return (
        <div className='bigContainer'>
            <div className='heroContainer'>
                <div>
                    <img id='logo' src={logo} />
                </div>
                <div className='rightContainer'>
                    <div>
                        <h1>Welcome to Pokedex</h1>
                    </div>
                    <div>
                        <p>Join our community to find Pokemon's news.</p>
                    </div>
                    <div>
                        <button className='btn btn-primary'>View more</button>
                    </div>
                </div>
            </div>
            <div style={styles} className='heroFooter'>
                <svg viewBox="0 0 500 150" preserveAspectRatio="none" style={styles1}>
                    <path d="M0.00,49.98 C149.99,150.00 271.49,-49.98 500.00,49.98 L500.00,0.00 L0.00,0.00 Z" style={styles2}>
                    </path>
                </svg>
            </div>
        </div>
    )
}

export default Hero;