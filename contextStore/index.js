import { createContext, useReducer } from 'react';
import { STORETYPES } from '../utils/shared';

export const Store = createContext('');

//Defining the initial states
const initState = {
  cart: [],
  movies: [],
  user: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case STORETYPES.CART: //"SET_CART":
      return { ...state, cart: action.payload };

    case STORETYPES.MOVIES: // 'SET_MOVIE':
      return { ...state, movies: action.payload };

    case STORETYPES.USER: // 'SET_USER':
      return { ...state, user: action.payload };
  }
};

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState);
  return (
    <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
  );
};
