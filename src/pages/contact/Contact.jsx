import React from "react";

const Contact = () => {
  return (
    <div className="section has-background-black ">
    <div>
        <h1 className='has-text-white is-size-3 has-text-centered has-text-weight-semibold'>Contact Us</h1>
    </div>
     <div className="container px-6 py-6">
         <div class="field">
        <label className="label">Name</label>
        <div className="control">
          <input className="input" type="text" placeholder="Enter your Name" />
        </div>
      </div>

      <div className="field">
        <label className="label">Email</label>
        <div className="control has-icons-left has-icons-right">
          <input
            className="input"
            type="email"
            placeholder="Enter your Email"
            value=""
          />
          <span className="icon is-small is-left">
            <i className="fas fa-envelope"></i>
          </span>
          <span className="icon is-small is-right">
            <i className="fas fa-exclamation-triangle"></i>
          </span>
        </div>
      </div>

      <div className="field">
        <label className="label">Message</label>
        <div className="control">
          <textarea class="textarea" placeholder="Textarea"></textarea>
        </div>
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button className="button is-link">Submit</button>
        </div>
        <div className="control">
          <button className="button is-link is-light">Cancel</button>
        </div>
      </div>
     </div>
    </div>
  );
};

export default Contact;
