import axios from 'axios';
import React, { useState } from 'react';
import Player from './Player';
import { dataProps } from './dataInterface';

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = (props) => {
  const [mp3Urls, setMp3urls] = useState<string[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [receivedData, setReceivedData] = useState<dataProps[]>([]);

  const apiUrl = 'http://127.0.0.1:8000';

  const handleGenre = (e: React.ChangeEvent<HTMLSelectElement>) => {
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
        console.log(receivedData);
      })
      .catch((error) => console.log('error:', error));
      
      
  };


    const handleDownload = (mp3Url:string, fileName:string) => {
      const link = document.createElement('a');
      link.href = mp3Url;
      link.download = fileName;
      link.click();
    };


  return (
    <div className="h-screen flex flex-col items-center justify-start">
      <div className="mt-10">
        <select name="genre" onChange={handleGenre} className="p-2 bg-gray-500 text-white font-semibold rounded">
          <option>Choose</option>
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
        {receivedData.length > 0 && <Player receivedBeats={receivedData} />}
      </div>
      <div className='flex font-mono font-bold p-3'>
        <ul >
          {receivedData?.map((beat:dataProps, i:number) => (
            <li className='border p-2 m-2 border-black flex items-center justify-between' key={i}>{beat.beatName}, {beat.beatBpm}bpm, key: {beat.beatKey}
              <button key={i} onClick={() => handleDownload(beat.beatFile, `${beat.beatName} + ${beat.beatBpm} + ${beat.prodNickNames}`)} className='ml-2'>
                <div className='flex mb-1'>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="black" className="w-5 h-5">
                    <path d="M13.75 7h-3v5.296l1.943-2.048a.75.75 0 011.114 1.004l-3.25 3.5a.75.75 0 01-1.114 0l-3.25-3.5a.75.75 0 111.114-1.004l1.943 2.048V7h1.5V1.75a.75.75 0 00-1.5 0V7h-3A2.25 2.25 0 004 9.25v7.5A2.25 2.25 0 006.25 19h7.5A2.25 2.25 0 0016 16.75v-7.5A2.25 2.25 0 0013.75 7z" />
                  </svg>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
      
      </div>
    </div>
  );
};

export default HomePage;
