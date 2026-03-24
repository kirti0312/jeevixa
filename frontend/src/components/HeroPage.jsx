import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function HeroPage() {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const [count, setCount] = useState({ beds: 0, wards: 0, patients: 0 });
  const [scrollY, setScrollY] = useState(0);

  // Counter animation
  useEffect(() => {
    const targets = { beds: 420, wards: 12, patients: 1200 };
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount({
        beds: Math.round(targets.beds * ease),
        wards: Math.round(targets.wards * ease),
        patients: Math.round(targets.patients * ease),
      });
      if (step >= steps) clearInterval(timer);
    }, interval);
    return () => clearInterval(timer);
  }, []);

  // ECG Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    let x = 0;
    const drawECG = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = 'rgba(196, 149, 106, 0.6)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let i = 0; i < canvas.width; i++) {
        const p = (i + x) % 120;
        let y = canvas.height / 2;
        if (p < 5) y -= Math.sin(p / 5 * Math.PI) * 8;
        else if (p === 20) y -= 15;
        else if (p === 22) y += 20;
        else if (p === 24) y -= 45;
        else if (p === 26) y += 12;
        else if (p === 28) y = canvas.height / 2;
        else if (p > 35 && p < 50) y -= Math.sin((p - 35) / 15 * Math.PI) * 10;
        i === 0 ? ctx.moveTo(i, y) : ctx.lineTo(i, y);
      }
      ctx.stroke();
      x += 1.5;
      requestAnimationFrame(drawECG);
    };
    drawECG();
  }, []);

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    { icon: '🛏️', title: 'AI Bed Allotment', desc: 'Automatically assigns the best bed based on patient condition, infection risk and equipment availability' },
    { icon: '🦠', title: 'Infection Control', desc: 'Real-time infection risk scoring per ward with UV-C cycle tracking and air quality monitoring' },
    { icon: '🌿', title: 'Green Score', desc: 'Live sustainability score tracking CO₂ emissions, energy usage and pharmaceutical waste' },
    { icon: '📈', title: 'Surge Prediction', desc: 'AI predicts patient admissions 4 hours in advance helping hospitals prepare staff and resources' },
    { icon: '💊', title: 'Medicine Tracker', desc: 'Tracks expiry dates, prevents waste and calculates environmental impact of pharmaceutical disposal' },
    { icon: '🤖', title: 'Gemini AI Assistant', desc: 'Ask anything about your hospital in plain English and get instant intelligent answers' },
  ];

  const stats = [
    { value: count.beds, label: 'Beds Managed', suffix: '+' },
    { value: count.wards, label: 'Active Wards', suffix: '' },
    { value: count.patients, label: 'Patients Served', suffix: '+' },
    { value: 4.4, label: '% Global Emissions', suffix: '%', fixed: true },
  ];

  return (
    <div style={{ background: '#FAF7F2', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif" }}>

      {/* Navbar */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: scrollY > 50 ? 'rgba(250,247,242,0.95)' : 'transparent',
        backdropFilter: scrollY > 50 ? 'blur(12px)' : 'none',
        borderBottom: scrollY > 50 ? '1px solid #E8D5C4' : 'none',
        padding: '1rem 2rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        transition: 'all 0.3s ease',
      }}>
        <div style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '1.25rem', fontWeight: '700',
          color: '#6B1E2E', letterSpacing: '2px'
        }}>
          ✦ JEEVIXA
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            onClick={() => navigate('/login')}
            style={{
              background: 'transparent', border: '1px solid #C4956A',
              color: '#C4956A', padding: '0.5rem 1.25rem',
              borderRadius: '8px', cursor: 'pointer',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.875rem', transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => { e.target.style.background = '#C4956A'; e.target.style.color = '#FAF7F2'; }}
            onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = '#C4956A'; }}
          >
            Login
          </button>
          <button
            onClick={() => navigate('/login')}
            style={{
              background: '#6B1E2E', border: 'none',
              color: '#FAF7F2', padding: '0.5rem 1.25rem',
              borderRadius: '8px', cursor: 'pointer',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.875rem', transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => e.target.style.background = '#4A0F1E'}
            onMouseLeave={e => e.target.style.background = '#6B1E2E'}
          >
            Get Started →
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '6rem 2rem 4rem', textAlign: 'center',
        position: 'relative', overflow: 'hidden',
      }}>

        {/* Background decoration */}
        <div style={{
          position: 'absolute', top: '10%', right: '5%',
          width: '300px', height: '300px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(196,149,106,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '10%', left: '5%',
          width: '200px', height: '200px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(107,30,46,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* Badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          padding: '0.35rem 1rem', borderRadius: '20px',
          background: 'rgba(107,30,46,0.08)',
          border: '1px solid rgba(107,30,46,0.15)',
          fontSize: '0.75rem', color: '#6B1E2E',
          letterSpacing: '1px', marginBottom: '1.5rem',
          animation: 'fadeUp 0.6s ease both',
        }}>
          🇮🇳 MADE FOR INDIA · AI-POWERED HEALTHCARE
        </div>

        {/* Main Heading */}
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
          fontWeight: '700', lineHeight: '1.15',
          color: '#2C1810', marginBottom: '1rem',
          maxWidth: '800px',
          animation: 'fadeUp 0.6s ease 0.1s both',
        }}>
          India's First
          <span style={{ color: '#6B1E2E', display: 'block' }}>
            AI-Powered Smart
          </span>
          Hospital OS
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: '1.1rem', color: '#6B4C3B',
          maxWidth: '600px', lineHeight: '1.7',
          marginBottom: '2.5rem',
          animation: 'fadeUp 0.6s ease 0.2s both',
        }}>
          Jeevixa predicts crises before they happen, protects patients from infections,
          and makes hospitals green — all from one intelligent dashboard.
        </p>

        {/* CTA Buttons */}
        <div style={{
          display: 'flex', gap: '1rem', flexWrap: 'wrap',
          justifyContent: 'center', marginBottom: '4rem',
          animation: 'fadeUp 0.6s ease 0.3s both',
        }}>
          <button
            onClick={() => navigate('/login')}
            style={{
              background: '#6B1E2E', color: '#FAF7F2',
              border: 'none', padding: '0.875rem 2rem',
              borderRadius: '10px', fontSize: '1rem',
              fontWeight: '500', cursor: 'pointer',
              fontFamily: "'DM Sans', sans-serif",
              boxShadow: '0 4px 16px rgba(107,30,46,0.3)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 8px 24px rgba(107,30,46,0.4)'; }}
            onMouseLeave={e => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 4px 16px rgba(107,30,46,0.3)'; }}
          >
            Enter Dashboard →
          </button>
          <button
            style={{
              background: 'transparent', color: '#C4956A',
              border: '1px solid #C4956A', padding: '0.875rem 2rem',
              borderRadius: '10px', fontSize: '1rem',
              cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => { e.target.style.background = '#C4956A'; e.target.style.color = '#FAF7F2'; }}
            onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = '#C4956A'; }}
          >
            Watch Demo ▶
          </button>
        </div>

        {/* ECG Line */}
        <div style={{
          width: '100%', maxWidth: '700px', height: '60px',
          marginBottom: '3rem', opacity: 0.7,
          animation: 'fadeIn 1s ease 0.5s both',
        }}>
          <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
        </div>

        {/* Stats */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1.5rem', maxWidth: '700px', width: '100%',
          animation: 'fadeUp 0.6s ease 0.4s both',
        }}>
          {stats.map((stat, i) => (
            <div key={i} style={{
              background: '#FFFFFF', border: '1px solid #E8D5C4',
              borderRadius: '12px', padding: '1.25rem',
              boxShadow: '0 2px 12px rgba(107,30,46,0.06)',
              transition: 'all 0.3s ease',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(107,30,46,0.12)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(107,30,46,0.06)'; }}
            >
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '1.75rem', fontWeight: '700',
                color: '#6B1E2E', lineHeight: '1',
              }}>
                {stat.fixed ? stat.value : stat.value}{stat.suffix}
              </div>
              <div style={{ fontSize: '0.7rem', color: '#9B7B6A', marginTop: '4px', lineHeight: '1.3' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section style={{
        padding: '6rem 2rem',
        background: '#FFFFFF',
        borderTop: '1px solid #E8D5C4',
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div style={{
              fontSize: '0.75rem', color: '#C4956A',
              letterSpacing: '2px', textTransform: 'uppercase',
              marginBottom: '0.75rem'
            }}>
              WHAT JEEVIXA DOES
            </div>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
              color: '#2C1810', fontWeight: '700',
            }}>
              Every Feature Built for<br />
              <span style={{ color: '#6B1E2E' }}>Real Indian Hospitals</span>
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
          }}>
            {features.map((f, i) => (
              <div key={i} style={{
                background: '#FAF7F2', border: '1px solid #E8D5C4',
                borderRadius: '16px', padding: '2rem',
                transition: 'all 0.3s ease', cursor: 'default',
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(107,30,46,0.12)';
                  e.currentTarget.style.borderColor = '#C4956A';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = '#E8D5C4';
                }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{f.icon}</div>
                <h3 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '1.1rem', color: '#2C1810',
                  marginBottom: '0.75rem', fontWeight: '600',
                }}>
                  {f.title}
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#6B4C3B', lineHeight: '1.6' }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section style={{ padding: '6rem 2rem', background: '#FAF7F2' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{
            background: '#FFFFFF', border: '1px solid #E8D5C4',
            borderRadius: '20px', padding: '3rem',
            boxShadow: '0 4px 24px rgba(107,30,46,0.08)',
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏥</div>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
              color: '#2C1810', marginBottom: '1.5rem',
            }}>
              The Problem We're Solving
            </h2>
            <p style={{ fontSize: '1rem', color: '#6B4C3B', lineHeight: '1.8', marginBottom: '2rem' }}>
              Healthcare accounts for <strong style={{ color: '#6B1E2E' }}>4.4% of global greenhouse gas emissions</strong>.
              If hospitals were a country, they'd be the <strong style={{ color: '#6B1E2E' }}>5th largest polluter on Earth</strong>.
              Meanwhile, millions of patients in India contract infections <em>from</em> the hospital itself every year.
              Most government hospitals still run on paper registers and Excel sheets.
            </p>
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1rem', marginBottom: '2rem',
            }}>
              {[
                { num: '4.4%', label: 'Global emissions from healthcare' },
                { num: '1 in 10', label: 'Patients get hospital infections' },
                { num: '90%', label: 'Govt hospitals still use paper' },
              ].map((item, i) => (
                <div key={i} style={{
                  background: 'rgba(107,30,46,0.04)',
                  border: '1px solid rgba(107,30,46,0.1)',
                  borderRadius: '10px', padding: '1rem',
                }}>
                  <div style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '1.5rem', color: '#6B1E2E', fontWeight: '700',
                  }}>{item.num}</div>
                  <div style={{ fontSize: '0.75rem', color: '#9B7B6A', marginTop: '4px' }}>{item.label}</div>
                </div>
              ))}
            </div>
            <button
              onClick={() => navigate('/login')}
              style={{
                background: '#6B1E2E', color: '#FAF7F2',
                border: 'none', padding: '0.875rem 2.5rem',
                borderRadius: '10px', fontSize: '1rem',
                cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
                fontWeight: '500', transition: 'all 0.3s ease',
                boxShadow: '0 4px 16px rgba(107,30,46,0.3)',
              }}
              onMouseEnter={e => e.target.style.background = '#4A0F1E'}
              onMouseLeave={e => e.target.style.background = '#6B1E2E'}
            >
              See Jeevixa in Action →
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '2rem',
        background: '#2C1810', color: '#C4956A',
        textAlign: 'center',
      }}>
        <div style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '1.1rem', letterSpacing: '2px',
          marginBottom: '0.5rem',
        }}>
          ✦ JEEVIXA OS
        </div>
        <div style={{ fontSize: '0.75rem', color: '#9B7B6A' }}>
          Built with ❤️ for India · Smart Hospital Management System
        </div>
      </footer>

    </div>
  );
}