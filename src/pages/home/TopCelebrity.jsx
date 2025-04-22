import React, { useEffect, useState } from "react";
import CelebrityCard from "../celebrity/CelebrityCard";

const categories = ["Select", "Male", "Female"];

const TopCelebrity = () => {
  const [celebrities, setCelebrities] = useState([]);
  const [selectedGender, setSelectedGender] = useState("Select");

  useEffect(() => {
    fetch("celebrity.json")
      .then((res) => res.json())
      .then((data) => {
        setCelebrities(data); // Set the fetched data to the celebrities state
        console.log(data); // Log the data to see its structure
      });
  }, []);

  // Filter celebrities based on selected gender
  const filteredCelebrities =
    selectedGender === "Select"
      ? celebrities
      : celebrities.filter(
          (celeb) => celeb.gender.toLowerCase() === selectedGender.toLowerCase()
        );

  console.log(filteredCelebrities); // Log the filtered celebrities

  return (
    <section className="section has-background-black has-text-white">
      <div className="container">
        {/* Title */}
        <h1 className="title has-text-centered has-text-white">
          Top Celebrity
        </h1>

        {/* Gender filter */}
        <div className="field is-flex is-justify-content-center mb-5">
          <div className="control">
            <div className="select is-rounded is-dark">
              <select
                onChange={(e) => setSelectedGender(e.target.value)}
                name="gender"
                id="gender"
              >
                {categories.map((gender, index) => (
                  <option key={index} value={gender}>
                    {gender}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Display filtered celebrities */}
        <div className="columns is-multiline is-centered">
          {filteredCelebrities.length > 0 ? (
            filteredCelebrities.map((celeb, index) => (
              <div key={index} className="column is-4">
                <CelebrityCard celebrity={celeb} />
              </div>
            ))
          ) : (
            <p className="has-text-centered">No celebrities found.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default TopCelebrity;
