import React from "react";
import useWindowSize from "../hooks/useWindowSize";
import PhoneTopBar from "../components/PhoneTopBar";

const Home = () => {
  const size = useWindowSize();
  return <div>{size.width < 645 && <PhoneTopBar heading={"Home"} />}home</div>;
};

export default Home;
