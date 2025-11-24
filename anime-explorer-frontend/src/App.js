import React, { useState } from 'react';
import { Loader2, RefreshCw, ImageIcon, Star, Calendar, Tv, Clock, TrendingUp, Film } from 'lucide-react';

function App() {
  const [randomAnime, setRandomAnime] = useState(null);
  const [animeDetails, setAnimeDetails] = useState(null);
  const [animePictures, setAnimePictures] = useState([]);
  const [loading, setLoading] = useState(false);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [error, setError] = useState(null);

  const BACKEND_URL = 'http://localhost:3001/api';

  const fetchRandomAnime = async () => {
    setLoading(true);
    setError(null);
    setRandomAnime(null);
    setAnimeDetails(null);
    setAnimePictures([]);

    try {
      const response = await fetch(`${BACKEND_URL}/random-anime`);
      if (!response.ok) throw new Error('Failed to fetch random anime');
      
      const data = await response.json();
      setRandomAnime(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchAnimeDetails = async () => {
    if (!randomAnime?.id) return;

    setDetailsLoading(true);
    setError(null);

    try {
      const detailsResponse = await fetch(`${BACKEND_URL}/anime/${randomAnime.id}`);
      if (!detailsResponse.ok) throw new Error('Failed to fetch anime details');
      const details = await detailsResponse.json();
      setAnimeDetails(details);

      const picturesResponse = await fetch(`${BACKEND_URL}/anime/${randomAnime.id}/pictures`);
      if (!picturesResponse.ok) throw new Error('Failed to fetch anime pictures');
      const pictures = await picturesResponse.json();
      setAnimePictures(pictures);
    } catch (err) {
      setError(err.message);
    } finally {
      setDetailsLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(to bottom right, #0f172a, #1e1b4b, #312e81)',
      padding: '2rem 1rem',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* Modern Header with Glassmorphism */}
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '3rem',
          padding: '2rem',
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(20px)',
          borderRadius: '24px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <Film size={48} color="#a78bfa" />
            <h1 style={{ 
              fontSize: '3.5rem', 
              fontWeight: '800', 
              background: 'linear-gradient(to right, #a78bfa, #ec4899, #f59e0b)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              margin: 0,
              letterSpacing: '-2px'
            }}>
              Anime Explorer
            </h1>
          </div>
          <p style={{ 
            color: '#cbd5e1', 
            fontSize: '1.2rem',
            fontWeight: '300',
            letterSpacing: '0.5px'
          }}>
            Discover, explore, and dive into the world of anime
          </p>
        </div>

        {/* Error Message - Modern Style */}
        {error && (
          <div style={{ 
            background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(220, 38, 38, 0.2))',
            border: '1px solid rgba(239, 68, 68, 0.5)',
            color: '#fecaca',
            padding: '1.5rem',
            borderRadius: '16px',
            marginBottom: '2rem',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 16px rgba(239, 68, 68, 0.2)'
          }}>
            <p style={{ fontWeight: 600, marginBottom: '0.5rem', fontSize: '1.1rem' }}>⚠️ Error</p>
            <p style={{ margin: 0 }}>{error}</p>
          </div>
        )}

        {/* Modern Action Button */}
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(20px)',
          borderRadius: '20px',
          padding: '2.5rem',
          marginBottom: '2rem',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
        }}>
          <button
            onClick={fetchRandomAnime}
            disabled={loading}
            style={{
              width: '100%',
              background: loading 
                ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' 
                : 'linear-gradient(135deg, #8b5cf6, #ec4899, #f59e0b)',
              color: 'white',
              fontWeight: '700',
              fontSize: '1.2rem',
              padding: '1.5rem 2.5rem',
              borderRadius: '16px',
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              opacity: loading ? 0.7 : 1,
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: loading 
                ? '0 8px 24px rgba(139, 92, 246, 0.4)' 
                : '0 12px 32px rgba(236, 72, 153, 0.5)',
              transform: loading ? 'scale(0.98)' : 'scale(1)',
              letterSpacing: '0.5px'
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.target.style.transform = 'scale(1.02) translateY(-2px)';
                e.target.style.boxShadow = '0 16px 40px rgba(236, 72, 153, 0.6)';
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = '0 12px 32px rgba(236, 72, 153, 0.5)';
              }
            }}
          >
            {loading ? (
              <>
                <Loader2 style={{ animation: 'spin 1s linear infinite' }} size={28} />
                <span>Discovering Anime...</span>
              </>
            ) : (
              <>
                <RefreshCw size={28} />
                <span>Discover Random Anime</span>
              </>
            )}
          </button>
        </div>

        {/* Modern Anime Card */}
        {randomAnime && (
          <div style={{ 
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            overflow: 'hidden',
            marginBottom: '2rem',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            transition: 'transform 0.3s ease'
          }}>
            <div style={{ 
              display: 'flex', 
              flexDirection: window.innerWidth >= 768 ? 'row' : 'column',
              gap: 0
            }}>
              {/* Image Section with Overlay */}
              <div style={{ 
                position: 'relative',
                width: window.innerWidth >= 768 ? '400px' : '100%',
                minHeight: '500px',
                overflow: 'hidden'
              }}>
                <img
                  src={randomAnime.image}
                  alt={randomAnime.title}
                  style={{ 
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '150px',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)'
                }} />
                
                {/* Score Badge */}
                {randomAnime.score && (
                  <div style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    background: 'rgba(0, 0, 0, 0.8)',
                    backdropFilter: 'blur(10px)',
                    padding: '0.75rem 1.25rem',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    border: '1px solid rgba(251, 191, 36, 0.5)',
                    boxShadow: '0 4px 16px rgba(251, 191, 36, 0.3)'
                  }}>
                    <Star size={20} color="#fbbf24" fill="#fbbf24" />
                    <span style={{ 
                      color: '#fbbf24', 
                      fontWeight: '700',
                      fontSize: '1.2rem'
                    }}>
                      {randomAnime.score}
                    </span>
                  </div>
                )}
              </div>

              {/* Content Section */}
              <div style={{ 
                flex: 1,
                padding: '2.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem'
              }}>
                <div>
                  <h2 style={{ 
                    fontSize: '2.5rem',
                    fontWeight: '800',
                    color: 'white',
                    marginBottom: '0.75rem',
                    lineHeight: '1.2',
                    letterSpacing: '-1px'
                  }}>
                    {randomAnime.title}
                  </h2>
                  {randomAnime.titleJapanese && (
                    <p style={{ 
                      color: '#a78bfa',
                      fontSize: '1.1rem',
                      fontWeight: '500',
                      marginBottom: 0
                    }}>
                      {randomAnime.titleJapanese}
                    </p>
                  )}
                </div>

                {/* Modern Tags */}
                <div style={{ 
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.75rem'
                }}>
                  {randomAnime.type && (
                    <div style={{
                      background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                      padding: '0.5rem 1.25rem',
                      borderRadius: '12px',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
                      border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}>
                      <Tv size={16} />
                      {randomAnime.type}
                    </div>
                  )}
                  {randomAnime.episodes && (
                    <div style={{
                      background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                      padding: '0.5rem 1.25rem',
                      borderRadius: '12px',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
                      border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}>
                      <Film size={16} />
                      {randomAnime.episodes} Episodes
                    </div>
                  )}
                </div>

                {/* Modern Action Button */}
                <button
                  onClick={fetchAnimeDetails}
                  disabled={detailsLoading}
                  style={{
                    background: detailsLoading
                      ? 'linear-gradient(135deg, #3b82f6, #2563eb)'
                      : 'linear-gradient(135deg, #06b6d4, #0891b2)',
                    color: 'white',
                    fontWeight: '700',
                    fontSize: '1.1rem',
                    padding: '1.25rem 2rem',
                    borderRadius: '14px',
                    border: 'none',
                    cursor: detailsLoading ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.75rem',
                    opacity: detailsLoading ? 0.7 : 1,
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    alignSelf: 'flex-start',
                    boxShadow: '0 8px 24px rgba(6, 182, 212, 0.4)',
                    letterSpacing: '0.3px'
                  }}
                  onMouseEnter={(e) => {
                    if (!detailsLoading) {
                      e.target.style.transform = 'scale(1.05) translateY(-2px)';
                      e.target.style.boxShadow = '0 12px 32px rgba(6, 182, 212, 0.6)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!detailsLoading) {
                      e.target.style.transform = 'scale(1)';
                      e.target.style.boxShadow = '0 8px 24px rgba(6, 182, 212, 0.4)';
                    }
                  }}
                >
                  {detailsLoading ? (
                    <>
                      <Loader2 style={{ animation: 'spin 1s linear infinite' }} size={22} />
                      <span>Loading Details...</span>
                    </>
                  ) : (
                    <>
                      <TrendingUp size={22} />
                      <span>Fetch Full Details</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modern Details Section */}
        {animeDetails && (
          <div style={{ 
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            padding: '2.5rem',
            marginBottom: '2rem',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
          }}>
            <h3 style={{ 
              fontSize: '2rem',
              fontWeight: '700',
              background: 'linear-gradient(to right, #a78bfa, #ec4899)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '2rem',
              letterSpacing: '-0.5px'
            }}>
              Detailed Information
            </h3>
            
            {/* Modern Info Grid */}
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: window.innerWidth >= 768 ? 'repeat(2, 1fr)' : '1fr',
              gap: '1.5rem',
              marginBottom: '2rem'
            }}>
              {[
                { icon: <Calendar size={20} />, label: 'Status', value: animeDetails.status },
                { icon: <Calendar size={20} />, label: 'Aired', value: animeDetails.aired },
                { icon: <Clock size={20} />, label: 'Duration', value: animeDetails.duration },
                { icon: <Star size={20} />, label: 'Rating', value: animeDetails.rating },
                { icon: <Film size={20} />, label: 'Source', value: animeDetails.source },
                { icon: <Tv size={20} />, label: 'Studios', value: animeDetails.studios },
                { icon: <TrendingUp size={20} />, label: 'Genres', value: animeDetails.genres },
                { icon: <TrendingUp size={20} />, label: 'Popularity', value: `#${animeDetails.popularity}` }
              ].map((item, index) => (
                <div key={index} style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  padding: '1.25rem',
                  borderRadius: '16px',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                    <div style={{ color: '#a78bfa' }}>{item.icon}</div>
                    <span style={{ 
                      fontWeight: '600',
                      color: '#94a3b8',
                      fontSize: '0.9rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      {item.label}
                    </span>
                  </div>
                  <p style={{ 
                    color: 'white',
                    fontSize: '1rem',
                    margin: 0,
                    fontWeight: '500'
                  }}>
                    {item.value || 'N/A'}
                  </p>
                </div>
              ))}
            </div>

            {/* Synopsis Section */}
            {animeDetails.synopsis && (
              <div style={{
                background: 'rgba(255, 255, 255, 0.03)',
                padding: '2rem',
                borderRadius: '16px',
                border: '1px solid rgba(255, 255, 255, 0.05)'
              }}>
                <p style={{ 
                  fontWeight: '600',
                  color: '#a78bfa',
                  marginBottom: '1rem',
                  fontSize: '1.1rem',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  Synopsis
                </p>
                <p style={{ 
                  color: '#cbd5e1',
                  lineHeight: '1.8',
                  fontSize: '1.05rem',
                  margin: 0
                }}>
                  {animeDetails.synopsis}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Modern Gallery */}
        {animePictures.length > 0 && (
          <div style={{ 
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            padding: '2.5rem',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
          }}>
            <div style={{ 
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '2rem'
            }}>
              <ImageIcon size={32} color="#a78bfa" />
              <h3 style={{ 
                fontSize: '2rem',
                fontWeight: '700',
                background: 'linear-gradient(to right, #a78bfa, #ec4899)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                margin: 0,
                letterSpacing: '-0.5px'
              }}>
                Gallery
              </h3>
              <span style={{
                background: 'rgba(167, 139, 250, 0.2)',
                color: '#a78bfa',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                fontSize: '0.9rem',
                fontWeight: '600'
              }}>
                {animePictures.length} Images
              </span>
            </div>
            
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: '1.5rem'
            }}>
              {animePictures.map((picture, index) => (
                <div 
                  key={index}
                  style={{ 
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: '16px',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05) translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 16px 40px rgba(0, 0, 0, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1) translateY(0)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.3)';
                  }}
                >
                  <img
                    src={picture.large || picture.small}
                    alt={`${randomAnime.title} - ${index + 1}`}
                    style={{ 
                      width: '100%',
                      height: '300px',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '1rem',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                    color: 'white',
                    fontSize: '0.9rem',
                    fontWeight: '600'
                  }}>
                    Image {index + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;