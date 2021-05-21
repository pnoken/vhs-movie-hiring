import { useContext, useState } from "react";
import { Store } from "../../contextStore";

export default function Login() {
  const { dispatch } = useContext(Store);
  //const [user, setUser] = useState(false);
  //let cart = state.cart;

  const submit = () => {
    try {
      dispatch({
        type: "SET_USER",
        payload: { email: "norteypeter@mail.com", password: "User@2021" },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1>This is my login page</h1>
      <button onClick={() => submit()}>Login</button>
    </div>
  );
}
