import { useRouter } from 'next/router';
import notify from '../../utils/toast';

import { localStorageToJson } from '../../utils/shared';
import isTokenExpired from '../../utils/expiredToken';
import { Home } from '../../utils/routes';

const Authenticated = Component => {
  return props => {
    // checks whether we are on client / browser or server.
    if (typeof window !== 'undefined') {
      const Router = useRouter();

      const accessToken = localStorageToJson();
      //   console.log(JSON.stringify(accessToken));

      // If there is no access token we redirect to "/" page.
      if (
        !accessToken ||
        !accessToken.token ||
        isTokenExpired(accessToken.token)
      ) {
        notify().error('Login Required');
        Router.replace(Home);
        return null;
      }
      // If this is an accessToken we just render the component that was passed with all its props

      return <Component {...props} />;
    }

    // If we are on server, return null
    return null;
  };
};

export default Authenticated;
