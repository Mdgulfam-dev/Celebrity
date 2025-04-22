import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProfileForm = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
    location: "",
    instagramFollowers: "",
    engagementPercentage: "",
    averageROI: "",
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (id) {
      setIsEditing(true);
      axios
        .get(`http://localhost:4000/api/user/profiles/${id}`)
        .then((response) => {
          const profile = response.data;
          setFormData(profile);
          setPreview(
            profile.image
              ? `http://localhost:4000/uploads/${profile.image}`
              : null
          );
        })
        .catch((error) => console.error("Error fetching profile:", error));
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const fetchProfile = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/user/profiles/${id}`
      );
      setFormData(response.data); //Set latest data
      setPreview(
        response.data.image
          ? `http://localhost:4000/uploads/${response.data.image}`
          : null
      );
    } catch (error) {
      console.error("Error fetching updated profile:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    if (image) data.append("image", image);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("User is not authenticated. Please log in.");
        return;
      }

      const url = isEditing
        ? `http://localhost:4000/api/user/profiles/${id}`
        : "http://localhost:4000/api/user/profiles/profile";

      await axios({
        method: isEditing ? "put" : "post",
        url,
        data,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      setMessage("Profile updated successfully!");
      await fetchProfile(); //  Immediately update UI with new data
    } catch (error) {
      console.error(
        "Error submitting profile:",
        error.response?.data || error.message
      );
      setMessage("Failed to save profile.");
    }
  };

  return (
    <div className="container py-6">
      <h1 className="title has-text-centered">
        {isEditing ? "Edit Profile" : "Create Profile"}
      </h1>
      <form onSubmit={handleSubmit} className="box">
        {Object.keys(formData).map((key) => (
          <div className="field" key={key}>
            <label className="label">
              {key.replace(/([A-Z])/g, " $1").trim()}
            </label>
            <input
              className="input"
              type={
                key === "age" ||
                
                key === "height" ||
                key === "weight" ||
                key === "instagramFollowers" ||
                key === "averageROI"
                  ? "number"
                  : "text"
              }
              name={key}
              value={formData[key]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <div className="field">
          <label className="label">Profile Picture</label>
          <input
            className="input"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        {preview && (
          <img src={preview} alt="Preview" className="image is-128x128" />
        )}
        <button className="button is-link" type="submit">
          {isEditing ? "Update" : "Save"}
        </button>
      </form>
      {message && <p className="has-text-danger">{message}</p>}
    </div>
  );
};

export default ProfileForm;
