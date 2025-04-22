import React from 'react'
import Banner from './Banner';
import CelebritySolution from './CelebritySolution';
import CompanyLogo from './CompanyLogo';
// import TopCelebrity from './TopCelebrity';
import Recommendation from './Recommendation';
// import Analytics from '../celebrity/Analytics';
// import CelebrityCard from '../celebrity/CelebrityCard';



const Home = () => {
  return (
    <>
     <Banner/>
     <Recommendation/>
     {/* <Analytics/> */}
     {/* <TopCelebrity/> */}
     
     <CelebritySolution/>
     <CompanyLogo/>
    </>
  )
}

export default Home;
