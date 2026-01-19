import { Filter } from "@/context/app-reducer";
import { Album } from "@/types/components";

export const filterAlbums = (albums: Album[], filter: Filter): Album[] => {
  return albums.filter((albums) => {
    let yearMatches = true;
    let countryMatches = true;
    let genresMatches = true;

    const { to, from } = filter.years;

    if (from !== null && to !== null) {
      if (from < to && albums.releaseYear) {
        yearMatches = albums.releaseYear >= from && albums.releaseYear <= to;
      } else if (albums.releaseYear) {
        yearMatches = albums.releaseYear >= to && albums.releaseYear <= from;
      }
    }

    if (filter.countries.length > 0 && albums.country && !filter.countries.includes(albums.country)) {
      countryMatches = false;
    }

    if (filter.genres.length > 0 && albums.genre && !filter.genres.includes(albums.genre)) {
      genresMatches = false;
    }

    return yearMatches && countryMatches && genresMatches;
  });
};
