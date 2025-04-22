import React, { useState, useEffect } from "react";
import axios from "axios";

const ProfileCard = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  console.log(token);
  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        setError("No token found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(
          "http://localhost:4000/api/user/profiles/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setProfile(res.data);
        setFormData(res.data); // Initialize form with profile data
        setLoading(false);
      } catch (error) {
        setError("Profile not found or error fetching profile.");
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
  try {
    const res = await axios.put(
      "http://localhost:4000/api/user/profiles/profile",
      formData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    console.log("Updated Profile Response:", res.data); // ✅ Debugging
    setProfile((prevProfile) => ({ ...prevProfile, ...res.data.profile })); // ✅ Ensures state update
    setIsEditing(false);
  } catch (error) {
    console.error("Error updating profile:", error.response?.data);
    setError("Failed to update profile.");
  }
};


  if (loading) return <p>Loading profile...</p>;
  if (error) return <p className="has-text-danger">{error}</p>;
  if (!profile) return <p>No profile found</p>;

  return (
    <section className="section ">
      <div className="container columns is-flex is-justify-content-center is-align-content-center py-6">
        <div className="card column is-one-third">
          <div className="card-image  ">
            <div className="has-text-centered">
              <h1 className="is-size-2">Profile</h1>
            </div>
            <figure className="image is-128x128">
              <img
                className="ml-5 "
                src={
                  profile.image?.startsWith("http")
                    ? profile.image
                    : `http://localhost:4000/uploads/${profile.image}`
                }
                alt={profile.name}
              />
            </figure>
          </div>
          <div className="card-content mt-6">
            {isEditing ? (
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input mb-2"
                />
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="input mb-2"
                />
                <input
                  type="text"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="input mb-2"
                />
                <input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  className="input mb-2"
                />
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  className="input mb-2"
                />
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="input mb-2"
                />
                <input
                  type="number"
                  name="instagramFollowers"
                  value={formData.instagramFollowers}
                  onChange={handleChange}
                  className="input mb-2"
                />
                <input
                  type="number"
                  step="0.1"
                  name="engagementPercentage"
                  value={formData.engagementPercentage}
                  onChange={handleChange}
                  className="input mb-2"
                />
                <input
                  type="number"
                  name="averageROI"
                  value={formData.averageROI}
                  onChange={handleChange}
                  className="input mb-2"
                />
                <button
                  onClick={handleUpdate}
                  className="button is-success mt-2"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="button is-danger mt-2 ml-2"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div>
                <p className="title">{profile.name}</p>
                <p>Age: {profile.age}</p>
                <p>Gender: {profile.gender}</p>
                <p>Height: {profile.height} cm</p>
                <p>Weight: {profile.weight} kg</p>
                <p>Location: {profile.location}</p>
                <p>
                  Instagram Followers:{" "}
                  {profile.instagramFollowers
                    ? profile.instagramFollowers.toLocaleString()
                    : "N/A"}
                </p>
                <p>
                  Engagement:{" "}
                  {profile.engagementPercentage
                    ? `${profile.engagementPercentage}%`
                    : "N/A"}
                </p>
                <p>
                  Average ROI: ₹
                  {profile.averageROI
                    ? profile.averageROI.toLocaleString()
                    : "N/A"}
                </p>
                <button
                  onClick={() => setIsEditing(true)}
                  className="button is-link is-outlined is-size-6 px-5 mt-3"
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileCard;
