import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const translations = {
  en: {
    dashboard: 'Dashboard', beds: 'Bed Allotment', infection: 'Infection Monitor',
    medicine: 'Medicine Tracker', surge: 'Surge Predictor', green: 'Green Score',
    staff: 'Staff Schedule', wards: 'Ward Map', alerts: 'Alerts',patients: 'Patients',
    logout: 'Logout', darkMode: 'Dark Mode', hindi: 'हिंदी',
    liveVitals: 'LIVE VITALS', navigation: 'NAVIGATION', online: 'Online'
  },
  hi: {
    dashboard: 'डैशबोर्ड', beds: 'बेड आवंटन', infection: 'संक्रमण निगरानी',
    medicine: 'दवा ट्रैकर', surge: 'भीड़ पूर्वानुमान', green: 'ग्रीन स्कोर',
    staff: 'स्टाफ शेड्यूल', wards: 'वार्ड मैप', alerts: 'अलर्ट',patients: 'मरीज',
    logout: 'लॉगआउट', darkMode: 'डार्क मोड', hindi: 'English',
    liveVitals: 'लाइव विटल्स', navigation: 'नेविगेशन', online: 'ऑनलाइन'
  }
};

const menuItems = [
  { path: '/dashboard', icon: '🏠', key: 'dashboard' },
  { path: '/wards', icon: '🗺️', key: 'wards' },
  { path: '/beds', icon: '🛏️', key: 'beds' },
  { path: '/infection', icon: '🦠', key: 'infection' },
  { path: '/medicine', icon: '💊', key: 'medicine' },
  { path: '/surge', icon: '📈', key: 'surge' },
  { path: '/green', icon: '🌿', key: 'green' },
  { path: '/staff', icon: '👨‍⚕️', key: 'staff' },
  { path: '/alerts', icon: '🔔', key: 'alerts' },
  { path: '/patients', icon: '👥', key: 'patients' },
];

