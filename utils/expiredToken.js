import jwt_decode from 'jwt-decode';

const isTokenExpired = token => {
  if (typeof token !== 'string' || !token)
    throw new Error('Invalid token provided');

  let isJwtExpired = false;
  const { exp } = jwt_decode(token);
  const currentTime = new Date().getTime() / 1000;

  if (currentTime > exp) isJwtExpired = true;

  return isJwtExpired;
};

export default isTokenExpired;
