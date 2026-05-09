import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={styles.nav}>
      <h2 style={styles.brand}>🏢 Enterprise Dashboard</h2>
      <div style={styles.links}>
        <Link to="/" style={styles.link}>Dashboard</Link>
        <Link to="/employees" style={styles.link}>Employees</Link>
        <Link to="/add" style={styles.link}>+ Add Employee</Link>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    background: '#1a1a2e',
    padding: '0 30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '60px',
    position: 'sticky',
    top: 0,
    zIndex: 100
  },
  brand: { color: '#e94560', margin: 0, fontSize: '20px' },
  links: { display: 'flex', gap: '24px' },
  link: {
    color: '#ffffff',
    textDecoration: 'none',
    fontSize: '15px',
    padding: '6px 12px',
    borderRadius: '6px',
    transition: 'background 0.2s'
  }
};

export default Navbar;