import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import Player from './Player';
import { dataProps } from './dataInterface';


interface HomePageProps {

}

const HomePage: React.FC<HomePageProps> = (props) => {

const [genres, setGenres] = useState<string[]>([]);
const [receivedData, setReceivedData] = useState<any>(null);

const apiUrl = 'http://127.0.0.1:8000'

const handleGenre = (e: any) => {
  const selectedGenre = e.target.value;
  if (!genres.includes(selectedGenre) && selectedGenre !== 'All') {
    setGenres([...genres, selectedGenre]);
  }
}

const handleGenresSubmit = () => {
  const filteredGenres = genres.join(',')
  console.log(filteredGenres);
  console.log(`${apiUrl}/api/beats/filter/?genres=${filteredGenres}`);
  axios
  .get(`${apiUrl}/api/beats/filter/?genres=${filteredGenres}`)
  .then((response) => {
    console.log('data received:', response.data);
    setReceivedData(response.data)
  })
  .catch((error) =>
    console.log('error:', error)
  )
  console.log(receivedData);
  }

  return (
    <div className='flex justify-center'>
        <h1 className='mr-3 text-bold text-black'>Home</h1>
        <br />
        <br /><h2>Let's get started! What you would like to listen to?</h2>
        <div>
        <select name="genre" onChange={handleGenre} 
        className='mr-3
         bg-gray-500
          text-white
           text-bold
           rounded 
            ml-3'>  
          <option value="HyperTrap">Hyper trap</option>
          <option value="NewzJazz">New jazz</option>
          <option value="DarkTrap">Dark trap</option>
          <option value="Trap">Trap</option>
          <option value="Freestyle">Freestyle</option>
          <option value="LofiTrap">Lo-fi trap</option>
          <option value="Edm">Edm</option>
          <option value="Plugg">Plugg</option>
          <option value="JerseyClub">Jersey Club</option>
          <option value="EmoRap">Emo rap</option>
          <option value="Detroit">Detroit</option>
          <option value="RnBTrap">R&B trap</option>
          <option value="Rock">Rock</option>
          <option value="IndieRock">Indie Rock</option>
          <option value="Alternative">Alternative</option>
          <option value="All">All of them!</option>
        </select>
        </div>
        <div>
        <ul>
          {genres.map((genre, index) => (
            <li key={index}>{genre}</li>
          ))}
        </ul>
        </div>
        
        <button onClick={handleGenresSubmit} className=' bg-gray-500 
        rounded 
        font-bold
         text-white
         hover:bg-gray-700 
        py-2 
        px-4
        
        '>Let's Start!</button>
        <div>

        {receivedData && <Player receivedBeats={receivedData} />} 

        </div>
    </div>
  )
};
 export default HomePage;
 
