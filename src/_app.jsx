import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';



export function App() {
        const [loading, setLoading] = useState(true);
        const [pokemonList, setPokemonList] = useState([]);
        const [nextPokenmonUrl, setnextPokenmonUrl] = useState(null);
        const [showModal, setShowModal] = useState(false);
        const [selectedPokemon, setselectedPokemon] = useState(null);

        async function getAllPokemons(url = "https://content.newtonschool.co/v1/pr/64ccef982071a9ad01d36ff6/pokemonspages1", override = false) {
                const res = await axios.get(url);
                const pokemonData = res.data[0].results;
                setnextPokenmonUrl(res.data[0].next);
                const pokemonListFromApi = [];
                for (const pokemon of pokemonData) {
                        const res = await axios.get(pokemon.url);
                        const data = res.data[0];
                        pokemonListFromApi.push(data);
                }
                console.log(pokemonListFromApi);
                if (!override) {
                        setPokemonList(pokemonListFromApi)
                }
                else {
                        setPokemonList((oldList) => {
                                return oldList.concat(pokemonListFromApi);
                        })
                }
                setLoading(false);
        }

        function handleShowMore() {
                getAllPokemons(nextPokenmonUrl, true);
        }

        useEffect(() => {
                getAllPokemons();
        }, [])

        return loading ? <div>loading</div> : <div id="parent">
                <div id="section">
                        <div class="pokemon">
                                <h2>Pokemon</h2>
                                <h2>Pokemon</h2>
                        </div>

                        <div class="kingdom">
                                <h2>Kingdom</h2>
                                <h2>Kingdom</h2>
                        </div>
                </div>

                <div className="modal" id={!showModal && "inactive"}>
                        <div className="content">
                                {selectedPokemon !== null && selectedPokemon >= 0 && <div className={`details ${pokemonList[selectedPokemon].type}`}>
                                        <div id="pokemon-preview">
                                                <img src={pokemonList[selectedPokemon].image} alt={pokemonList[selectedPokemon].name} />
                                                <div>{pokemonList[selectedPokemon].name}</div>

                                        </div>

                                        <div className='stats'>
                                                <div>
                                                        <h5>Weight:  {pokemonList[selectedPokemon].weight}</h5>
                                                        <h5>Height:  {pokemonList[selectedPokemon].height}</h5>
                                                </div>

                                                <div >
                                                        {pokemonList[selectedPokemon].stats.map((stats, index) => {
                                                                return <h5>Stat{index + 1}: {stats.stat.name}</h5>
                                                        })}
                                                </div>
                                                <div className='some2'>
                                                        {pokemonList[selectedPokemon].stats.map((stats, index) => {
                                                                return <h5>Bs{index + 1}: {stats.base_stat}</h5>
                                                        })}
                                                </div>
                                        </div>

                                        <div id="close" onClick={() => {
                                                setShowModal(false);
                                                setselectedPokemon(null);
                                        }}>x</div>
                                </div>
                                }
                        </div>
                </div>


                <div className="app-container" id="no-scrool">
                        <div className="pokemon-container" >
                                {pokemonList.map((pokemon, index) => {
                                        return <div className={`card ${pokemon.type}`}>
                                                <div className="number">{`#${pokemon.id}`}</div>
                                                <img src={pokemon.image} alt={pokemon.name} />
                                                <div className="details">
                                                        <h3>{pokemon.name}</h3>
                                                        <small>Type: {pokemon.type}</small>
                                                </div>
                                                <div>
                                                        <button className="btn fancy" onClick={() => {
                                                                setShowModal(true);
                                                                setselectedPokemon(index);
                                                        }}>show more</button>
                                                </div>
                                        </div>
                                })}
                        </div>
                </div>


                <div className="center">
                        <div>
                                <button className="btn fancy" onClick={handleShowMore}>Show more</button>
                        </div>
                </div>


        </div>
}

