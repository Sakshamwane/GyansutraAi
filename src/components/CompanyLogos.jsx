import React from 'react';
import './CompanyLogos.css';

const companies = [
  { name: "Samsung", logo: "https://logo.clearbit.com/samsung.com" },
  { name: "HCL Tech", logo: "https://logo.clearbit.com/hcltech.com" },
  { name: "Infosys", logo: "https://logo.clearbit.com/infosys.com" },
  { name: "Nxtwave", logo: "https://logo.clearbit.com/nxtwave.tech" },
  { name: "Sopra Steria", logo: "https://logo.clearbit.com/soprasteria.com" },
  { name: "Success Numbers", logo: "https://logo.clearbit.com/successnumbers.in" },
  { name: "Visa", logo: "https://logo.clearbit.com/visa.com" },
  { name: "HDFC", logo: "https://logo.clearbit.com/hdfcbank.com" },
  { name: "Amazon", logo: "https://logo.clearbit.com/amazon.in" },
  { name: "Mediatek", logo: "https://logo.clearbit.com/mediatek.com" },
  { name: "Warner Bros Discovery", logo: "https://logo.clearbit.com/wbd.com" },
  { name: "Netapp", logo: "https://logo.clearbit.com/netapp.com" },
  { name: "Intel", logo: "https://logo.clearbit.com/intel.com" },
  { name: "Dell", logo: "https://logo.clearbit.com/dell.com" },
  { name: "Rapidfort", logo: "https://logo.clearbit.com/rapidfort.com" },
  { name: "Google", logo: "https://logo.clearbit.com/google.com" },
  { name: "Flipkart", logo: "https://logo.clearbit.com/flipkart.com" },
  { name: "AMD", logo: "https://logo.clearbit.com/amd.com" },
  { name: "Omnissa", logo: "https://logo.clearbit.com/omnissa.com" },
  { name: "Alstom", logo: "https://logo.clearbit.com/alstom.com" },
  { name: "Walmart", logo: "https://logo.clearbit.com/walmart.com" },
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
                <img 
                  src={company.logo} 
                  alt={company.name} 
                  className="company-logo-img"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <span className="company-name-fallback" style={{ display: 'none' }}>
                  {company.name}
                </span>
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
