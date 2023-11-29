import { config } from '@/app/config';
import { Genres } from '@/app/types/Genre';
import { Banner } from './components/Banner';

import { MovieRow } from './components/MovieRow';
import { getFeaturedMovie, getMoviesByGenre } from './service/movieService';
import { Header } from './components/Header';

export default async function Home() {
  const randomMovieId =
    config.featuredIds[Math.floor(Math.random() * config.featuredIds.length)];
  const featuredMovie = await getFeaturedMovie(randomMovieId);
  const featuredGenres = [Genres.Animation, Genres.SiFi, Genres.Adventure];

  const movies = await Promise.all(
    featuredGenres.map(async (genre) => {
      const movies = await getMoviesByGenre(genre, { _limit: 8 });
      return { sectionTitle: genre, movies };
    })
  );
  return (
    <div className='relative bg-gradient-to-b pb-8'>
      <Header />
      <main className='relative overflow-y-scroll p-8 pb-20 scrollbar-hide lg:pl-16 '>
        <Banner movie={featuredMovie} />
        {movies.map((movie) => (
          <MovieRow
            movies={movie.movies}
            key={movie.sectionTitle}
            sectionTitle={movie.sectionTitle}
          />
        ))}
      </main>
    </div>
  );
}
