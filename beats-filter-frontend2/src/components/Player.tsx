import React, { useEffect, useState } from 'react';
import { Howl, Howler } from 'howler';
import { debounce } from 'lodash';
import styles from './styles/Player.module.css';

interface PlayerProps {
  receivedBeats: any;
}

const Player: React.FC<PlayerProps> = (props) => {
  Howler.autoUnlock = false;
  const [newSound, setNewSound] = useState<Howl | null>(null);
  const [volume, setVolume] = useState<number>(50);
  const [index, setIndex] = useState<number>(0);
  const [seekValue, setSeekValue] = useState<number>(0);

  const apiUrl = 'http://127.0.0.1:8000';

  useEffect(() => {
    if (props.receivedBeats) {
      const mp3Beats = props.receivedBeats;
      // console.log(apiUrl + mp3Beats[index].beatFile);
      if (newSound && newSound.playing()) {
        newSound.stop();
      }

      if (mp3Beats && mp3Beats[index] && mp3Beats[index].beatFile) {
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
  
        console.log(`Currently playing: ${mp3Beats[index].beatFile} index=${index}`);
      }

      else {
        console.log('beats are not found, please, reload the page');
        
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

  const handleVolumeChange = (e: any) => {
    const newVolume = e.currentTarget.value;
    setVolume(newVolume);
    if (newSound) {
      newSound.volume(newVolume / 100);
    }
  };

  const nextBeat = () => {
    if (props.receivedBeats && props.receivedBeats.length > 0) {
      const newIndex = (index + 1) % props.receivedBeats.length;
      setIndex(newIndex);
    }
    setSeekValue(0);
    stopSound();
    
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
    }
  }, 300);

  const handleSeekChange = (e: any) => {
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
  }

  return (
    <div>
      <div>
        <h1>Player</h1>
        <button onClick={playSound}>play</button>
        <button onClick={stopSound}>stop</button>
        <button onClick={previousBeat}>previous</button>
        <button onClick={nextBeat}>next</button>
      </div>
      <div className={styles.customSlider}>
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={handleVolumeChange}
          className={styles.slider}
        />
        <div className={styles.sliderValue}>{volume}</div>
        <input
          type="range"
          min="0"
          max="100"
          value={seekValue}
          onChange={handleSeekChange}
          onMouseUp={handleSeekMouseUp}
          className={styles.slider}
        />
      </div>
    </div>
  );
}

export default Player;

