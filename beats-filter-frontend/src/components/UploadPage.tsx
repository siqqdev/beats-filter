import axios from 'axios';
import React, { useState } from 'react';
import { dataProps } from './dataInterface';

interface UploadPageProps {}

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
    if (beatFile) {
      try {
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
        alert('beat sent')
        setBeatBpm(0);
        setBeatName('');
        setBeatKey('');
        setProdsNicknames('');
        setBeatGenre('Choose');
        setBeatFile(null);
        setMp3LeasePrice(0);
        setWavLeasePrice(0);
        setTrackoutLeasePrice(0);
        setUnlimitedLeasePrice(0);
        setExclusiveLeasePrice(0);
        window.location.reload();
      } catch (error: any) {
        if (error.response) {
          console.error('Server responded with an error:', error.response.data);
        } else if (error.request) {
          console.error('No response received from the server');
        } else {
          console.error('Request error:', error.message);
        }
      }
    } else {
      alert('Fill all forms!');
    }
  };

  return (
    <div className="p-5 flex">
      <div className="w-1/2 pr-4">
        <div className="mb-2 flex">
          <p className="w-1/4 font-bold mt-1">Name</p>
          <input className="w-3/4 p-1 bg-gray-100 hover:bg-gray-200 rounded-md" type="text" value={beatName} onChange={(e) => setBeatName(e.target.value)} />
        </div>
        <div className="mb-2 flex">
          <p className="w-1/4 font-bold mt-1">Key</p>
          <input className="w-3/4 p-1 bg-gray-100 hover:bg-gray-200 rounded-md" type="text" value={beatKey} onChange={(e) => setBeatKey(e.target.value)} />
        </div>
        <div className="mb-2 flex">
          <p className="w-1/4 font-bold mt-1">Bpm</p>
          <input className="w-3/4 p-1 bg-gray-100 hover:bg-gray-200 rounded-md" type="text" placeholder='BPM' onChange={(e) => setBeatBpm(parseInt(e.target.value))} />
        </div>
        <div className="mb-2 flex">
          <p className="w-1/4 font-bold mt-1">Prods nicknames</p>
          <input className="w-3/4 p-1 bg-gray-100 hover:bg-gray-200 rounded-md" type="text" value={prodsNicknames} onChange={(e) => setProdsNicknames(e.target.value)} />
        </div>
        <div className="flex">
          <p className="w-1/4 font-bold mt-1">Choose Genre</p>
          <select name="genre" onChange={(e) => setBeatGenre(e.target.value)} className="w-3/4 p-1.5 rounded-md bg-gray-100 hover:bg-gray-200">
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
      </div>
      <div className="w-1/2">
        <div className="mb-2 flex">
          <p className="w-1/4 mt-1 font-bold ">Mp3 Lease</p>
          <input className="w-3/4 rounded-md p-1 bg-gray-100 hover:bg-gray-200" type="text" placeholder="Mp3 Price" onChange={(e) => setMp3LeasePrice(parseInt(e.target.value))} />
        </div>
        <div className="mb-2 flex">
          <p className="w-1/4 mt-1 font-bold">Wav Lease</p>
          <input className="w-3/4 rounded-md p-1 bg-gray-100 hover-bg-gray-200" type="text" placeholder="Wav Price" onChange={(e) => setWavLeasePrice(parseInt(e.target.value))} />
        </div>
        <div className="mb-2 flex">
          <p className="w-1/4 mt-1 font-bold">Track Out Lease</p>
          <input className="w-3/4 rounded-md p-1 bg-gray-100 hover-bg-gray-200" type="text" placeholder="Trackout Price" onChange={(e) => setTrackoutLeasePrice(parseInt(e.target.value))} />
        </div>
        <div className="mb-2 flex">
          <p className="w-1/4 mt-1 font-bold">Unlimited lease</p>
          <input className="w-3/4 rounded-md p-1 bg-gray-100 hover-bg-gray-200" type="text" placeholder="Unlimited Lease Price" onChange={(e) => setUnlimitedLeasePrice(parseInt(e.target.value))} />
        </div>
        <div className="mb-2 flex">
          <p className="w-1/4 mt-1   font-bold">Exclusive rights</p>
          <input className="w-3/4 rounded-md p-1 bg-gray-100 hover-bg-gray-200" type="text" placeholder="Exclusive rights price" onChange={(e) => setExclusiveLeasePrice(parseInt(e.target.value))} />
        </div>
        <div className='w-1/4'>
        <p className="mb-2 flex justify-left mt-4">Mp3 File</p>
        <div className="flex justify-left ">
          <input className="bg-gray-300 hover-bg-gray-400 rounded-lg hover:bg-slate-400" type="file" onChange={(e) => setBeatFile(e.target.files?.[0] || null)} multiple={false} />
        </div>
        <div className="flex justify-left mt-2">
          <button className="bg-yellow-100 rounded font-bold p-1 hover:bg-yellow-200" onClick={beatSubmit}>Submit</button>
        </div>
        </div>
      </div>
    </div>
  );
}

export default UploadPage;
