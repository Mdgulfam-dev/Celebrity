// import React from "react";
// import logo1 from "../../assets/brandLogo/brandlogo1.jpg";
// import logo2 from "../../assets/brandLogo/brandlogo2.jpg";
// import logo3 from "../../assets/brandLogo/brandlogo3.jpg";
// import logo4 from "../../assets/brandLogo/brandlogo4.jpg";
// import logo5 from "../../assets/brandLogo/brandlogo5.jpg";
// import logo6 from "../../assets/brandLogo/brandlogo6.jpg";
// import logo7 from "../../assets/brandLogo/brandlogo7.jpg";
// import logo8 from "../../assets/brandLogo/brandlogo8.jpg";
// import logo9 from "../../assets/brandLogo/brandlogo9.jpg";
// import logo10 from "../../assets/brandLogo/brandlogo10.jpg";
// import logo11 from "../../assets/brandLogo/brandlogo11.jpg";
// import logo12 from "../../assets/brandLogo/brandlogo12.jpg";
// import logo13 from "../../assets/brandLogo/brandlogo13.jpg";
// import logo14 from "../../assets/brandLogo/brandlogo13.jpg";
// import logo15 from "../../assets/brandLogo/brandlogo15.jpg";
// import logo16 from "../../assets/brandLogo/brandlogo16.jpg";
// import logo17 from "../../assets/brandLogo/brandlogo17.jpg";
// import logo18 from "../../assets/brandLogo/brandlogo18.jpg";
// import logo19 from "../../assets/brandLogo/brandlogo19.jpg";
// import logo20 from "../../assets/brandLogo/brandlogo20.jpg";
// import logo21 from "../../assets/brandLogo/brandlogo21.jpg";
// import logo22 from "../../assets/brandLogo/brandlogo22.jpg";
// import logo23 from "../../assets/brandLogo/brandlogo23.jpg";
// import logo24 from "../../assets/brandLogo/brandlogo24.jpg";



// const CompanyLogo = () => {
//   return (
//     <section className="has-background-black">
//       <div className="container has-text-white py-6 ">
//         <h1 className="is-size-4 has-text-centered ">
//           15,000+ Bollywood Celebrities | 100+ Expert Team Members | Trusted by
//           1500+ Leading Brands
//         </h1>
//       </div>

//       <div>
//         <div className="grid is-gap-3 px-6 py-6">
//           <div className="cell"><img src={logo1} alt="" /></div>
//           <div className="cell"><img src={logo2} alt="" /></div>
//           <div className="cell"><img src={logo3} alt="" /></div>
//           <div className="cell"><img src={logo4} alt="" /></div>
//           <div className="cell"><img src={logo5} alt="" /></div>
//           <div className="cell"><img src={logo6} alt="" /></div>
//           <div className="cell"><img src={logo7} alt="" /></div>
//           <div className="cell"><img src={logo8} alt="" /></div>
//           <div className="cell"><img src={logo9} alt="" /></div>
//           <div className="cell"><img src={logo10} alt="" /></div>
//           <div className="cell"><img src={logo11} alt="" /></div>
//           <div className="cell"><img src={logo12} alt="" /></div>
//           <div className="cell"><img src={logo13} alt="" /></div>
//           <div className="cell"><img src={logo14} alt="" /></div>
//           <div className="cell"><img src={logo15} alt="" /></div>
//           <div className="cell"><img src={logo16} alt="" /></div>
//           <div className="cell"><img src={logo17} alt="" /></div>
//           <div className="cell"><img src={logo18} alt="" /></div>
//           <div className="cell"><img src={logo19} alt="" /></div>
//           <div className="cell"><img src={logo20} alt="" /></div>
//           <div className="cell"><img src={logo21} alt="" /></div>
//           <div className="cell"><img src={logo22} alt="" /></div>
//           <div className="cell"><img src={logo23} alt="" /></div>
//           <div className="cell"><img src={logo24} alt="" /></div>
          
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CompanyLogo;




import React from "react";
import logo1 from "../../assets/brandLogo/brandlogo1.jpg";
import logo2 from "../../assets/brandLogo/brandlogo2.jpg";
import logo3 from "../../assets/brandLogo/brandlogo3.jpg";
import logo4 from "../../assets/brandLogo/brandlogo4.jpg";
import logo5 from "../../assets/brandLogo/brandlogo5.jpg";
import logo6 from "../../assets/brandLogo/brandlogo6.jpg";
import logo7 from "../../assets/brandLogo/brandlogo7.jpg";
import logo8 from "../../assets/brandLogo/brandlogo8.jpg";
import logo9 from "../../assets/brandLogo/brandlogo9.jpg";
import logo10 from "../../assets/brandLogo/brandlogo10.jpg";
import logo11 from "../../assets/brandLogo/brandlogo11.jpg";
import logo12 from "../../assets/brandLogo/brandlogo12.jpg";
import logo13 from "../../assets/brandLogo/brandlogo13.jpg";
import logo14 from "../../assets/brandLogo/brandlogo13.jpg";
import logo15 from "../../assets/brandLogo/brandlogo15.jpg";
import logo16 from "../../assets/brandLogo/brandlogo16.jpg";
import logo17 from "../../assets/brandLogo/brandlogo17.jpg";
import logo18 from "../../assets/brandLogo/brandlogo18.jpg";
import logo19 from "../../assets/brandLogo/brandlogo19.jpg";
import logo20 from "../../assets/brandLogo/brandlogo20.jpg";
import logo21 from "../../assets/brandLogo/brandlogo21.jpg";
import logo22 from "../../assets/brandLogo/brandlogo22.jpg";
import logo23 from "../../assets/brandLogo/brandlogo23.jpg";
import logo24 from "../../assets/brandLogo/brandlogo24.jpg";


