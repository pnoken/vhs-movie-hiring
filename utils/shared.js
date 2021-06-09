import moment from 'moment';

export const perPage = 15;

export const handlePageChange = ({ selected: selectedPage }) => {
  return selectedPage;
};

export const getPageCount = list => {
  return Math.ceil(list.length / perPage);
};

export const formatCurrency = number => {
  return new Intl.NumberFormat('en-GH', {
    style: 'currency',
    currency: 'GHS',
  }).format(number);
};

export const STORETYPES = {
  MOVIES: 'SET_MOVIE',
  USERS: 'SET_USER',
  CART: 'SET_CART',
  TOPUPS: 'SET_TOPUP',
  RENTALS: 'SET_RENTALS',
  AUTHUSER: 'AUTH_USER',
};

export const formatDateTime = date => {
  return moment(date).format('YYYY-MM-DD HH:mm A');
};

export const formateDateOnly = date => {
  return moment(date).format('YYYY-MM-DD');
};

export const getCurrentDate = () => {
  let today = moment();
  return today.format('YYYY-MM-DD');
};

export const localStorageToJson = () => {
  const data = window.localStorage.getItem('user-data');

  return JSON.parse(data);
};
