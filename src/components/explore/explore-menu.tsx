import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { speak, ITTS, TTS_PLATTFORM } from '../tts/tts';
import { playAudio } from '../audio/audio';

//Images
import logo1 from '../../static/images/Fosauri.svg';
import logo2 from '../../static/images/Onzua.svg';


const ExploreMenu = () => {
  const [headerText, setHeaderText] = useState('Välj ninja');
  const [introText, setIntroText] = useState('Tryck pil ned eller upp för att navigera. Välj genom att trycka på enter.');

  const audioElementIntro: React.MutableRefObject<HTMLMediaElement | null> = useRef(null);

  let textToSpeak: ITTS = {
    type: TTS_PLATTFORM.GOOGLE,
    lang: 'sv-SE',  
    text: ''
  };
  const handleKey = (event: React.KeyboardEvent) => {
    if (event.keyCode === 38 || event.keyCode === 40) {
      //TODO: Keyboard navigation in menu
    }
  }

  useEffect(() => {
    textToSpeak.text = headerText + ' ' + introText;
    speak(textToSpeak).then((text) => {
      playAudio(audioElementIntro, text);
    });
  }, [headerText, introText, textToSpeak]);

  return (
    <div className="container pad-top-60 text-center">
      <h1>{headerText}</h1>
      <p>{introText}</p>
      <audio id="intro-audio" ref={audioElementIntro} src="" />
      <div className="flex-m flex-wrap-m flex-center-m pad-top-10">
        <div className="explore__menu col-2-l col-12 pad-top-30">
          <ul
            tabIndex={-1}
            role="menu"
            onKeyUp={handleKey}>
              <li role="none">
                <Link role="menuitem" to="/explore/1">
                  <img src={logo1} alt="Fosuari character" className="menu" />
                </Link>
              </li>
              <li role="none">
                <Link role="menuitem" to="/explore/2">
                  <img src={logo2} alt="Onzua character" className="pad-top-20 menu" />
                </Link>
              </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ExploreMenu;
