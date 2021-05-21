import React from 'react';
import CartItems from '../../components/user/CartItems';
import Layout from '../../components/user/Layout';

const CartPage = () => {
  return (
    <Layout title="cart">
      <CartItems />
    </Layout>
  );
};

export default CartPage;
