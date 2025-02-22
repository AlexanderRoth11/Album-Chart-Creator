import { Album } from "@/types/components";

export type Filter = {
  countries: string[];
  genres: string[];
  years: { from: number | null; to: number | null };
};

export type State = {
  largeAlbums: Album[];
  mediumAlbums: Album[];
  smallAlbums: Album[];
  filter: Filter;
  genreOptions: Set<string>;
};

export const initialState: State = {
  largeAlbums: [],
  mediumAlbums: [],
  smallAlbums: [],
  filter: {
    countries: [],
    genres: [],
    years: { from: null, to: null },
  },
  genreOptions: new Set(),
};

export type Action =
  | { type: "UPDATE_ALBUMS"; key: "largeAlbums" | "mediumAlbums" | "smallAlbums"; payload: { action: "ADD" | "REMOVE" | "UPDATE"; value: Album } }
  | { type: "REPLACE_ALBUMS"; key: "largeAlbums" | "mediumAlbums" | "smallAlbums"; payload: Album[] }
  | {
      type: "UPDATE_FILTER";
      key: "countries" | "genres" | "years";
      payload: {
        yearsValues?: { from: number | null; to: number | null };
        action?: "ADD" | "REMOVE";
        filterString?: string;
      };
    }
  | { type: "CLEAR_FILTERS" }
  | { type: "ADD_GENRE_OPTIONS"; payload: string }
  | { type: "REPLACE_GENRE_OPTIONS"; payload: Set<string> };

export const appReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "UPDATE_ALBUMS":
      const { key, payload } = action;
      switch (payload.action) {
        case "ADD":
          return {
            ...state,
            [key]: [...state[key], payload.value],
          };

        case "REMOVE":
          return {
            ...state,
            [key]: state[key].filter((item) => item !== payload.value),
          };

        case "UPDATE":
          return {
            ...state,
            [key]: state[key].map((item) => (item.id === payload.value.id ? payload.value : item)),
          };

        default:
          return state;
      }

    case "REPLACE_ALBUMS":
      const { key: replaceKey, payload: newArray } = action;
      return {
        ...state,
        [replaceKey]: newArray,
      };

    case "UPDATE_FILTER":
      const { key: filterKey, payload: filterPayload } = action;

      if (filterKey === "years") {
        return {
          ...state,
          filter: {
            ...state.filter,
            [filterKey]: filterPayload.yearsValues ?? { from: 1900, to: 2100 },
          },
        };
      } else if (filterPayload.action === "ADD") {
        return {
          ...state,
          filter: {
            ...state.filter,
            [filterKey]: [...state.filter[filterKey], filterPayload.filterString ?? ""],
          },
        };
      } else {
        return {
          ...state,
          filter: {
            ...state.filter,
            [filterKey]: state.filter[filterKey].filter((item) => item !== filterPayload.filterString),
          },
        };
      }

    case "CLEAR_FILTERS":
      return {
        ...state,
        filter: {
          countries: [],
          genres: [],
          years: { from: null, to: null },
        },
      };

    case "ADD_GENRE_OPTIONS":
      const { payload: option } = action;
      return {
        ...state,
        genreOptions: new Set([...state.genreOptions, option]),
      };

    case "REPLACE_GENRE_OPTIONS":
      return {
        ...state,
        genreOptions: new Set(action.payload),
      };

    default:
      return state;
  }
};

// const albums: Album[] = [];

// const tonkpils: Album = {
//   country: CountryEnum.US,
//   genre: "Nu Metal",
//   releaseYear: 1999,
//   album: "Slipknot",
//   band: "Slipknot",
//   img: "https://upload.wikimedia.org/wikipedia/en/4/44/Slipknot_-_Slipknot2.jpg",
// };
// const carach: Album = {
//   country: CountryEnum.NL,
//   releaseYear: 2010,
//   genre: "Symphonic black metal",
//   album: "Death Came Through a Phantom Ship",
//   band: "Carach Angren",
//   img: "https://upload.wikimedia.org/wikipedia/en/5/53/Death_Came_through_a_Phantom_Ship_%28Carach_Angren%29_album_cover.jpg",
// };
// const diliger: Album = {
//   country: CountryEnum.US,
//   genre: "Mathcore",
//   releaseYear: 1999,
//   album: "Calculating Infinity",
//   band: " The Dillinger Escape Plan",
//   img: "https://upload.wikimedia.org/wikipedia/en/c/ce/CalculatingInfinity.jpg",
// };
// const diss: Album = {
//   country: CountryEnum.SE,
//   releaseYear: 1995,
//   genre: "Melodic black metal",
//   album: "Storm of the Light's Bane",
//   band: "Dissection",
//   img: "https://upload.wikimedia.org/wikipedia/en/7/70/Dissection_stormofthelightsbane.jpg",
// };

// const hb: Album = {
//   country: CountryEnum.US,
//   releaseYear: 2000,
//   genre: "Nu Metal",
//   album: "Hybrid Theory",
//   band: "Linkin Park",
//   img: "https://upload.wikimedia.org/wikipedia/en/2/2a/Linkin_Park_Hybrid_Theory_Album_Cover.jpg",
// };

// const sleep: Album = {
//   country: CountryEnum.GB,
//   releaseYear: 2021,
//   genre: "Alternative Metal",
//   album: "This Place Will Become Your Tomb",
//   band: "Sleep Token",
//   img: "https://upload.wikimedia.org/wikipedia/en/9/9f/SleepTokenTPWBYT.jpg",
// };

// albums.push(hb);
// albums.push(carach);
// albums.push(diliger);
// albums.push(sleep);

// const items1 = [...albums];
// const items2 = [...albums];
// const items3 = [...albums];

// for (let i = 0; i < 10; i++) {
//   items2.push(diss);
//   items2.push(tonkpils);
// }

// for (let i = 0; i < 29; i++) {
//   items3.push(diss);
//   items3.push(tonkpils);
// }
