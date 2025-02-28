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