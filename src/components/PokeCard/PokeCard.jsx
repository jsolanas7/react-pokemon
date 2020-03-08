import React from 'react';
import './PokeCard.css';
import image from '../../Assets/pikachu3.png'
import { useState } from 'react';
import { useEffect } from 'react';


const PokeCard = ({ id, name, type, urlImg, isFavs, pokemones, setPokemones }) => {
    const [isActive, setActive] = useState({
        status: true
    });
    useEffect(() => {
        if (localStorage.getItem('pokemon' + id) != null) {
            changeClass();
        }
        return () => {
            console.log('clean up card')
        }
    }, []);
    const [styles, setStyles] = useState({
        classes: 'btn btn-primary',
        buttonText: 'Add favorite'
    });
    const setInLocalStorage = () => {
        localStorage.setItem('pokemon' + id, JSON.stringify(id))
    }
    const removeFromLocalStorage = () => {
        localStorage.removeItem('pokemon' + id);
    }
    const changeClass = () => {
        if (!isFavs) {
            if (!isActive.status) {
                setActive({
                    status: true
                })
                removeFromLocalStorage();
                setStyles({
                    classes: 'btn btn-primary',
                    buttonText: 'Add favorite'
                })
            } else {
                setActive({
                    status: false
                })
                setInLocalStorage();
                setStyles({
                    classes: 'btn btn-danger',
                    buttonText: 'Remove'
                })
            }
        } else {
            if (!isActive.status) {
                setActive({
                    status: true
                })
                removeFromLocalStorage();
                setPokemones(pokemones.filter(x => x.id != id));
            }
            else {
                setActive({
                    status: false
                })
                setStyles({
                    classes: 'btn btn-danger',
                    buttonText: 'Remove'
                })
            }
        }

    }

    return (
        <div className='cardContainer'>
            <div>
                <img src={urlImg} />
                <h4>{name}</h4>
                <p>Type: {type}</p>
                <button className={styles.classes} onClick={() => changeClass()}>{styles.buttonText}</button>
            </div>
        </div>
    )
}

export default PokeCard;