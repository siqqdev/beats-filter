import axios from 'axios';
import React, { useState } from 'react';
import { dataProps } from './dataInterface';

interface UploadPageProps {

}

const UploadPage: React.FC<UploadPageProps> = () => {
  const [beatName, setBeatName] = useState<string>('');
  const [beatKey, setBeatKey] = useState<string>('');
  const [beatBpm, setBeatBpm] = useState<number>(0);
  const [prodsNicknames, setProdsNicknames] = useState<string>('');
  const [beatGenre, setBeatGenre] = useState<string>('');
  const [beatFile, setBeatFile] = useState<File | null>(null);
  const [mp3LeasePrice, setMp3LeasePrice] = useState<number>(0);
  const [wavLeasePrice, setWavLeasePrice] = useState<number>(0);
  const [trackoutLeasePrice, setTrackoutLeasePrice] = useState<number>(0);
  const [unlimitedLeasePrice, setUnlimitedLeasePrice] = useState<number>(0);
  const [exclusiveLeasePrice, setExclusiveLeasePrice] = useState<number>(0);

 
  const apiUrl = 'http://127.0.0.1:8000';

  const beatSubmit = async () => {

    if (beatFile) {try {
      
      const formData = new FormData();

      formData.append('beatFile', beatFile);
      formData.append('beatName', beatName);
      formData.append('beatKey', beatKey);
      formData.append('beatBpm', beatBpm.toString());
      formData.append('prodNickNames', prodsNicknames);
      formData.append('beatGenre', beatGenre);  
      formData.append('mp3LeasePrice', mp3LeasePrice.toString());
      formData.append('wavLeasePrice', wavLeasePrice.toString());
      formData.append('trackoutLeasePrice', trackoutLeasePrice.toString());
      formData.append('unlimitedLeasePrice', unlimitedLeasePrice.toString());
      formData.append('exclusiveLeasePrice', exclusiveLeasePrice.toString());

      await axios.post(`${apiUrl}/api/beats/`, formData);
      console.log('Data sent:', formData);
    } catch (error: any) {
      if (error.response) {
        console.error('Server responded with an error:', error.response.data);
      } else if (error.request) {
        console.error('No response received from the server');
      } else {
        console.error('Request error:', error.message);
      }
    }
  } else alert('Fill all froms!');
};

    
  
  

  return (
    <div>
      <h1>UPLOAD PAGE</h1>
      <div>
        <p>Name</p> <input className=' bg-gray-100' type="text" value={beatName} onChange={(e) => setBeatName(e.target.value)} />
        <p>Key</p> <input type="text" value={beatKey} onChange={(e) => setBeatKey(e.target.value)} />
        <p>Bpm</p> <input type="text" value={beatBpm} onChange={(e) => setBeatBpm(parseInt(e.target.value))} />
        <p>Prods nicknames</p> <input type="text" value={prodsNicknames} onChange={(e) => setProdsNicknames(e.target.value)} />
        <p>Choose Genre</p>
        <select name="genre" onChange={(e) => setBeatGenre(e.target.value)}>
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
        <div>
        <h3>Leases</h3>
        <p>If you don't do one of them, just don't type anything in form</p>
        <div>
        <p className=' mt-4'>Mp3 Lease <input className=' bg-gray-300 rounded' type="text" placeholder='Mp3 Price' onChange={(e) => setMp3LeasePrice(parseInt(e.target.value))}/></p>
        <p className=' mt-2'>Wav Lease <input className=' bg-gray-300 rounded' type="text" placeholder='Wav Price' onChange={(e) => setWavLeasePrice(parseInt(e.target.value))}/></p>
        <p className=' mt-2'>Track Out Lease <input className=' bg-gray-300 rounded' type="text" placeholder='Trackout Price' onChange={(e) => setTrackoutLeasePrice(parseInt(e.target.value))}/></p>
        <p className=' mt-2'>Unlimited lease <input className=' bg-gray-300 rounded' type="text" placeholder='Unlimited Lease Price' onChange={(e) => setUnlimitedLeasePrice(parseInt(e.target.value))}/></p>
        <p className=' mt-2'>Exclusive rights <input className=' bg-gray-300 rounded' type="text" placeholder='Exclusive rights price' onChange={(e) => setExclusiveLeasePrice(parseInt(e.target.value))}/></p>
        </div>
        </div>
        <p className=' mt-4'>File</p>
        <input className=' bg-gray-300 hover:bg-gray-400 rounded'type="file" 
        onChange={(e) => setBeatFile(e.target.files?.[0] || null)}
        multiple={false}
         />
        <button className=' bg-gray-300 rounded font-bold p-1 ml-2' onClick={beatSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default UploadPage;




