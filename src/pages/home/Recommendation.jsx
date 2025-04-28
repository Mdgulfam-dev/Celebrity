// <------------------------------------------using mock data------------------->
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// const Recommendation = () => {
//   const [mockData, setMockData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchAndStoreProfiles = async () => {
//       try {
//         //  Fetching mock data
//         const response = await fetch("http://localhost:3000/mockData.json");
//         //  const response = await fetch("http://localhost:4000/campaign"); //for testing
//         if (!response.ok)
//           throw new Error(`HTTP error! Status: ${response.status}`);

//         const data = await response.json();
//         // console.log(" Fetched Data:", data);
//         setMockData(data);

//         //  Sending data to backend
//         console.log(" Sending data to backend...");
//         const storeResponse = await fetch(
//           "http://localhost:4000/api/recommend/store-profiles",
//           {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(data),
//           }
//         );

//         if (!storeResponse.ok)
//           throw new Error(`Server Error: ${storeResponse.status}`);
//         const storeData = await storeResponse.json();
//         console.log(" Store Response:", storeData);
//       } catch (err) {
//         console.error(" Error:", err);
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAndStoreProfiles();
//   }, []);

//   const handleInterestedClick = async (name) => {
//     try {
//       const response = await fetch(
//         "http://localhost:4000/api/user/send-message",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ to: "+11234567890", name }),
//         }
//       );

//       if (!response.ok) throw new Error(`Server Error: ${response.status}`);

//       const data = await response.json();
//       // console.log(` Message sent to ${name}:`, data.message);
//     } catch (error) {
//       console.error(" Fetch error:", error);
//     }
//   };

//   if (loading) return <p className="has-text-white">Loading...</p>;
//   if (error) return <p className="has-text-danger">Error: {error}</p>;
//   if (mockData.length === 0)
//     return <p className="has-text-white">No data available.</p>;

//   const sliderSettings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     responsive: [
//       { breakpoint: 1024, settings: { slidesToShow: 2 } },
//       { breakpoint: 768, settings: { slidesToShow: 1 } },
//     ],
//   };

//   return (
//     <section className="has-background-black has-text-white py-5">
//       <div className="container">
//         <h1 className="is-size-4 px-4">Recommendations</h1>
//         <Slider {...sliderSettings}>
//           {mockData.map((person, index) => (
//             <div key={index} className="px-2">
//               <div className="card mx-2 my-6">
//                 <header className="card-header is-size-3">
//                   <p className="card-header-title is-centered py-5 is-clickable has-text-primary"
//                   onClick={() => navigate(`/celebrity/${encodeURIComponent(person._id || person.name)}`)}>
//                     {person.name}
//                   </p>
//                 </header>
//                 <div className="card-content">
//                   <div className="content">
//                     <h3 className="title is-5">
//                       Demographics & Audience Match
//                     </h3>
//                     <p>
//                       <strong>Age:</strong> {person.age || "N/A"}
//                     </p>
//                     <p>
//                       <strong>Location:</strong> {person.location || "N/A"}
//                     </p>
//                     <p>
//                       <strong>Gender:</strong> {person.gender || "N/A"}
//                     </p>

//                     <h3 className="title is-5 mt-4">Engagement & Reach</h3>
//                     <p>
//                       <strong>Followers:</strong> {person.followers || "N/A"}
//                     </p>
//                     <p>
//                       <strong>Engagement Rate:</strong>{" "}
//                       {person.engagementRate || "N/A"}
//                     </p>

//                     <h3 className="title is-5 mt-4">
//                       Historical & Performance Metrics
//                     </h3>
//                     <p>
//                       <strong>Previous Endorsements:</strong>{" "}
//                       {person.previousEndorsements || "N/A"}
//                     </p>
//                     <p>
//                       <strong>ROI:</strong> {person.averageROI || "N/A"}
//                     </p>
//                   </div>
//                 </div>

