const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Jikan API base URL
const JIKAN_API_BASE = 'https://api.jikan.moe/v4';

// Rate limiting helper - Jikan API has rate limits
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// ============================================
// ROUTE 1: Get Random Anime
// ============================================
app.get('/api/random-anime', async (req, res) => {
  try {
    console.log('Fetching random anime...');
    
    const response = await axios.get(`${JIKAN_API_BASE}/random/anime`);
    const anime = response.data.data;
    
    // Extract only the necessary data
    const simplifiedAnime = {
      id: anime.mal_id,
      title: anime.title,
      titleJapanese: anime.title_japanese,
      image: anime.images.jpg.large_image_url || anime.images.jpg.image_url,
      type: anime.type,
      episodes: anime.episodes,
      score: anime.score,
    };
    
    console.log(`Random anime fetched: ${simplifiedAnime.title} (ID: ${simplifiedAnime.id})`);
    res.json(simplifiedAnime);
    
  } catch (error) {
    console.error('Error fetching random anime:', error.message);
    res.status(500).json({ 
      error: 'Failed to fetch random anime',
      message: error.message 
    });
  }
});

// ============================================
// ROUTE 2: Get Anime Details by ID
// ============================================
app.get('/api/anime/:id', async (req, res) => {
  try {
    const animeId = req.params.id;
    console.log(`Fetching details for anime ID: ${animeId}`);
    
    // Add a small delay to respect rate limits
    await delay(500);
    
    const response = await axios.get(`${JIKAN_API_BASE}/anime/${animeId}`);
    const anime = response.data.data;
    
    // Extract detailed information
    const detailedAnime = {
      id: anime.mal_id,
      title: anime.title,
      titleJapanese: anime.title_japanese,
      status: anime.status,
      aired: anime.aired.string,
      duration: anime.duration,
      rating: anime.rating,
      source: anime.source,
      studios: anime.studios.map(studio => studio.name).join(', ') || 'N/A',
      genres: anime.genres.map(genre => genre.name).join(', ') || 'N/A',
      popularity: anime.popularity,
      synopsis: anime.synopsis,
      score: anime.score,
      episodes: anime.episodes,
      type: anime.type,
    };
    
    console.log(`Details fetched for: ${detailedAnime.title}`);
    res.json(detailedAnime);
    
  } catch (error) {
    console.error(`Error fetching anime details for ID ${req.params.id}:`, error.message);
    res.status(500).json({ 
      error: 'Failed to fetch anime details',
      message: error.message 
    });
  }
});

// ============================================
// ROUTE 3: Get Anime Pictures by ID
// ============================================
app.get('/api/anime/:id/pictures', async (req, res) => {
  try {
    const animeId = req.params.id;
    console.log(`Fetching pictures for anime ID: ${animeId}`);
    
    // Add a small delay to respect rate limits
    await delay(500);
    
    const response = await axios.get(`${JIKAN_API_BASE}/anime/${animeId}/pictures`);
    const pictures = response.data.data;
    
    // Simplify picture data
    const simplifiedPictures = pictures.map(pic => ({
      large: pic.jpg.large_image_url,
      small: pic.jpg.image_url
    }));
    
    console.log(`Fetched ${simplifiedPictures.length} pictures for anime ID: ${animeId}`);
    res.json(simplifiedPictures);
    
  } catch (error) {
    console.error(`Error fetching pictures for anime ID ${req.params.id}:`, error.message);
    res.status(500).json({ 
      error: 'Failed to fetch anime pictures',
      message: error.message 
    });
  }
});

// ============================================
// Health Check Route
// ============================================
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Anime Explorer Backend is running!',
    timestamp: new Date().toISOString()
  });
});

// ============================================
// Start Server
// ============================================
app.listen(PORT, () => {
  console.log('===========================================');
  console.log(`🚀 Anime Explorer Backend Server Running`);
  console.log(`📡 Port: ${PORT}`);
  console.log(`🌐 Health Check: http://localhost:${PORT}/api/health`);
  console.log('===========================================');
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});