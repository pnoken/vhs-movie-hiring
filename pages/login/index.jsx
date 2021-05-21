import React from 'react';
import LoginForm from '../../components/auth/login';
import Layout from '../../components/user/Layout';

const LandingPage = () => {
  return (
    <Layout title="Login">
      <LoginForm />
    </Layout>
  );
};

export default LandingPage;
