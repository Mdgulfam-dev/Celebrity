import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const SearchResults = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    const fetchProfiles = async () => {
      if (!query) return;

      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`http://localhost:4000/api/recommend/profile?name=${query}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Error fetching data");
        }

        if (data.success && data.profile) {
          setProfiles([data.profile]); // Ensure data is in an array
        } else {
          setProfiles([]);
        }
      } catch (err) {
        console.error("API Error:", err);
        setError("Failed to load profiles. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, [query]);

  return (
    <div className="container  py-5 has-background-black">
      <h2 className="title has-text-centered has-text-primary">
        Search Results for "{query}"
      </h2>

      {loading && <p className="has-text-centered has-text-info">Loading profiles...</p>}
      {error && <p className="has-text-danger has-text-centered">{error}</p>}
      {!loading && !error && profiles.length === 0 && (
        <p className="has-text-centered has-text-grey-light is-size-5">
           No profiles found.
        </p>
      )}

      {/* Center the cards */}
      <div className="columns is-multiline is-centered">
        {profiles.map((profile, index) => (
          <div key={index} className="column is-4-desktop is-6-tablet is-12-mobile">
            <div className="card has-text-centered">
              <div className="card-content">
                <p className="title is-5 has-text-primary">{profile.name || "N/A"}</p>
                <p className="subtitle is-6 has-text-grey">{profile.location || "N/A"}</p>
                <div className="content">
                  <p><strong>Age:</strong> {profile.age || "N/A"}</p>
                  <p><strong>Gender:</strong> {profile.gender || "N/A"}</p>
                  <p><strong>Target Audience:</strong> {profile.targetAudience || "N/A"}</p>
                  <p><strong>Brand Alignment:</strong> {profile.brandAlignment || "N/A"}</p>
                  <p><strong>Image Match:</strong> {profile.imageMatch || "N/A"}</p>
                  <p><strong>Content Style:</strong> {profile.contentStyle || "N/A"}</p>
                  <p><strong>Public Image:</strong> {profile.publicImage || "N/A"}</p>
                  <p><strong>Followers:</strong> {profile.followers?.toLocaleString() || "N/A"}</p>
                  <p><strong>Engagement Rate:</strong> {profile.engagementRate || "N/A"}</p>
                  <p><strong>Total Reach:</strong> {profile.totalReach || "N/A"}</p>
                  <p><strong>Previous Endorsements:</strong> {profile.previousEndorsements || "N/A"}</p>
                  <p><strong>Average ROI:</strong> {profile.averageROI || "N/A"}</p>
                  <p><strong>Past Partnerships:</strong> {profile.pastPartnerships || "N/A"}</p>
                  <p><strong>Endorsement Fee:</strong> {profile.endorsementFee || "N/A"}</p>
                  <p><strong>Geographic Location:</strong> {profile.geographicLocation || "N/A"}</p>
                </div>
              </div>
              <footer className="card-footer">
                <p className="card-footer-item">
                  <span className="has-text-link">View More</span>
                </p>
              </footer>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
