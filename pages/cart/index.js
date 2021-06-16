import React from 'react';
import CartItems from '../../components/user/CartItems';
import Layout from '../../components/user/Layout';
import Navbar from '../../components/user/Navbar';

const CartPage = () => {
  return (
    <Layout title="cart">
      <Navbar/>
      <CartItems />
    </Layout>
  );
};

export default CartPage;
