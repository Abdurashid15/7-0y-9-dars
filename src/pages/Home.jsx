// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaBookmark } from 'react-icons/fa';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [bookmarkedMovies, setBookmarkedMovies] = useState([]);
  const moviesPerPage = 12;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`https://api.kinopoisk.dev/v1.4/movie?rating.imdb=8-10&page=${currentPage}&limit=${moviesPerPage}`, {
          headers: {
            'X-API-KEY': '0NWNHJ8-QBRMK6H-K5WVH3M-KBWFSF3'
          } 
        });
        setMovies(response.data.docs);
        setTotalPages(Math.ceil(response.data.total / moviesPerPage)); 
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };
    fetchMovies();
  }, [currentPage]);

  useEffect(() => {
    const storedBookmarks = JSON.parse(localStorage.getItem('bookmarkedMovies')) || [];
    setBookmarkedMovies(storedBookmarks);
  }, []);

  const handleBookmark = (movie) => {
    const isAlreadyBookmarked = bookmarkedMovies.some((bookmarkedMovie) => bookmarkedMovie.id === movie.id);

    if (isAlreadyBookmarked) {
      alert('This movie is already bookmarked.');
      return;
    }

    const updatedBookmarks = [...bookmarkedMovies, movie];
    setBookmarkedMovies(updatedBookmarks);
    localStorage.setItem('bookmarkedMovies', JSON.stringify(updatedBookmarks));
  };

  const isBookmarked = (movieId) => {
    return bookmarkedMovies.some((movie) => movie.id === movieId);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-4">Recommended for you</h2>
        <div className="grid grid-cols-4 gap-4">
          {movies.map((movie) => (
            <div key={movie.id} className="relative w-80 rounded-lg overflow-hidden shadow-lg">
              <img src={movie.poster?.url} alt={movie.name} className="w-full h-48 object-cover" />
              <div className="absolute top-2 right-2">
                <FaBookmark
                  size={24}
                  className={`cursor-pointer ${isBookmarked(movie.id) ? 'text-white' : 'text-white opacity-30'}`}
                  onClick={() => handleBookmark(movie)}
                />
              </div>
              <div className="p-4 flex gap-2">
                <p className="text-sm text-gray-400">{movie.year}</p>
                <p className="text-sm text-gray-400">{movie.type}</p>
              </div>
              <h3 className="text-lg font-semibold">{movie.name}</h3>
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-800"
          >
            Previous
          </button>
          <span className="text-white">Page {currentPage} of {totalPages}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-800"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
