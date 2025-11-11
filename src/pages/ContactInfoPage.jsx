import React, { useState } from 'react';
import './ContactInfoPage.css';
import AdvancedFooter from '../components/AdvancedFooter';

const ContactInfoPage = () => {
  const [activeBranch, setActiveBranch] = useState(null);

  const branches = [
    {
      id: 1,
      name: "DUBAI HEADQUARTERS",
      address: "Downtown Dubai, Burj Khalifa District",
      phone: "+971 4 123 4567",
      email: "dubai@alnoorarchitects.com"
    },
    {
      id: 2,
      name: "ABU DHABI OFFICE",
      address: "Al Maryah Island, Financial District",
      phone: "+971 2 123 4567",
      email: "abudhabi@alnoorarchitects.com"
    },
    {
      id: 3,
      name: "RIYADH STUDIO",
      address: "King Abdullah Financial District",
      phone: "+966 11 123 4567",
      email: "riyadh@alnoorarchitects.com"
    },
    {
      id: 4,
      name: "DOHA DESIGN CENTER",
      address: "West Bay, Diplomatic Area",
      phone: "+974 4 123 4567",
      email: "doha@alnoorarchitects.com"
    },
    {
      id: 5,
      name: "MUSCAT HERITAGE DIVISION",
      address: "Al Khuwair, Ministry District",
      phone: "+968 24 123 4567",
      email: "muscat@alnoorarchitects.com"
    },
    {
      id: 6,
      name: "BAHRAIN WATERFRONT STUDIO",
      address: "Bahrain Bay, Diplomatic Area",
      phone: "+973 17 123 4567",
      email: "bahrain@alnoorarchitects.com"
    }
  ];

  const handleBranchHover = (branchId) => {
    setActiveBranch(branchId);
  };

  const handleBranchLeave = () => {
    setActiveBranch(null);
  };

  return (
    <div className="contact-info-page">
      {/* Enhanced Background with Middle Eastern pattern */}
      <div className="parallax-bg"></div>
      <div className="islamic-pattern"></div>
      
      <div className="contact-container">
        {/* Header */}
        <div className="contact-header">
          <div className="title-decoration">
            <div className="decoration-line left"></div>
            <h1 className="main-title">
              <span className="title-word">OUR</span>
              <span className="title-word">CONTACT</span>
            </h1>
            <div className="decoration-line right"></div>
          </div>
        </div>

        {/* Centered branches list - effects preserved */}
        <div className="branches-list-centered">
          {branches.map((branch, index) => (
            <div
              key={branch.id}
              className={`branch-item-simple ${activeBranch === branch.id ? 'active' : ''}`}
              onMouseEnter={() => handleBranchHover(branch.id)}
              onMouseLeave={handleBranchLeave}
              style={{ 
                animationDelay: `${index * 0.15}s`,
              }}
            >
              <div className="branch-content">
                <h2 className="branch-name-simple">
                  {branch.name}
                </h2>
                
                <p className="branch-address-simple">{branch.address}</p>
                
                <div className="branch-contact-info-simple">
                  <div className="contact-item-simple">
                    <span className="contact-icon">📞</span>
                    <span className="contact-text-simple">{branch.phone}</span>
                  </div>
                  <div className="contact-item-simple">
                    <span className="contact-icon">✉️</span>
                    <span className="contact-text-simple">{branch.email}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="contact-footer-wrapper">
        <AdvancedFooter />
      </div>
    </div>
  );
};

export default ContactInfoPage;