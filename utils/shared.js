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
};
