import React from "react";
import { Link } from "react-router-dom";
import { TbBrandLinkedinFilled } from "react-icons/tb";
import { ImFacebook2 } from "react-icons/im";
import { TfiYoutube } from "react-icons/tfi";
import { FaSquareInstagram } from "react-icons/fa6";
import logoImg from "../assets/logo.jpg";

const Footer = () => {
  return (
    <footer className="section has-background-black has-text-white">
      <div className="container">
        <div className="columns is-multiline">
          {/* Logo & Description */}
          <div className="column is-full-mobile is-5-tablet is-3-desktop mb-5">
            <Link to="/" className="mb-4 is-inline-block">
              <figure className="image is-96x96">
                <img
                  src={logoImg}
                  alt="Logo"
                  className="is-rounded"
                  style={{ maxWidth: "80px" }}
                />
              </figure>
            </Link>
            <p className="has-text-grey-light is-size-7 mt-3">
              Celeb Media Pvt. Ltd. is your go-to platform for impactful brand
              promotion through celebrity endorsements. Elevate your brand with
              Celewish and let the stars tell your story!
            </p>

            {/* Social Media Icons */}
            <div className="mt-4 is-flex is-align-items-center is-flex-wrap-wrap">
              <Link to="#" className="icon has-text-white mr-3 hover-link" target="_blank">
                <TbBrandLinkedinFilled size={22} />
              </Link>
              <Link to="#" className="icon has-text-white mr-3 hover-link" target="_blank">
                <ImFacebook2 size={20} />
              </Link>
              <Link to="#" className="icon has-text-white mr-3 hover-link" target="_blank">
                <TfiYoutube size={20} />
              </Link>
              <Link to="#" className="icon has-text-white hover-link" target="_blank">
                <FaSquareInstagram size={20} />
              </Link>
            </div>
          </div>

          {/* Footer Links */}
          <div className="column is-full-mobile is-7-tablet is-9-desktop">
            <div className="columns is-multiline mt-0">
              {/* Company */}
              <div className="column is-half-mobile is-one-quarter-desktop mb-4">
                <h4 className="is-size-6 has-text-weight-semibold mb-3">Company</h4>
                <ul>
                  <li className="mb-2"><Link to="/" className="footer-link">Home</Link></li>
                  <li className="mb-2"><Link to="/about" className="footer-link">About Celeb</Link></li>
                  <li className="mb-2"><Link to="/contact" className="footer-link">Contact Us</Link></li>
                </ul>
              </div>

              {/* Pages */}
              <div className="column is-half-mobile is-one-quarter-desktop mb-4">
                <h4 className="is-size-6 has-text-weight-semibold mb-3">Pages</h4>
                <ul>
                  <li className="mb-2"><Link to="/contact" className="footer-link">Contact</Link></li>
                </ul>
              </div>

              {/* Legal */}
              <div className="column is-half-mobile is-one-quarter-desktop mb-4">
                <h4 className="is-size-6 has-text-weight-semibold mb-3">Legal</h4>
                <ul>
                  <li className="mb-2"><Link to="/disclaimer" className="footer-link">Disclaimer</Link></li>
                  <li className="mb-2"><Link to="/refund" className="footer-link">Refund & Cancellation</Link></li>
                  <li><Link to="/terms" className="footer-link">Terms of Use</Link></li>
                </ul>
              </div>

              {/* Resources */}
              <div className="column is-half-mobile is-one-quarter-desktop mb-4">
                <h4 className="is-size-6 has-text-weight-semibold mb-3">Resources</h4>
                <ul>
                  <li className="mb-2"><Link to="/service" className="footer-link">Service</Link></li>
                  <li className="mb-2"><Link to="/product" className="footer-link">Product</Link></li>
                  <li><Link to="/pricing" className="footer-link">Pricing</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div
          className="has-text-centered mt-6 pt-4"
          style={{ borderTop: "1px solid #333" }}
        >
          <p className="is-size-7 has-text-grey-light">
            © 2025 Celeb Media Pvt. Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};


export default Footer;
