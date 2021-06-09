import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Homepage from '../components/user/Homepage';
import { localStorageToJson } from '../utils/shared';
import { Admin } from '../utils/routes';

export default function Home() {
  const router = useRouter();

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (
      localStorageToJson() &&
      localStorageToJson().user &&
      localStorageToJson().user.role === 'admin'
    ) {
      setIsAdmin(true);
    }
  }, []);

  // useEffect(() => {
  //   if (isAdmin) router.replace(Admin.dashboard);
  // }, [isAdmin]);

  return (
    <>
      {/* {isAdmin && router.replace(Admin.dashboard)}
      <Homepage /> */}
      {/* <Homepage /> */}
      {isAdmin ? router.replace(Admin.dashboard) : <Homepage />}
    </>
  );
}
