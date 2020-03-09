import React, { useState, useEffect } from 'react';
import PokeCard from '../PokeCard/PokeCard.jsx';
import './Pokedex.css';


const Pokedex = () => {
    const [pokemones, setPokemones] = useState([]);
    const [filteredPokemones, setFilteredPokemones] = useState([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        setPokeFunction();
        return () => {
            console.log('clean up pkedex')
        }

    }, []);

    const searchPokemon = () => {
        // const arr = pokemones.filter(x => x.name.includes(input));
        // console.log(arr);
        // setFilteredPokemones(arr);
        // setPokeFunction();
    }
    const setPokeFunction = async () => {
        setPokemones([]);
        let arrayPokemones = [];
        for (let i = 1; i < 150; i++) {
            const url = 'https://pokeapi.co/api/v2/pokemon/';
            try {
                let resu = await fetch(url + i);
                const val = await resu.json();
                let types = '';
                let cont = 0;
                if (val.types.length > 0) {
                    val.types.forEach(item => {
                        if (cont != 0) {
                            types += ', ' + item.type.name;
                        } else {
                            types += item.type.name;
                        }
                        cont++;
                    });
                }
                if (input == '') {
                    arrayPokemones.push({
                        name: val.name,
                        id: val.id,
                        type: types,
                        urlImg: val.sprites.front_default
                    });
                } else {
                    if (val.name.includes(input)) {
                        arrayPokemones.push({
                            name: val.name,
                            id: val.id,
                            type: val.types[0].type.name,
                            urlImg: val.sprites.front_default
                        });
                    }
                }

            } catch (exc) {
                console.log(exc);
            }
        }
        setPokemones(arrayPokemones);
    }


    return (
        <div className='pokedexContainer'>
            <h2>Pokemones</h2>
            <div id='searchBar'>
                <input className='form-control' value={input} onChange={e => setInput(e.target.value)} placeholder='Insert pokemon name'></input>
                <button className='btn btn-primary' onClick={() => setPokeFunction()}>Search</button>
            </div>
            <div className='containerPrincipal'>
                <div className='cardsList'>
                    {pokemones.length > 0
                        ?
                        pokemones.map(poke => {
                            return (<PokeCard
                                id={poke.id}
                                urlImg={poke.urlImg}
                                name={poke.name}
                                type={poke.type}
                                isFavs={false}
                            />)
                        })
                        :
                        <p>Cargando pokemones..</p>
                    }
                </div>
            </div>
        </div>
    )
}

export default Pokedex;