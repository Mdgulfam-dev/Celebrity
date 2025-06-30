// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// const CelebrityDetails = () => {
//   const { id } = useParams();
//   const [celebrity, setCelebrity] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchCelebrity = async () => {
//       try {
//         // const response = await fetch(`http://localhost:4000/api/recommend/profile/${id}`);
//         const response = await fetch(`http://localhost:4000/api/recommend/get-profile/${encodeURIComponent(identifier)}`);
//         if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        
//         const data = await response.json();
//         setCelebrity(data.profile);
//       } catch (err) {
//         console.error("Error:", err);
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCelebrity();
//   }, [id]);

//   if (loading) return <p className="has-text-white has-text-centered">Loading...</p>;
//   if (error) return <p className="has-text-danger has-text-centered">Error: {error}</p>;
//   if (!celebrity) return <p className="has-text-white has-text-centered">No details available.</p>;

//   return (
//     <section className="section has-background-black has-text-white">
//       <div className="container mx-auto">
//         <div className="box has-background-grey-dark p-5">
//           <h1 className="title has-text-white has-text-centered">{celebrity.name}</h1>
//           <div className="columns">
//             <div className="column is-half">
//               <p><strong>Age:</strong> {celebrity.age}</p>
//               <p><strong>Gender:</strong> {celebrity.gender}</p>
//               <p><strong>Location:</strong> {celebrity.location}</p>
//               <p><strong>Geographic Reach:</strong> {celebrity.geographicLocation}</p>
//               <p><strong>Target Audience:</strong> {celebrity.targetAudience}</p>
//               <p><strong>Brand Alignment:</strong> {celebrity.brandAlignment}</p>
//               <p><strong>Image Match:</strong> {celebrity.imageMatch}</p>
//               <p><strong>Content Style:</strong> {celebrity.contentStyle}</p>
//               <p><strong>Public Image:</strong> {celebrity.publicImage}</p>
//             </div>
//             <div className="column is-half">
//               <p><strong>Followers:</strong> {celebrity.followers}</p>
//               <p><strong>Engagement Rate:</strong> {celebrity.engagement}</p>
//               <p><strong>Total Reach:</strong> {celebrity.totalReach}</p>
//               <p><strong>Fan Engagement Rate:</strong> {celebrity.fanEngagementRate}</p>
//               <p><strong>Previous Endorsements:</strong> {celebrity.previousEndorsements}</p>
//               <p><strong>Past Partnerships:</strong> {celebrity.pastPartnerships}</p>
//               <p><strong>Average ROI:</strong> {celebrity.averageROI}</p>
//               <p><strong>Endorsement Fee:</strong> {celebrity.endorsementFee}</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CelebrityDetails;

// ----------------------Working code----------------------

// Recommended Data Comes From: http://localhost:3000/mockData.json
// Profile Details Come From: http://localhost:4000/api/recommend/profile/:id (Fetched when clicking "View Profile")

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { config } from "../../config";

const CelebrityDetails = () => {
  const { id } = useParams(); // This can be ID or Name
  
const identifier = decodeURIComponent(id);  // Convert back from URL encoding

console.log("Received Identifier from URL:", identifier);

  
  const [celebrity, setCelebrity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCelebrity = async () => {
      try {
        let url = `${config.API_URL}/api/recommend/profile/${encodeURIComponent(id)}`;
        console.log("Fetching URL:", url);
        
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        
        const data = await response.json();
        setCelebrity(data.profile);
      } catch (err) {
        console.error("Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCelebrity();
    }
  }, [id]);

  if (loading) return <p className="has-text-white has-text-centered">Loading...</p>;
  if (error) return <p className="has-text-danger has-text-centered">Error: {error}</p>;
  if (!celebrity) return <p className="has-text-white has-text-centered">No details available.</p>;

  return (
    <section className="section has-background-black has-text-white">
      <div className="container mx-auto">
        <div className="box has-background-grey-dark p-5 ">
          <h1 className="title has-text-white has-text-centered">{celebrity.name}</h1>
          <div className="columns">
            <div className="column is-half ">
              <p><strong>Age:</strong> {celebrity.age}</p>
              <p><strong>Gender:</strong> {celebrity.gender}</p>
              <p><strong>Location:</strong> {celebrity.location}</p>
              <p><strong>Geographic Reach:</strong> {celebrity.geographicLocation}</p>
              <p><strong>Target Audience:</strong> {celebrity.targetAudience}</p>
              <p><strong>Brand Alignment:</strong> {celebrity.brandAlignment}</p>
              <p><strong>Image Match:</strong> {celebrity.imageMatch}</p>
              <p><strong>Content Style:</strong> {celebrity.contentStyle}</p>
              <p><strong>Public Image:</strong> {celebrity.publicImage}</p>
            </div>
            <div className="column is-half">
              <p><strong>Followers:</strong> {celebrity.followers}</p>
              <p><strong>Engagement Rate:</strong> {celebrity.engagement}</p>
              <p><strong>Total Reach:</strong> {celebrity.totalReach}</p>
              <p><strong>Fan Engagement Rate:</strong> {celebrity.fanEngagementRate}</p>
              <p><strong>Previous Endorsements:</strong> {celebrity.previousEndorsements}</p>
              <p><strong>Past Partnerships:</strong> {celebrity.pastPartnerships}</p>
              <p><strong>Average ROI:</strong> {celebrity.averageROI}</p>
              <p><strong>Endorsement Fee:</strong> {celebrity.endorsementFee}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CelebrityDetails;