export default function Sidebar({ user, theme, language, onLogout, onToggleTheme, onToggleLanguage }) {
  const navigate = useNavigate();
  const location = useLocation();
  const t = translations[language];
  const [time, setTime] = useState(new Date());
  const [collapsed, setCollapsed] = useState(false);
  const [bedOccupancy, setBedOccupancy] = useState(70);
  const [greenScore, setGreenScore] = useState(72);
  const [criticalCount, setCriticalCount] = useState(3);
  const [alertCount, setAlertCount] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getInitials = (name) => {
    if (!name) return 'JX';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getRoleColor = (role) => {
    if (role === 'admin') return '#6B1E2E';
    if (role === 'doctor') return '#1E3A6B';
    return '#2D6A2D';
  };

  const sidebarStyle = {
    position: 'fixed',
    left: 0, top: 0, bottom: 0,
    width: collapsed ? '70px' : '260px',
    background: theme === 'dark' ? '#1A0A0F' : '#FFFFFF',
    borderRight: `1px solid ${theme === 'dark' ? '#4A2830' : '#E8D5C4'}`,
    display: 'flex',
    flexDirection: 'column',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    zIndex: 100,
    overflowY: 'auto',
    overflowX: 'hidden',
    boxShadow: '4px 0 20px rgba(107, 30, 46, 0.08)',
  };

  return (
    <div style={sidebarStyle}>

      {/* Logo */}
      <div style={{
        padding: collapsed ? '1.5rem 0' : '1.5rem',
        borderBottom: `1px solid ${theme === 'dark' ? '#4A2830' : '#E8D5C4'}`,
        display: 'flex', alignItems: 'center',
        justifyContent: collapsed ? 'center' : 'space-between'
      }}>
        {!collapsed && (
          <div>
            <div style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.25rem', fontWeight: '700',
              color: '#6B1E2E', letterSpacing: '2px'
            }}>
              ✦ JEEVIXA
            </div>
            <div style={{ fontSize: '0.65rem', color: '#C4956A', letterSpacing: '1px', marginTop: '2px' }}>
              SMART HOSPITAL OS
            </div>
          </div>
        )}
        {collapsed && <span style={{ fontSize: '1.2rem' }}>✦</span>}
        <button onClick={() => setCollapsed(!collapsed)} style={{
          background: 'transparent', border: 'none', cursor: 'pointer',
          color: '#C4956A', fontSize: '1rem', padding: '4px',
          transition: 'all 0.3s ease'
        }}>
          {collapsed ? '▶' : '◀'}
        </button>
      </div>

      {/* User Profile */}
      {!collapsed && (
        <div style={{
          padding: '1rem 1.5rem',
          borderBottom: `1px solid ${theme === 'dark' ? '#4A2830' : '#E8D5C4'}`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '40px', height: '40px', borderRadius: '50%',
              background: getRoleColor(user?.role),
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#FAF7F2', fontWeight: '600', fontSize: '0.875rem',
              flexShrink: 0, boxShadow: '0 2px 8px rgba(107,30,46,0.2)'
            }}>
              {getInitials(user?.name)}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontSize: '0.875rem', fontWeight: '500',
                color: theme === 'dark' ? '#F5E6E0' : '#2C1810',
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
              }}>
                {user?.name || 'Admin'}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                <span style={{
                  fontSize: '0.65rem', padding: '1px 6px', borderRadius: '10px',
                  background: getRoleColor(user?.role) + '22',
                  color: getRoleColor(user?.role),
                  textTransform: 'uppercase', letterSpacing: '0.5px'
                }}>
                  {user?.role || 'admin'}
                </span>
                <span style={{ fontSize: '0.65rem', color: '#2D6A2D' }}>● {t.online}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div style={{ padding: collapsed ? '1rem 0' : '1rem 0', flex: 1 }}>
        {!collapsed && (
          <div style={{
            fontSize: '0.65rem', color: '#9B7B6A',
            letterSpacing: '1.5px', padding: '0 1.5rem',
            marginBottom: '0.5rem', textTransform: 'uppercase'
          }}>
            {t.navigation}
          </div>
        )}

        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <div
              key={item.path}
              onClick={() => navigate(item.path)}
              style={{
                display: 'flex', alignItems: 'center',
                gap: collapsed ? '0' : '10px',
                padding: collapsed ? '0.75rem 0' : '0.75rem 1.5rem',
                justifyContent: collapsed ? 'center' : 'flex-start',
                cursor: 'pointer',
                background: isActive
                  ? (theme === 'dark' ? 'rgba(196,149,106,0.15)' : 'rgba(107,30,46,0.08)')
                  : 'transparent',
                borderLeft: isActive ? '3px solid #C4956A' : '3px solid transparent',
                transition: 'all 0.2s ease',
                position: 'relative',
              }}
              onMouseEnter={e => {
                if (!isActive) {
                  e.currentTarget.style.background = theme === 'dark'
                    ? 'rgba(196,149,106,0.08)' : 'rgba(107,30,46,0.04)';
                  e.currentTarget.style.borderLeft = '3px solid rgba(196,149,106,0.5)';
                }
              }}
              onMouseLeave={e => {
                if (!isActive) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.borderLeft = '3px solid transparent';
                }
              }}
            >
              <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>{item.icon}</span>
              {!collapsed && (
                <span style={{
                  fontSize: '0.875rem',
                  color: isActive
                    ? '#C4956A'
                    : (theme === 'dark' ? '#C4956A99' : '#6B4C3B'),
                  fontWeight: isActive ? '500' : '400',
                  flex: 1,
                }}>
                  {t[item.key]}
                </span>
              )}
              {!collapsed && item.key === 'alerts' && alertCount > 0 && (
                <span style={{
                  background: '#6B1E2E', color: '#FAF7F2',
                  fontSize: '0.65rem', padding: '1px 6px',
                  borderRadius: '10px', fontWeight: '600'
                }}>
                  {alertCount}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Live Vitals */}
      {!collapsed && (
        <div style={{
          padding: '1rem 1.5rem',
          borderTop: `1px solid ${theme === 'dark' ? '#4A2830' : '#E8D5C4'}`,
          borderBottom: `1px solid ${theme === 'dark' ? '#4A2830' : '#E8D5C4'}`,
        }}>
          <div style={{
            fontSize: '0.65rem', color: '#9B7B6A',
            letterSpacing: '1.5px', marginBottom: '0.75rem',
            textTransform: 'uppercase'
          }}>
            {t.liveVitals}
          </div>

          {/* Bed Occupancy */}
          <div style={{ marginBottom: '0.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ fontSize: '0.75rem', color: theme === 'dark' ? '#C4956A' : '#6B4C3B' }}>
                🛏️ Beds
              </span>
              <span style={{ fontSize: '0.75rem', fontWeight: '500', color: '#6B1E2E' }}>
                {bedOccupancy}%
              </span>
            </div>
            <div style={{ height: '4px', background: theme === 'dark' ? '#4A2830' : '#E8D5C4', borderRadius: '2px' }}>
              <div style={{
                height: '100%', borderRadius: '2px',
                width: `${bedOccupancy}%`,
                background: 'linear-gradient(90deg, #6B1E2E, #C4956A)',
                transition: 'width 0.5s ease'
              }} />
            </div>
          </div>

          {/* Green Score */}
          <div style={{ marginBottom: '0.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ fontSize: '0.75rem', color: theme === 'dark' ? '#C4956A' : '#6B4C3B' }}>
                🌿 Green
              </span>
              <span style={{ fontSize: '0.75rem', fontWeight: '500', color: '#2D6A2D' }}>
                {greenScore}/100
              </span>
            </div>
            <div style={{ height: '4px', background: theme === 'dark' ? '#4A2830' : '#E8D5C4', borderRadius: '2px' }}>
              <div style={{
                height: '100%', borderRadius: '2px',
                width: `${greenScore}%`,
                background: 'linear-gradient(90deg, #2D6A2D, #7EC87E)',
                transition: 'width 0.5s ease'
              }} />
            </div>
          </div>

          {/* Critical */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            padding: '6px 8px', borderRadius: '6px',
            background: 'rgba(107,30,46,0.08)',
          }}>
            <span style={{
              width: '6px', height: '6px', borderRadius: '50%',
              background: '#6B1E2E', animation: 'pulse 1.5s infinite',
              flexShrink: 0
            }} />
            <span style={{ fontSize: '0.75rem', color: '#6B1E2E' }}>
              {criticalCount} Critical Alerts
            </span>
          </div>
        </div>
      )}

      {/* Clock */}
      {!collapsed && (
        <div style={{
          padding: '0.75rem 1.5rem',
          borderBottom: `1px solid ${theme === 'dark' ? '#4A2830' : '#E8D5C4'}`,
          textAlign: 'center'
        }}>
          <div style={{
            fontFamily: 'monospace', fontSize: '1.1rem',
            color: '#6B1E2E', fontWeight: '600', letterSpacing: '2px'
          }}>
            {time.toLocaleTimeString('en-IN', { hour12: false })}
          </div>
          <div style={{ fontSize: '0.7rem', color: '#9B7B6A', marginTop: '2px' }}>
            {time.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}
          </div>
        </div>
      )}

      {/* Bottom Controls */}
      <div style={{ padding: collapsed ? '1rem 0' : '1rem 1.5rem' }}>

        {/* Theme Toggle */}
        <div
          onClick={onToggleTheme}
          style={{
            display: 'flex', alignItems: 'center',
            gap: collapsed ? '0' : '10px',
            justifyContent: collapsed ? 'center' : 'flex-start',
            padding: collapsed ? '0.75rem 0' : '0.5rem 0',
            cursor: 'pointer', borderRadius: '6px',
            transition: 'all 0.2s ease',
          }}
        >
          <span>{theme === 'dark' ? '☀️' : '🌙'}</span>
          {!collapsed && (
            <span style={{ fontSize: '0.8rem', color: theme === 'dark' ? '#C4956A' : '#6B4C3B' }}>
              {t.darkMode}
            </span>
          )}
        </div>

        {/* Language Toggle */}
        <div
          onClick={onToggleLanguage}
          style={{
            display: 'flex', alignItems: 'center',
            gap: collapsed ? '0' : '10px',
            justifyContent: collapsed ? 'center' : 'flex-start',
            padding: collapsed ? '0.75rem 0' : '0.5rem 0',
            cursor: 'pointer', borderRadius: '6px',
            transition: 'all 0.2s ease',
          }}
        >
          <span>🇮🇳</span>
          {!collapsed && (
            <span style={{ fontSize: '0.8rem', color: theme === 'dark' ? '#C4956A' : '#6B4C3B' }}>
              {t.hindi}
            </span>
          )}
        </div>

        {/* Logout */}
        <div
          onClick={onLogout}
          style={{
            display: 'flex', alignItems: 'center',
            gap: collapsed ? '0' : '10px',
            justifyContent: collapsed ? 'center' : 'flex-start',
            padding: collapsed ? '0.75rem 0' : '0.5rem 0',
            cursor: 'pointer', marginTop: '0.5rem',
            borderRadius: '6px', transition: 'all 0.2s ease',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(107,30,46,0.08)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          <span>🚪</span>
          {!collapsed && (
            <span style={{ fontSize: '0.8rem', color: '#6B1E2E', fontWeight: '500' }}>
              {t.logout}
            </span>
          )}
        </div>
      </div>

    </div>
  );
}