//                 <footer className="card-footer is-gap-4">
//                  <button
//                     className="button is-primary card-footer-item"
//                     onClick={() => handleInterestedClick(person.name)}
//                   >
//                     Interested
//                   </button>
//                   <button
//                     className="button is-link card-footer-item"
//                   onClick={() => navigate(`/celebrity/${encodeURIComponent(person._id || person.name)}`)}>

//                     View Profile
//                   </button>
//                 </footer>
//               </div>
//             </div>
//           ))}
//         </Slider>
//       </div>
//     </section>
//   );
// };

// export default Recommendation;

// <------------------------------------------using mock data------------------->

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Recommendation = () => {
//   const [profiles, setProfiles] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//  useEffect(() => {
//   const fetchAndStoreRecommendations = async () => {
//     try {
//       const cachedProfiles = localStorage.getItem("recommendationResult");
//       const timestamp = localStorage.getItem("recommendationTimestamp");
//       const expired = !timestamp || Date.now() - parseInt(timestamp, 10) > 5 * 60 * 1000;

//       if (cachedProfiles && !expired) {
//         setProfiles(JSON.parse(cachedProfiles));
//         return setLoading(false);
//       }

//       // Read campaign data
//       const localStorageData = localStorage.getItem("campaignFormData");
//       const parsedData = localStorageData ? JSON.parse(localStorageData) : null;

//       // Fallback data
//       const payload = parsedData || {
//         description: "Promote a premium skincare brand targeting men in metro cities",
//         persona: "Elegant, trustworthy, luxurious",
//         involvementType: "Brand Ambassador",
//         audience: "Women aged 25-40 in urban areas",
//         budget: 2000000,
//       };

//       const response = await fetch("http://localhost:4000/campaign", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       const data = await response.json();
//       const suggestions = Array.isArray(data.result?.suggested_actors)
//         ? data.result.suggested_actors
//         : [];

//       setProfiles(suggestions);

//       // Save new recommendations to localStorage and DB
//       localStorage.setItem("recommendationResult", JSON.stringify(suggestions));
//       localStorage.setItem("recommendationTimestamp", Date.now().toString());

//       await fetch("http://localhost:4000/api/recommend/store-profiles", {

//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(suggestions),
//       });
//     } catch (err) {
//       console.error("Fetch error:", err);
//       setError("Failed to load recommendations.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchAndStoreRecommendations();
// }, []);

// //   const handleInterestedClick = async (name) => {
// //   try {
// //     const res = await fetch("http://localhost:4000/api/user/send-message", {
// //       method: "POST",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify({ to: "+11234567890", name }),
// //     });

// //     if (res.ok) {
// //       toast.success("Marked as Interested!");
// //     } else {
// //       toast.error("Failed to send message");
// //     }
// //   } catch (err) {
// //     console.error("Message error:", err);
// //     toast.error("Something went wrong");
// //   }
// // };

// const handleInterestedClick = async (name) => {
//   try {
//     const res = await fetch("http://localhost:4000/api/interest/track-interest", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ name }), // You can also send userId and campaignId
//     });

//     if (res.ok) {
//       toast.success("Marked as Interested!");
//     } else {
//       toast.error("Failed to update click count.");
//     }

//     // Optional: Send message
//     await fetch("http://localhost:4000/api/user/send-message", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ to: "+11234567890", name }),
//     });
//   } catch (err) {
//     console.error("Message error:", err);
//     toast.error("Something went wrong");
//   }
// };

//   const sliderSettings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     responsive: [
//       { breakpoint: 1024, settings: { slidesToShow: 2 } },
//       { breakpoint: 768, settings: { slidesToShow: 1 } },
//     ],
//   };

//   if (loading) {
//     return (
//       <div className="has-text-white has-text-centered py-6">
//         <progress className="progress is-primary" max="100">Loading...</progress>
//       </div>
//     );
//   }

//   if (error) return <p className="has-text-danger">{error}</p>;
//   if (profiles.length === 0) return <p className="has-text-white">No recommendations found.</p>;

//   return (
//     <section className="has-background-black has-text-white py-5">
//       <div className="container">
//         <h1 className="is-size-4 px-4">Recommended Celebrities</h1>
//         <Slider {...sliderSettings}>
//           {profiles.map((person, index) => (
//             <div key={index} className="px-2">
//               <div className="card mx-2 my-6">
//                 <header className="card-header is-size-3">
//                   <p
//                     className="card-header-title is-centered py-5 is-clickable has-text-primary"
//                     onClick={() =>
//                       navigate(`/celebrity/${encodeURIComponent(person._id || person.name)}`)
//                     }
//                   >
//                     {person.name}
//                   </p>
//                 </header>
//                 <div className="card-content">
//                   <div className="content">
//                     <h3 className="title is-5">Demographics & Audience Match</h3>
//                     <p><strong>Age:</strong> {person.age || "N/A"}</p>
//                     <p><strong>Location:</strong> {person.location || "N/A"}</p>
//                     <p><strong>Gender:</strong> {person.gender || "N/A"}</p>

//                     <h3 className="title is-5 mt-4">Engagement & Reach</h3>
//                     <p><strong>Followers:</strong> {person.followers || "N/A"}</p>
//                     <p><strong>Engagement Rate:</strong> {person.engagementRate || "N/A"}</p>

//                     <h3 className="title is-5 mt-4">Performance</h3>
//                     <p><strong>Previous Endorsements:</strong> {person.previousEndorsements || "N/A"}</p>
//                     <p><strong>ROI:</strong> {person.averageROI || "N/A"}</p>
//                   </div>
//                 </div>

//                 <footer className="card-footer is-gap-4">
//                   <button
//                     className="button is-primary card-footer-item"
//                     onClick={() => handleInterestedClick(person.name)}
//                   >
//                     Interested
//                   </button>
//                   <button
//                     className="button is-link card-footer-item"
//                     onClick={() =>
//                       navigate(`/celebrity/${encodeURIComponent(person._id || person.name)}`)
//                     }
//                   >
//                     View Profile
//                   </button>
//                 </footer>
//               </div>
//             </div>
//           ))}
//         </Slider>
//       </div>
//     </section>
//   );
// };

// export default Recommendation;

// ----------USING BULMA------

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Recommendation = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAndStoreRecommendations = async () => {
      try {
        const cachedProfiles = localStorage.getItem("recommendationResult");
        const timestamp = localStorage.getItem("recommendationTimestamp");
        const expired =
          !timestamp || Date.now() - parseInt(timestamp, 10) > 5 * 60 * 1000;

        if (cachedProfiles && !expired) {
          setProfiles(JSON.parse(cachedProfiles));
          return setLoading(false);
        }

        const localStorageData = localStorage.getItem("campaignFormData");
        const parsedData = localStorageData
          ? JSON.parse(localStorageData)
          : null;

        const payload = parsedData || {
          description:
            "Promote a premium skincare brand targeting men and women in metro cities",
          persona: "Elegant, trustworthy, luxurious",
          involvementType: "Brand Ambassador",
          audience: "Women aged 25-40 in urban areas",
          budget: 2000000,
        };

        const response = await fetch("http://localhost:4000/campaign", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const data = await response.json();
        const suggestions = Array.isArray(data.result?.suggested_actors)
          ? data.result.suggested_actors
          : [];

        setProfiles(suggestions);
        localStorage.setItem(
          "recommendationResult",
          JSON.stringify(suggestions)
        );
        localStorage.setItem("recommendationTimestamp", Date.now().toString());

        await fetch("http://localhost:4000/api/recommend/store-profiles", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(suggestions),
        });
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to load recommendations.");
      } finally {
        setLoading(false);
      }
    };

    fetchAndStoreRecommendations();
  }, []);

  const handleInterestedClick = async (name) => {
    try {
      const res = await fetch(
        "http://localhost:4000/api/interest/track-interest",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name }),
        }
      );

      if (res.ok) {
        toast.success("Marked as Interested!");
      } else {
        toast.error("Failed to update click count.");
      }

      await fetch("http://localhost:4000/api/user/send-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to: "+11234567890", name }),
      });
    } catch (err) {
      console.error("Message error:", err);
      toast.error("Something went wrong");
    }
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  if (loading) {
    return (
      <div className="has-text-light has-text-centered py-6">
        <progress className="progress is-primary" max="100">
          Loading...
        </progress>
      </div>
    );
  }

  if (error) return <p className="has-text-danger">{error}</p>;
  if (profiles.length === 0)
    return <p className="has-text-light">No recommendations found.</p>;

  return (
    <section className="section has-background-black">
      <div className="container">
        <h1 className="title has-text-centered has-text-light is-size-3 pb-6">
          Recommended Influencers
        </h1>

        <Slider {...sliderSettings}>
          {profiles.map((person, index) => (
            <div key={index} className="px-3">
              <div
                className="card has-background-grey-light"
                style={{
                  borderRadius: "1rem",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.boxShadow =
                    "0 12px 35px rgba(0,0,0,0.4)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 30px rgba(0,0,0,0.3)";
                }}
              >
                <header className="card-header has-background-light">
                  <p
                    className="card-header-title is-size-4 has-text-dark is-clickable"
                    style={{
                      justifyContent: "center",
                      width: "100%",
                      fontWeight: 700,
                    }}
                    onClick={() =>
                      navigate(
                        `/celebrity/${encodeURIComponent(
                          person._id || person.name
                        )}`
                      )
                    }
                  >
                    {person.name}
                  </p>
                </header>

                <div className="card-content">
                  <div className="content has-text-black">
                    <h4 className="title is-6 has-text-black  mb-2">
                      Demographics
                    </h4>
                    <p>
                      <strong className="has-text-black ">Age:</strong>{" "}
                      {person.age || "N/A"}
                    </p>
                    <p className="has-text-black">
                      <strong className="has-text-black ">Location:</strong>{" "}
                      {person.location || "N/A"}
                    </p>
                    <p>
                      <strong className="has-text-black ">Gender:</strong>{" "}
                      {person.gender || "N/A"}
                    </p>

                    <h4 className="title is-6 has-text-black mt-4 mb-2">
                      Engagement
                    </h4>
                    <p>
                      <strong className="has-text-black ">Followers:</strong>{" "}
                      {person.followers || "N/A"}
                    </p>
                    <p>
                      <strong className="has-text-black ">
                        Engagement Rate:
                      </strong>{" "}
                      {person.engagementRate || "N/A"}
                    </p>

                    <h4 className="title is-6 has-text-black  mt-4 mb-2">
                      Performance
                    </h4>
                    <p>
                      <strong className="has-text-black ">Endorsements:</strong>{" "}
                      {person.previousEndorsements || "N/A"}
                    </p>
                    <p>
                      <strong className="has-text-black ">ROI:</strong>{" "}
                      {person.averageROI || "N/A"}
                    </p>
                  </div>
                </div>

                <footer className="card-footer p-3 is-flex is-justify-content-space-between">
                  <button
                    className="button is-light has-text-weight-semibold is-rounded mr-2"
                    style={{ transition: "all 0.3s ease" }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = "#000";
                      e.currentTarget.style.color = "#fff";
                      e.currentTarget.style.border = "1px solid #000";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = "";
                      e.currentTarget.style.color = "";
                      e.currentTarget.style.border = "";
                    }}
                    onClick={() => handleInterestedClick(person.name)}
                  >
                    Interested
                  </button>

                  <button
                    className="button is-light has-text-weight-semibold is-rounded"
                    style={{ transition: "all 0.3s ease" }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = "#000";
                      e.currentTarget.style.color = "#fff";
                      e.currentTarget.style.border = "1px solid #000";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = "";
                      e.currentTarget.style.color = "";
                      e.currentTarget.style.border = "";
                    }}
                    onClick={() =>
                      navigate(
                        `/celebrity/${encodeURIComponent(
                          person._id || person.name
                        )}`
                      )
                    }
                  >
                    View Profile
                  </button>
                </footer>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Recommendation;
