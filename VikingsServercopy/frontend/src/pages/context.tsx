import React, { createContext, useState, ReactNode } from 'react';
import { T_Place } from 'src/modules/types.ts'; 
import { PlaceMocks } from 'src/modules/mocks.ts';

interface SearchContextType {
  placeName: string;
  setPlaceName: React.Dispatch<React.SetStateAction<string>>;
  places: T_Place[];
  setPlaces: React.Dispatch<React.SetStateAction<T_Place[]>>;
  isMock: boolean;
  setIsMock: React.Dispatch<React.SetStateAction<boolean>>;
  fetchData: () => Promise<void>;
  createMocks: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [placeName, setPlaceName] = useState<string>('');
  const [places, setPlaces] = useState<T_Place[]>([]);
  const [isMock, setIsMock] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/places/?place_name=${placeName.toLowerCase()}`);
      const data = await response.json();
      setPlaces(data.places);
      setIsMock(false);
    } catch {
      createMocks();
    }
  };

  const createMocks = () => {
    setIsMock(true);
    setPlaces(PlaceMocks.filter(place => place.name.toLowerCase().includes(placeName.toLowerCase())));
  };

  return (
    <SearchContext.Provider
      value={{
        placeName,
        setPlaceName,
        places,
        setPlaces,
        isMock,
        setIsMock,
        fetchData,
        createMocks,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = (): SearchContextType => {
  const context = React.useContext(SearchContext);
  if (!context) {
    throw new Error('con');
  }
  return context;
};
