import React, { useContext } from "react";
import { authStore } from "../../store/AuthStore";
const Home = () => {
  const authContext = useContext(authStore);

  return (
    <>
      <p>{JSON.stringify(authContext)};</p>
    </>
  );
};

export default Home;
