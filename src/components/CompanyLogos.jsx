import React from 'react';
import './CompanyLogos.css';

const companies = [
  { name: "Samsung", domain: "samsung.com" },
  { name: "HCL Tech", domain: "hcltech.com" },
  { name: "Infosys", domain: "infosys.com" },
  { name: "Nxtwave", domain: "nxtwave.tech" },
  { name: "Sopra Steria", domain: "soprasteria.com" },
  { name: "Success Numbers", domain: "successnumbers.in" },
  { name: "Visa", domain: "visa.com" },
  { name: "HDFC", domain: "hdfcbank.com" },
  { name: "Amazon", domain: "amazon.in" },
  { name: "Mediatek", domain: "mediatek.com" },
  { name: "Warner Bros Discovery", domain: "wbd.com" },
  { name: "Netapp", domain: "netapp.com" },
  { name: "Intel", domain: "intel.com" },
  { name: "Dell", domain: "dell.com" },
  { name: "Rapidfort", domain: "rapidfort.com" },
  { name: "Google", domain: "google.com" },
  { name: "Flipkart", domain: "flipkart.com" },
  { name: "AMD", domain: "amd.com" },
  { name: "Omnissa", domain: "omnissa.com" },
  { name: "Alstom", domain: "alstom.com" },
  { name: "Walmart", domain: "walmart.com" },
];

const CompanyLogos = () => {
  return (
    <section className="company-logos-section">
      <div className="container">
        <div className="text-center mb-12">
          <h3 className="section-subtitle gradient-text">Industry Presence</h3>
          <h2 className="section-title">Our Contributors Work At</h2>
        </div>
        
        <div className="logos-marquee">
          <div className="logos-track">
            {[...companies, ...companies].map((company, index) => (
              <div className="logo-item" key={index}>
                <div className="logo-wrapper">
                  <img 
                    src={`https://logo.clearbit.com/${company.domain}`} 
                    alt={company.name} 
                    className="company-logo-img"
                    onError={(e) => {
                      e.target.src = `https://www.google.com/s2/favicons?domain=${company.domain}&sz=128`;
                      e.target.onerror = (ev) => {
                        ev.target.style.display = 'none';
                        ev.target.nextSibling.style.display = 'flex';
                      };
                    }}
                  />
                  <div className="logo-fallback" style={{ display: 'none' }}>
                    {company.name.charAt(0)}
                  </div>
                </div>
                <span className="company-name-label">{company.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyLogos;
