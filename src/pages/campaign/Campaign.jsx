import React, { useState, useContext, useEffect } from "react";
import "bulma/css/bulma.min.css";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { toast } from "react-toastify";
// const toastId = toast.loading("Generating recommendations...");

const Campaign = () => {
  
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem("campaignForm");
    return saved
      ? JSON.parse(saved)
      : {
          brand: "",
          persona: "",
          involvement: "",
          audience: "",
          budget: "",
        };
  });

  const [message, setMessage] = useState(
    localStorage.getItem("campaignMessage") || null
  );

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Please login to access campaign.");
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  // Persist formData to localStorage on every change
  useEffect(() => {
    localStorage.setItem("campaignForm", JSON.stringify(formData));
  }, [formData]);

  // Persist message if available
  useEffect(() => {
    if (message) {
      localStorage.setItem("campaignMessage", message);
    }
  }, [message]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleReset = () => {
    const cleared = {
      brand: "",
      persona: "",
      involvement: "",
      audience: "",
      budget: "",
    };
    setFormData(cleared);
    localStorage.removeItem("campaignForm");
  };


//  const handleSubmit = async (e) => {
//   e.preventDefault();
//   const { brand, persona, involvement, audience, budget } = formData;

//   const toastId = toast.loading("Generating recommendations...");

//   const payload = {
//     brand,
//     persona,
//     involvementType: involvement,
//     audience,
//     budget,
//   };

//   try {
//     // 1. Store campaign in DB via /api/generate
//     const storeRes = await fetch("http://localhost:4000/api/generate", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     });

//     const storeData = await storeRes.json();
//     console.log(storeData);

//     // 2. Get recommendation from Gemini via /campaign
//     const recRes = await fetch("http://localhost:4000/campaign", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         description: brand, // Gemini expects 'description'
//         persona,
//         involvementType: involvement,
//         audience,
//         budget,
//       }),
//     });

//     const recData = await recRes.json();

//     // Optional: Track campaign (if needed)
//     // await fetch("http://localhost:4000/admin/track-campaign", {
//     //   method: "POST",
//     // });

//     // Set message and store in localStorage
//     setMessage(recData.result);

//     localStorage.setItem("campaignFormData", JSON.stringify(payload));
//     localStorage.setItem(
//       "recommendationResult",
//       JSON.stringify(recData.result?.suggested_actors || [])
//     );
//     localStorage.setItem("recommendationTimestamp", Date.now().toString());

//     toast.update(toastId, {
//       render: "Campaign submitted successfully!",
//       type: "success",
//       isLoading: false,
//       autoClose: 3000,
      
//     });

//     setTimeout(() => {
//       navigate("/");
//     }, 1);
//   } catch (error) {
//     console.error("Submission failed:", error);
//     toast.update(toastId, {
//       render: "Failed to submit campaign.",
//       type: "error",
//       isLoading: false,
//       autoClose: 3000,
//     });
//   }
// };

const handleSubmit = async (e) => {
  e.preventDefault();
  const { brand, persona, involvement, audience, budget } = formData;

  const toastId = toast.loading("Generating recommendations...");

  const payload = {
    brand,
    persona,
    involvementType: involvement,
    audience,
    budget,
  };

  try {
    // 1. Store campaign in DB via /api/generate
    const storeRes = await fetch("http://localhost:4000/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const storeData = await storeRes.json();
     console.log(storeData);

    // 2. Get recommendation from Gemini via /campaign
    const recRes = await fetch("http://localhost:4000/campaign", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        description: brand,
        persona,
        involvementType: involvement,
        audience,
        budget,
      }),
    });

    const recData = await recRes.json();

    // Handle the response data properly
    const resultMessage = recData.result?.suggested_actors 
      ? `Recommended actors: ${recData.result.suggested_actors.join(', ')}`
      : recData.result?.message || "Recommendation received";

    setMessage(resultMessage);
    localStorage.setItem("campaignMessage", resultMessage);
    localStorage.setItem("campaignFormData", JSON.stringify(payload));
    localStorage.setItem(
      "recommendationResult",
      JSON.stringify(recData.result?.suggested_actors || [])
    );
    localStorage.setItem("recommendationTimestamp", Date.now().toString());

    toast.update(toastId, {
      render: "Campaign submitted successfully!",
      type: "success",
      isLoading: false,
      autoClose: 3000,
    });

    navigate("/");

  } catch (error) {
    console.error("Submission failed:", error);
    toast.update(toastId, {
      render: "Failed to submit campaign.",
      type: "error",
      isLoading: false,
      autoClose: 3000,
    });
  }
};




  return (
    <section className="section has-background-black py-6">
      <div className="container is-flex is-justify-content-center">
        <form
          className="box"
          style={{
            backgroundColor: "#1a1a1a",
            borderRadius: "1rem",
            width: "100%",
            maxWidth: "720px",
          }}
          onSubmit={handleSubmit}
        >
          <h1 className="title has-text-white has-text-centered mb-5">
            Create Campaign
          </h1>

          <div className="field">
            <div className="control">
              <textarea
                className="textarea has-background-dark has-text-white"
                name="brand"
                placeholder="Tell us about your brand..."
                value={formData.brand}
                onChange={handleChange}
              ></textarea>
            </div>
            <p className="has-text-right has-text-grey-light is-size-7 mt-1">
              <span className="icon is-small">
                <i className="fas fa-magic"></i>
              </span>{" "}
              AI Powered
            </p>
          </div>

          <div className="columns is-variable is-2 mb-3">
            <div className="column">
              <input
                className="input has-background-dark has-text-white"
                name="persona"
                placeholder="Desired celebrity persona..."
                value={formData.persona}
                onChange={handleChange}
              />
            </div>
            <div className="column">
              <div className="select is-fullwidth">
                <select
                  className="has-background-dark has-text-white"
                  name="involvement"
                  value={formData.involvement}
                  onChange={handleChange}
                >
                  <option value="">Select involvement type</option>
                  <option value="brand-ambassador">Brand Ambassador</option>
                  <option value="endorsement">Endorsement</option>
                  <option value="collaboration">Collaboration</option>
                </select>
              </div>
            </div>
          </div>

          <div className="columns is-variable is-2 mb-4">
            <div className="column">
              <input
                className="input has-background-dark has-text-white"
                name="audience"
                placeholder="Target audience..."
                value={formData.audience}
                onChange={handleChange}
              />
            </div>
            <div className="column">
              <input
                className="input has-background-dark has-text-white"
                name="budget"
                type="number"
                placeholder="Maximum budget..."
                value={formData.budget}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="buttons is-flex is-justify-content-space-between">
            <button
              type="button"
              onClick={handleReset}
              className="button is-danger"
              style={{ borderRadius: "0.5rem" }}
            >
              Reset
            </button>
            <button
              type="submit"
              className="button has-text-weight-bold"
              style={{
                background: "linear-gradient(to right, #6e00ff, #a100ff)",
                color: "white",
                borderRadius: "0.5rem",
              }}
            >
              Find Perfect Matches →
            </button>
          </div>
        </form>
      </div>

      {/* AI Response */}
      {message && (
        <div className="container mt-6">
          <div
            className="card"
            style={{ backgroundColor: "#202020", borderRadius: "1rem" }}
          >
            <header className="card-header">
              <p className="card-header-title has-text-white">
                🎯 Recommended Strategy
              </p>
            </header>
            <div className="card-content">
              <div className="content has-text-white">{message}</div>
            </div>
          </div>
        </div>
      )}

     
    </section>
  );
};

export default Campaign;