const logos = [
  logo1, logo2, logo3, logo4, logo5, logo6,
  logo7, logo8, logo9, logo10, logo11, logo12,
  logo13, logo14, logo15, logo16, logo17, logo18,
  logo19, logo20, logo21, logo22, logo23, logo24,
];

const CompanyLogo = () => {
  return (
    <section className="has-background-black">
      <div className="container has-text-black  py-6">
        <h1 className="is-size-4 has-text-centered has-background-warning has-text-weight-medium fade-in-up mb-5 px-3 py-4 ">
          15,000+ Bollywood Celebrities | 100+ Expert Team Members | Trusted by
          1500+ Leading Brands
        </h1>

        <div className="columns is-multiline is-mobile is-variable is-3 pt-6">
          {logos.map((logo, index) => (
            <div
              key={index}
              className="column is-3-tablet is-1-desktop is-4-mobile fade-in hover-scale"
              style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
            >
              <img
                src={logo}
                alt={`Brand logo ${index + 1}`}
                className="logo-img"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompanyLogo;

// import React from "react";
// import logo1 from "../../assets/brandLogo/brandlogo1.jpg";
// import logo2 from "../../assets/brandLogo/brandlogo2.jpg";
// import logo3 from "../../assets/brandLogo/brandlogo3.jpg";
// import logo4 from "../../assets/brandLogo/brandlogo4.jpg";
// import logo5 from "../../assets/brandLogo/brandlogo5.jpg";
// import logo6 from "../../assets/brandLogo/brandlogo6.jpg";
// import logo7 from "../../assets/brandLogo/brandlogo7.jpg";
// import logo8 from "../../assets/brandLogo/brandlogo8.jpg";
// import logo9 from "../../assets/brandLogo/brandlogo9.jpg";
// import logo10 from "../../assets/brandLogo/brandlogo10.jpg";
// import logo11 from "../../assets/brandLogo/brandlogo11.jpg";
// import logo12 from "../../assets/brandLogo/brandlogo12.jpg";
// import logo13 from "../../assets/brandLogo/brandlogo13.jpg";
// import logo14 from "../../assets/brandLogo/brandlogo13.jpg";
// import logo15 from "../../assets/brandLogo/brandlogo15.jpg";
// import logo16 from "../../assets/brandLogo/brandlogo16.jpg";
// import logo17 from "../../assets/brandLogo/brandlogo17.jpg";
// import logo18 from "../../assets/brandLogo/brandlogo18.jpg";
// import logo19 from "../../assets/brandLogo/brandlogo19.jpg";
// import logo20 from "../../assets/brandLogo/brandlogo20.jpg";
// import logo21 from "../../assets/brandLogo/brandlogo21.jpg";
// import logo22 from "../../assets/brandLogo/brandlogo22.jpg";
// import logo23 from "../../assets/brandLogo/brandlogo23.jpg";
// import logo24 from "../../assets/brandLogo/brandlogo24.jpg";

// const logos = [
//   logo1, logo2, logo3, logo4, logo5, logo6,
//   logo7, logo8, logo9, logo10, logo11, logo12,
//   logo13, logo14, logo15, logo16, logo17, logo18,
//   logo19, logo20, logo21, logo22, logo23, logo24,
// ];

// const CompanyLogo = () => {
//   return (
//     <section className="has-background-black py-6">
//       <div className="container">
//         <h1 className="title has-text-white has-text-centered is-size-4 mb-5 px-4 fade-in">
//           15,000+ Bollywood Celebrities | 100+ Expert Team Members | Trusted by 1500+ Leading Brands
//         </h1>

//         <div className="columns is-multiline is-mobile is-variable is-2">
//           {logos.map((logo, index) => (
//             <div
//               key={index}
//               className="column is-4-mobile is-3-tablet is-2-desktop has-text-centered fade-in delay"
//             >
//               <figure className="image is-96x96 is-inline-block logo-hover">
//                 <img
//                   src={logo}
//                   alt={`Brand logo ${index + 1}`}
//                   style={{
//                     objectFit: "contain",
//                     height: "100%",
//                     width: "100%",
//                   }}
//                 />
//               </figure>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CompanyLogo;
