import { createContext, useReducer } from 'react';
import { STORETYPES } from '../utils/shared';

export const Store = createContext('');

//Defining the initial states
const initState = {
  cart: [],
  movies: [],
  users: [],
  topups: [],
  rentals: [],
  authenticatedUser: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case STORETYPES.CART: //"SET_CART":
      const cart_items = JSON.parse(JSON.stringify(state.cart));
      cart_items.push(action.payload);
      return { ...state, cart: cart_items };

    case STORETYPES.MOVIES: // 'SET_MOVIE':
      return { ...state, movies: action.payload };

    case STORETYPES.USERS: // 'SET_USER':
      return { ...state, users: action.payload };

    case STORETYPES.TOPUPS: // 'SET_TOPUP':
      return { ...state, topups: action.payload };

    case STORETYPES.RENTALS: // 'SET_RENTALS':
      return { ...state, rentals: action.payload };
    case STORETYPES.AUTHUSER:
      return { ...state, authenticatedUser: action.payload };

    default:
      break;
  }
};

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState);
  return (
    <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
  );
};
