import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useEffect, useState } from "react";
import Circle from "./components/Circle";
import MouseTrail from "./components/MouseTrailer";
import Makhi from "./components/Makhi";
import NavBar from "./components/goldenLink/NavBar";
import GoldenLink from "./components/goldenLink/GoldenLink";

function App() {
 

  return (
    <>
    {/* <Makhi/>
      <Circle/> */}
      <NavBar/>
      <GoldenLink/>
      <MouseTrail/>
    </>
  );
}

export default App;
