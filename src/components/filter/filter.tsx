import React from "react";
import { useAppContext } from "@/context/app-context";
import Checkbox from "../checkbox/checkbox";

type FilterProps = {
  items: string[];
  filterKey: "countries" | "genres";
};

const Filter = ({ items, filterKey }: FilterProps) => {
  const { state, dispatch } = useAppContext();
  const currentFilter = state.filter[filterKey] as string[];

  const updateItems = (item: string, checked: boolean) => {
    if (checked) {
      dispatch({ type: "UPDATE_FILTER", key: filterKey, payload: { action: "ADD", filterString: item } });
    } else {
      dispatch({ type: "UPDATE_FILTER", key: filterKey, payload: { action: "REMOVE", filterString: item } });
    }
  };

  const getCount = (item: string) => {
    const albums = state.largeAlbums.concat(state.mediumAlbums, state.smallAlbums);

    if (filterKey === "genres") {
      return "(".concat(albums.filter((album) => album.genre === item).length.toString(), ")");
    } else {
      return "(".concat(albums.filter((album) => album.country === item).length.toString(), ")");
    }
  };

  return items.map((item) => {
    return (
      <div className="flex items-center gap-1" key={item}>
        <Checkbox name={item} label={item} checked={currentFilter.includes(item)} onChange={updateItems} />
        <span className="text-xs text-gray-500"> {getCount(item)}</span>
      </div>
    );
  });
};
export default Filter;
