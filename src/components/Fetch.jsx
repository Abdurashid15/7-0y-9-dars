// Импортируем Axios
import React, { useEffect } from 'react';
import axios from 'axios';

const FetchMovies = () => {
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('https://api.kinopoisk.dev/v1.4/movie', {
          headers: {
            'X-API-KEY': '0NWNHJ8-QBRMK6H-K5WVH3M-KBWFSF3', // ваш токен
          },
          params: {
            year: 2023,
            'genres.name': 'криминал',
          },
        });

        console.log(response.data); // Выводим данные в консоль
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []); // Пустой массив зависимостей, чтобы useEffect сработал только при монтировании компонента

  return (
    <div>
      <h1>Fetching Movies...</h1>
    </div>
  );
};

export default FetchMovies;
