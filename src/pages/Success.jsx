import React from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Success = () => {
  return (
    <div style={{minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg-primary)', padding: '1rem'}}>
      <div style={{textAlign: 'center', background: 'white', padding: 'var(--success-padding, 4rem 2rem)', borderRadius: '1.5rem', boxShadow: 'var(--shadow-lg)', width: '100%', maxWidth: '500px'}}>
        <CheckCircle size={64} style={{color: '#10b981', margin: '0 auto 1.5rem'}} />
        <h1 style={{fontSize: '2rem', marginBottom: '1rem', color: 'var(--text-primary)'}}>Welcome Aboard!</h1>
        <p style={{fontSize: '1.125rem', color: 'var(--text-secondary)', marginBottom: '2rem'}}>
          Please check your email for further details and the WhatsApp community link.
        </p>
        <Link to="/" className="btn btn-primary" style={{display: 'inline-flex'}}>
          Return to Hub <ArrowRight className="ml-2" size={18} />
        </Link>
      </div>
    </div>
  );
};

export default Success;
