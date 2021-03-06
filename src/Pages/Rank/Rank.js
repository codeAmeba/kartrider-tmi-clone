import React, { Fragment, useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

import Navigation from '../../Components/Navigation/Navigation';
import Footer from '../../Components/Footer/Footer';
import RankingGuide from './RankingGuide/RankingGuide';
import RankPageInfo from './RankPageInfo/RankPageInfo';
import TopUsers from './TopUsers/TopUsers';
import OtherUsers from './OtherUsers/OtherUsers';

import waveImg from '../../Images/wave.png';
import { urls } from '../../config';

const Rank = () => {
  const [rankingGuideShown, setRankingGuideShown] = useState(false);
  const [indiRankList, setIndiRankList] = useState([]);

  useEffect(() => {
    fetch(urls.indiRankUrl)
      .then((res) => res.json())
      .then((res) => setIndiRankList(res.indi_rank_list));
  }, []);

  console.log(indiRankList);

  return (
    <Fragment>
      {rankingGuideShown && <RankingGuide rankingGuideToggle={() => setRankingGuideShown(!rankingGuideShown)} />}
      <Navigation />
      <RankContainer>
        <RankPageInfo rankingGuideToggle={() => setRankingGuideShown(!rankingGuideShown)} />
        <TopUsers indiRankList={indiRankList} />
        <WaveBg>
          <FirstWave />
          <SecondWave />
        </WaveBg>
        <OtherUsers indiRankList={indiRankList} />
      </RankContainer>
      <Footer />
    </Fragment>
  );
};

const deepPrimaryColor = '#015ecc';

const RankContainer = styled.div`
  position: relative;
  width: 100%;
  max-height: 100%;
  background-color: #fafafa;
  padding-bottom: 50px;
`;

const WaveBg = styled.div`
  width: 100%;
  height: 655px;
  position: relative;
  overflow: hidden;
  background-color: ${deepPrimaryColor};
`;

const FirstWaveAnimation = keyframes`
	0% {
		background-position-x: 0;
	}
	100% {
		background-position-x: 1000px;
	}
`;

const SecondWaveAnimation = keyframes`
	0% {
		background-position-x: 0;
	}
	100% {
		background-position-x: -1000px;
	}
`;

const FirstWave = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 250px;
  background-image: url(${waveImg});
  background-color: ${deepPrimaryColor};
  background-size: 1000px 250px;
  animation: ${FirstWaveAnimation} 15s linear infinite;
  opacity: 0.075;
  animation-delay: 0s;
`;

const SecondWave = styled.div`
  position: absolute;
  bottom: -10px;
  left: 0;
  width: 100%;
  height: 250px;
  background-image: url(${waveImg});
  background-color: ${deepPrimaryColor};
  background-size: 1000px 250px;
  animation: ${SecondWaveAnimation} 5s linear infinite;
  opacity: 0.05;
  animation-delay: -3s;
`;

export default Rank;
