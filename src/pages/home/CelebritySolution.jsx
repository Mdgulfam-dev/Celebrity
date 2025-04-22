import React from "react";
import celeb1 from "../../assets/celebrity1.jpg";
import celeb2 from "../../assets/celebrity2.jpg";
import celeb3 from "../../assets/celebrity3.jpg";
import celeb4 from "../../assets/celebrity4.jpg";

const CelebritySolution = () => {
  return (
    <section className="has-background-black has-text-white py-6 fade-in-up">
      <div>
        <div className="container  px-4">
          {/* Header */}
          <div className="has-text-centered mb-6 py-6">
            <h2 className="title is-size-3 has-text-warning glow-text">
              Redefine Your Business Promotion with Celebrity Solutions
            </h2>
            <p className="subtitle is-size-6 has-text-grey px-6 mx-auto">
              Amplify your brand's reach with Celebrity Solutions – connecting
              you with top celebrities for impactful, engaging promotions. Make
              your brand unforgettable.
              
            </p>
            <hr />
          </div>
          

          {/* Rows of Services */}
          <div className="columns is-multiline is-variable is-6">
            <div className="column is-half-tablet is-one-quarter-desktop mb-6 fade-in delay-1">
              <div className="box has-background-dark has-text-centered hover-lift rounded-box">
                <figure className="image is-4by3">
                  <img
                    src={celeb1}
                    alt="Brand Endorsement"
                    className="service-img rounded-image"
                  />
                </figure>
                <h3 className="title is-size-4 mt-4">Image Brand Endorsement</h3>
                <p className="mt-2">
                  Hire a Brand Ambassador to create a buzz in the market.
                </p>
              </div>
            </div>

            <div className="column is-half-tablet is-one-quarter-desktop mb-6 fade-in delay-2">
              <div className="box has-background-dark has-text-centered hover-lift rounded-box">
                <figure className="image is-4by3">
                  <img
                    src={celeb2}
                    alt="Video Shoutouts"
                    className="service-img rounded-image"
                  />
                </figure>
                <h3 className="title is-size-4 mt-4">Commercial Video Shoutouts</h3>
                <p className="mt-2">
                  Home/Studio Shooted professional brand promotion videos by celebs.
                </p>
              </div>
            </div>

            <div className="column is-half-tablet is-one-quarter-desktop mb-6 fade-in delay-3">
              <div className="box has-background-dark has-text-centered hover-lift rounded-box">
                <figure className="image is-4by3">
                  <img
                    src={celeb3}
                    alt="Influencer Marketing"
                    className="service-img rounded-image"
                  />
                </figure>
                <h3 className="title is-size-4 mt-4">Influencer Marketing</h3>
                <p className="mt-2">
                  Hire Influencers to create a buzz in the market by promoting your
                  brand/products/store etc.
                </p>
              </div>
            </div>

            <div className="column is-half-tablet is-one-quarter-desktop mb-6 fade-in delay-4">
              <div className="box has-background-dark has-text-centered hover-lift rounded-box">
                <figure className="image is-4by3">
                  <img
                    src={celeb4}
                    alt="Celebrity Appearances"
                    className="service-img rounded-image"
                  />
                </figure>
                <h3 className="title is-size-4 mt-4">Celebrity Appearances</h3>
                <p className="mt-2">
                  Invite a celebrity for your corporate or personal event.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CelebritySolution;
