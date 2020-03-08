import React, {useEffect, useState} from 'react';
import PokeCard from '../PokeCard/PokeCard.jsx'
import './PokeFavs.css'


const PokeFavs = () => {

    const [pokemones, setPokemones] = useState([
    ]);
    
    useEffect( () => {
         getFavoritePokemons();
         return () => {
             console.log('clean up fav icons');
         }
    }, []);
    
    const getFavoritePokemons = async () => {
        const url = 'https://pokeapi.co/api/v2/pokemon/';
        let arrayFavPokemon = [];
        const ac = new AbortController();

        const localStorageValues = localStorage;
        console.log(Object.keys(localStorageValues)[0]);
        if (Object.keys(localStorageValues).length > 0) {
            for(let i = 0; i < Object.keys(localStorageValues).length; i++){
                let itemName = Object.keys(localStorageValues)[i];
                if(itemName != null && itemName.includes('pokemon')){
                    const id = itemName.replace('pokemon', '');
                    try{
                        let resu = await fetch(url + id);
                        const val = await resu.json();
                        let types = '';
                        let cont = 0;
                        if(val.types.length > 0){
                                val.types.forEach(item => {
                                    if(cont != 0){
                                        types += ', ' + item.type.name;
                                    }else{
                                        types += item.type.name;
                                    }
                                    cont++;
                                });
                            }
                        arrayFavPokemon.push({
                            name: val.name,
                            id: val.id,
                            type: types,
                            urlImg: val.sprites.front_default
                        });
                    }catch(exc){
                        console.log(exc);
                        }
                    
                }
                
            };
            setPokemones(arrayFavPokemon);

        }
    }
    return (

        <div className='cardsList'>
            {pokemones.length > 0
                ?
                pokemones.map(poke => {
                    return (<PokeCard
                        id={poke.id}
                        urlImg={poke.urlImg}
                        name={poke.name}
                        type={poke.type}
                        isFavs = {true}
                        pokemones = {pokemones}
                        setPokemones = {setPokemones}
                    />)
                })
                :
                <h3>No hay pokemones en favorito</h3>
            }

        </div>
    )
}

export default PokeFavs;