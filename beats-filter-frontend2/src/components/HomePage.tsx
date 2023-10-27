import axios from 'axios';
import React, { useState } from 'react';
import Player from './Player';
import { dataProps } from './dataInterface';

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = (props) => {
  const [genres, setGenres] = useState<string[]>([]);
  const [receivedData, setReceivedData] = useState<any>(null);

  const apiUrl = 'http://127.0.0.1:8000';

  const handleGenre = (e: any) => {
    const selectedGenre = e.target.value;
    if (!genres.includes(selectedGenre) && selectedGenre !== 'All') {
      setGenres([...genres, selectedGenre]);
    }
  };

  const handleGenresSubmit = () => {
    const filteredGenres = genres.join(',');
    axios
      .get(`${apiUrl}/api/beats/filter/?genres=${filteredGenres}`)
      .then((response) => {
        setReceivedData(response.data);
      })
      .catch((error) => console.log('error:', error));
  };

  return (
    <div className="h-screen flex flex-col items-center justify-start">
      <div className="mt-10">
        <select name="genre" onChange={handleGenre} className="p-2 bg-gray-500 text-white font-semibold rounded">
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
      <div className="font-semibold mt-3">
        <ul>
          {genres.map((genre, index) => (
            <li key={index}>{genre}</li>
          ))}
        </ul>
      </div>
      <div>
        <button onClick={handleGenresSubmit} className="bg-gray-500 rounded font-bold text-white hover:bg-gray-700 text-lg p-2 mt-3">
          Let's Start!
        </button>
      </div>
      <div className="mt-3">
        {receivedData && <Player receivedBeats={receivedData} />}
      </div>
    </div>
  );
};

export default HomePage;
