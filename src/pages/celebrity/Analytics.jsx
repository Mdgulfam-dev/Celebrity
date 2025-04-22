import React from 'react';

const mockData = [
  { name: "Reach", value: 5000000 },
  { name: "Engagement", value: 250000 },
  { name: "Conversions", value: 25000 },
];

const Analytics = () => {
  return (
    <section className='has-background-black'>
      <div className="container">
        <div className="box ">
        <h3 className="title is-4">Campaign Performance</h3>
        <div className="columns is-multiline">
          {mockData.map((item) => (
            <div key={item.name} className="column is-4">
              <div className="notification is-primary">
                <p className="heading">{item.name}</p>
                <p className="title">{item.value.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="box mt-5">
        <h3 className="title is-4">Key Metrics</h3>
        <div className="columns is-multiline">
          <div className="column is-6">
            <div className="has-text-centered">
              <p className="heading">Total Reach</p>
              <p className="title">5M+</p>
            </div>
          </div>
          <div className="column is-6">
            <div className="has-text-centered">
              <p className="heading">Engagement Rate</p>
              <p className="title">4.5%</p>
            </div>
          </div>
          <div className="column is-6">
            <div className="has-text-centered">
              <p className="heading">Conversion Rate</p>
              <p className="title">2.8%</p>
            </div>
          </div>
          <div className="column is-6">
            <div className="has-text-centered">
              <p className="heading">ROI</p>
              <p className="title">250%</p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}

export default Analytics;
