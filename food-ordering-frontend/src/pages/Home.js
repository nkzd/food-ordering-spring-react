import React, { useContext } from "react";
import { authStore } from "../store/AuthStore";
const Home = () => {
  const globalState = useContext(authStore);
  console.log(globalState);

  return (
    <>
      <p>{JSON.stringify(globalState)};</p>
    </>
  );
};

export default Home;
