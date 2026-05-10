import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();

  const mainNav = [
    { path: '/', icon: '📊', label: 'Dashboard' },
    { path: '/employees', icon: '👥', label: 'Employees' },
    { path: '/add', icon: '➕', label: 'Add Employee' },
  ];

  const systemNav = [
    { path: '/settings', icon: '⚙️', label: 'Settings' },
    { path: '/about', icon: 'ℹ️', label: 'About Portal' },
  ];

  const NavItem = ({ path, icon, label }) => (
    <Link to={path} style={{
      ...styles.navItem,
      ...(location.pathname === path ? styles.navItemActive : {})
    }}>
      <span>{icon}</span>
      {label}
    </Link>
  );

  return (
    <aside style={styles.sidebar}>
      <div style={styles.logo}>
        <div style={styles.logoIcon}>🏛️</div>
        <div style={styles.logoText}>CSIR Portal</div>
        <div style={styles.logoSub}>Enterprise Dashboard</div>
      </div>

      <nav style={styles.nav}>
        <div style={styles.navLabel}>MAIN MENU</div>
        {mainNav.map(item => <NavItem key={item.path} {...item} />)}

        <div style={{ ...styles.navLabel, marginTop: '20px' }}>SYSTEM</div>
        {systemNav.map(item => <NavItem key={item.path} {...item} />)}
      </nav>

      <div style={styles.userBox}>
        <div style={styles.avatar}>ML</div>
        <div>
          <div style={styles.userName}>Mulagala P.</div>
          <div style={styles.userRole}>Intern Developer</div>
        </div>
      </div>
    </aside>
  );
}

const styles = {
  sidebar: { width: '220px', background: '#0f172a', minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, left: 0, zIndex: 100 },
  logo: { padding: '20px', borderBottom: '0.5px solid rgba(255,255,255,0.08)' },
  logoIcon: { fontSize: '28px', marginBottom: '8px' },
  logoText: { color: '#fff', fontSize: '15px', fontWeight: '600' },
  logoSub: { color: 'rgba(255,255,255,0.35)', fontSize: '11px', marginTop: '2px' },
  nav: { padding: '16px 0', flex: 1 },
  navLabel: { color: 'rgba(255,255,255,0.25)', fontSize: '10px', fontWeight: '600', letterSpacing: '0.08em', padding: '0 20px 8px', textTransform: 'uppercase' },
  navItem: { display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 20px', color: 'rgba(255,255,255,0.5)', fontSize: '13px', textDecoration: 'none', borderLeft: '2px solid transparent' },
  navItemActive: { color: '#fff', background: 'rgba(255,255,255,0.07)', borderLeftColor: '#6366f1' },
  userBox: { padding: '16px 20px', borderTop: '0.5px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', gap: '10px' },
  avatar: { width: '32px', height: '32px', borderRadius: '50%', background: '#4338ca', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '600', color: '#c7d2fe' },
  userName: { color: '#fff', fontSize: '12px', fontWeight: '500' },
  userRole: { color: 'rgba(255,255,255,0.35)', fontSize: '10px' },
};

export default Navbar;