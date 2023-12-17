import React, { useEffect, useState } from 'react';
import { Howl, Howler } from 'howler';
import { debounce } from 'lodash';
import styles from './styles/Player.module.css'
import { dataProps } from './dataInterface';

interface PlayerProps {
  receivedBeats: dataProps[];
}

const Player: React.FC<PlayerProps> = (props) => {
  Howler.autoUnlock = false;
  const [newSound, setNewSound] = useState<Howl | null>(null);
  const [volume, setVolume] = useState<number>(50);
  const [index, setIndex] = useState<number>(0);
  const [seekValue, setSeekValue] = useState<number>(0);
  
  useEffect(() => {
    if (props.receivedBeats) {
      const mp3Beats = props.receivedBeats || [];
      console.log(props.receivedBeats);
      
      if (newSound && newSound.playing()) {
        newSound.stop();
      }

      if (mp3Beats && mp3Beats[index] && mp3Beats[index]?.beatFile) {
        const newSoundInstance = new Howl({
          src: [mp3Beats[index].beatFile],
          onload: () => {
            console.log('Audio loaded successfully');
          },
          onend: () => {
            console.log('Audio ended');
          },
          onplayerror: (id, error) => {
            console.error('Error playing sound:', error);
          },
        });

        setNewSound(newSoundInstance);
        newSoundInstance.seek(seekValue);
      } else {
        console.log('Beats are not found, please, reload the page');
      }
    }
  }, [props.receivedBeats, index, seekValue]);


  const stopSound = () => {
    if (newSound && newSound?.playing()) {
      newSound.stop();
    }
  };

  const playSound = () => {
    if (newSound && !newSound.playing()) {
      newSound.play();
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.currentTarget.value, 10);
    setVolume(newVolume);
    if (newSound) {
      newSound.volume(newVolume / 100);
    }
  };

  const volumeChange = (newVolume: number) => {
    if (newSound) {
      newSound.volume(newVolume / 100);
    }
  }

  const nextBeat = () => {
    if (Array.isArray(props.receivedBeats) && props.receivedBeats.length > 0) {
      const newIndex = (index + 1) % props.receivedBeats.length;
      setIndex(newIndex);
    }
    setSeekValue(0);
    volumeChange(volume);
    playSound();
  };

  const previousBeat = () => {
    if (props.receivedBeats && props.receivedBeats.length > 0) {
      const newIndex = (index - 1 + props.receivedBeats.length) % props.receivedBeats.length;
      setIndex(newIndex);
    }
    setSeekValue(0);
    stopSound();
  };

  const handleSeekChangeDebounced = debounce((newSeekValue) => {
    setSeekValue(newSeekValue);
    if (newSound) {
      newSound.stop();
      newSound.seek(newSeekValue);
      newSound.play();
      setVolume(volume);
    }
  }, 300);

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSeekValue = parseFloat(e.currentTarget.value);
    handleSeekChangeDebounced(newSeekValue);
    newSound?.play();
  };

  const handleSeekMouseUp = () => {
    if (newSound) {
      newSound.stop();
      newSound.seek(seekValue);
      newSound.play();
    }
  };

  return (
    <div className="w-80 h-60 bg-black rounded-md flex flex-col justify-center items-center space-y-4">
      <div className='text-white text-lg flex font-bold'>
        {props.receivedBeats[index]?.beatName}
      </div>
      <div className="space-x-4">
        <button onClick={playSound} className="bg-white text-black p-2 rounded-full hover:bg-yellow-100">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
        </svg>
        </button>
        <button onClick={stopSound} className="bg-white text-black p-2 rounded-full hover:bg-yellow-100">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M4.5 7.5a3 3 0 013-3h9a3 3 0 013 3v9a3 3 0 01-3 3h-9a3 3 0 01-3-3v-9z" clipRule="evenodd" />
        </svg>
        </button>
        <button onClick={previousBeat} className="bg-white text-black p-2 rounded-full hover:bg-yellow-100">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M9.195 18.44c1.25.713 2.805-.19 2.805-1.629v-2.34l6.945 3.968c1.25.714 2.805-.188 2.805-1.628V8.688c0-1.44-1.555-2.342-2.805-1.628L12 11.03v-2.34c0-1.44-1.555-2.343-2.805-1.629l-7.108 4.062c-1.26.72-1.26 2.536 0 3.256l7.108 4.061z" />
        </svg>
        </button>
        <button onClick={nextBeat} className="bg-white text-black p-2 rounded-full hover:bg-yellow-100">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M5.055 7.06c-1.25-.714-2.805.189-2.805 1.628v8.123c0 1.44 1.555 2.342 2.805 1.628L12 14.471v2.34c0 1.44 1.555 2.342 2.805 1.628l7.108-4.061c1.26-.72 1.26-2.536 0-3.256L14.805 7.06C13.555 6.346 12 7.25 12 8.688v2.34L5.055 7.06z" />
        </svg>
        </button>
      </div>
      <div className="flex items-center">
        <div className='mr-2'>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="white" className="w-5 h-5">
          <path d="M10 3.75a.75.75 0 00-1.264-.546L4.703 7H3.167a.75.75 0 00-.7.48A6.985 6.985 0 002 10c0 .887.165 1.737.468 2.52.111.29.39.48.7.48h1.535l4.033 3.796A.75.75 0 0010 16.25V3.75zM15.95 5.05a.75.75 0 00-1.06 1.061 5.5 5.5 0 010 7.778.75.75 0 001.06 1.06 7 7 0 000-9.899z" />
          <path d="M13.829 7.172a.75.75 0 00-1.061 1.06 2.5 2.5 0 010 3.536.75.75 0 001.06 1.06 4 4 0 000-5.656z" />
      </svg>
        </div>
        <div>
        <input
          type="range"
          min="0"
          max="100"
          step='1'
          value={volume}
          onChange={handleVolumeChange}
          className={styles.sliderVolume}
        />
        </div>
        <div className="text-white ml-4">{volume}</div>
      </div>
      <div className='w-4/5'>
      <input
        type="range"
        min="0"
        max="100"
        value={seekValue}
        onChange={handleSeekChange}
        onMouseUp={handleSeekMouseUp}
        className={styles.sliderTime}
      />
      </div>
    </div>
  );
}

export default Player;
