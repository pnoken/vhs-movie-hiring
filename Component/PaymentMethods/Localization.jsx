import React from 'react';
import { Cart, cartLocalization } from 'react-shopping-cart';

const { getLocalization, defaultLocalization } = cartLocalization;

const localization = {
  en: {
    cart : {
      GBP: '£',
    },
  },
};

const mergedEnCartLocalization = {
  ...localization.en.cart,
  ...defaultLocalization.en.cart,
};

<Cart
  getLocalization={(...args) => getLocalization(mergedEnCartLocalization, 'en', ...args)}
/>