import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (!storedUser || !storedUser.email || !storedUser.password) {
      navigate('/login');
    } else {
      fetchMovies();
    }
  }, [navigate]);

  const fetchMovies = async () => {
    try {
      const response = await axios.get('https://api.kinopoisk.dev/v1.4/movie', {
        headers: {
          'X-API-KEY': '0NWNHJ8-QBRMK6H-K5WVH3M-KBWFSF3', 
        },
        params: {
          year: 2023,
          'genres.name': 'криминал',
        },
      });

      setMovies(response.data.docs);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
    <h1 className="text-3xl font-bold text-center mb-6">Movie List</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {movies.map((movie) => (
        <div key={movie.id} className="bg-white rounded-lg shadow-md p-4">
          <img
            className="w-full h-64 object-cover rounded-t-lg"
            src={movie.poster?.url || 'https://via.placeholder.com/200'}
            alt={movie.name}
          />
          <div className="mt-4">
            <h3 className="text-lg font-semibold">{movie.name}</h3>
            <p className="text-gray-600">{movie.year}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
  );
};

export default Home;
