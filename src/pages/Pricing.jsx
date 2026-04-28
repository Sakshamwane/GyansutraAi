import React from 'react';
import { Check } from 'lucide-react';
import './Pricing.css';

const Pricing = () => {
  const plans = [
    {
      name: "Basic",
      price: "0",
      description: "Perfect for students getting started with their learning journey.",
      features: [
        "Access to basic LMS courses",
        "Community forum access",
        "Public study resources",
        "Email support",
        "Mobile app access"
      ],
      cta: "Get Started",
      highlight: false
    },
    {
      name: "Pro",
      price: "999",
      period: "/month",
      description: "Designed for serious learners who want to accelerate their growth.",
      features: [
        "Everything in Basic",
        "Premium course content",
        "AI-powered progress tracking",
        "Mock interview credits",
        "Priority support",
        "Certificate of completion"
      ],
      cta: "Go Pro",
      highlight: true
    },
    {
      name: "Institutional",
      price: "Custom",
      description: "Tailored solutions for colleges and training institutes.",
      features: [
        "Everything in Pro",
        "Bulk student enrollment",
        "Custom domain integration",
        "Advanced admin analytics",
        "White-label options",
        "Dedicated account manager"
      ],
      cta: "Contact Sales",
      highlight: false
    }
  ];

  return (
    <div className="pricing-page">
      <section className="pricing-hero">
        <div className="container">
          <h1 className="gradient-text">Simple, Transparent Pricing</h1>
          <p>Choose the plan that fits your learning goals and start your journey today.</p>
        </div>
      </section>

      <section className="pricing-grid-section container">
        <div className="pricing-grid">
          {plans.map((plan, index) => (
            <div key={index} className={`pricing-card glass-panel ${plan.highlight ? 'highlight' : ''} animate-fade-in`} style={{ animationDelay: `${index * 100}ms` }}>
              {plan.highlight && <div className="popular-badge">Most Popular</div>}
              <div className="plan-header">
                <h3>{plan.name}</h3>
                <div className="plan-price">
                  <span className="currency">{plan.price !== 'Custom' ? '₹' : ''}</span>
                  <span className="amount">{plan.price}</span>
                  {plan.period && <span className="period">{plan.period}</span>}
                </div>
                <p>{plan.description}</p>
              </div>
              
              <ul className="plan-features">
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex}>
                    <Check size={18} className="check-icon" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button className={`btn ${plan.highlight ? 'btn-primary' : 'btn-secondary'} btn-block`}>
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Pricing;
