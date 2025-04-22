// import BannerImg3 from "../../assets/Bannerimage3.jpg";
//  import BannerImg2 from "../../assets/Bannerimage.jpg";
// import { useNavigate } from "react-router-dom";

// const Banner = () => {
//   const navigate = useNavigate();

//   return (
//     <section className="hero is-fullheight-with-navbar has-background-black  ">
//       <div className="container columns is-vcentered has-background-black py-6">
//         {/* Left Content */}
//         <div className="column  is-6 px-6 fade-in-left">
//           <h1 className="title has-text-white is-size-2 is-size-4-mobile mb-4 glow-text">
//             Elevate Your Brand with <span className="has-text-warning">Celebrity</span> Collaborations
//           </h1>
//           <h2 className="subtitle has-text-grey-light is-size-5 is-size-6-mobile">
//             Reach new heights with star-powered marketing. Let your brand shine with the influence of India's top celebrities.
//           </h2>
//           <button
//             onClick={() => navigate("/campaign")}
//             className="button has-background-warning has-text-black mt-5 px-5 py-3 is-size-5 has-text-weight-bold scale-on-hover"
//           >
//              Create Campaign
//           </button>
//         </div>

//         {/* Right Image Content */}
//         <div className="column is-6 is-flex is-justify-content-center is-align-items-center gap-4 fade-in-right">
//           <div className="image-container is-flex is-justify-content-center">
//             <img
//               src={BannerImg3}
//               alt="Campaign Visual 1"
//               className="circle-img scale-on-hover"
//             />
//             <img
//               src={BannerImg2}
//               alt="Campaign Visual 2"
//               className="circle-img scale-on-hover second-img"
//             />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Banner;

import BannerImg3 from "../../assets/Bannerimage3.jpg";
import BannerImg2 from "../../assets/Bannerimage.jpg";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();
  
  

  return (
    <section className="hero is-fullheight-with-navbar has-background-black banner-wrapper">
      {/* Content */}
      <div
        className="container columns is-vcentered has-background-black pt-6"
        style={{ position: "relative", zIndex: 2 }}
      >
        {/* Left Content */}
        <div className="column is-6 px-6 pt-6 fade-in-left">
          <h1 className="title has-text-white is-size-2 is-size-4-mobile mb-4 glow-text">
          

            Elevate Your Brand with{" "}
            <span className="has-text-warning">Celebrity</span> Collaborations
          </h1>
          <h2 className="subtitle has-text-grey-light is-size-5 is-size-6-mobile">
            Reach new heights with star-powered marketing. Let your brand shine
            with the influence of India's top celebrities.
          </h2>
          <button
            onClick={() => navigate("/campaign")}
            className="button has-background-warning has-text-black mt-5 px-5 py-3 is-size-5 has-text-weight-bold scale-on-hover"
            style={{ cursor: "pointer" }}
          >
            Create Campaign
          </button>
        </div>

        {/* Right Image */}
        <div className="column is-6 is-flex is-justify-content-center is-align-items-center gap-4 fade-in-right">
          <div className="image-container  is-flex is-justify-content-center">
            <img
              src={BannerImg3}
              alt="Campaign Visual 1"
              className="circle-img scale-on-hover"
            />
            <img
              src={BannerImg2}
              alt="Campaign Visual 2"
              className="circle-img scale-on-hover second-img"
            />
          </div>
        </div>
      </div>

      {/* Single Bottom Wave (Static) */}
      <div className="single-wave">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path
            fill="#FFCC00"
            d="M0,224L60,192C120,160,240,96,360,101.3C480,107,600,181,720,197.3C840,213,960,171,1080,144C1200,117,1320,107,1380,101.3L1440,96V320H1380C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320H0Z"
          />
        </svg>
      </div>
    </section>
  );
};

export default Banner;
