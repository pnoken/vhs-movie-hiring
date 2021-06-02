const admin = '/admin';
const client = '/client';

export const Admin = {
  dashboard: `${admin}/dashboard`,
  movies: `${admin}/movies`,
  rentals: `${admin}/rentals`,
  users: `${admin}/users`,
  payments: `${admin}/payments`,
  topupHistory: `${admin}/topup-history`,
};

export const Client = {
  movies: `${client}/movies`,
  orders: `${client}/orders`,
};
