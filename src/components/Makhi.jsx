import React from 'react'
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useEffect, useState } from "react";

const Makhi = () => {
     const boxRef = useRef(null);
  const [circle,setCircle] = useState(0)
  const[yexes,setYexes] =useState(0)
  const [rotate,setRotate]=useState(0)

  const random = gsap.utils.random(-500,500,100)
  const randomy = gsap.utils.random(-200,200,100)
  const randomro = gsap.utils.random(-100,100,10)

  useGSAP(() => {
    gsap.to(boxRef.current,{
      x:circle,
      y:yexes,
      rotate:rotate,
      duration:0.5
    })
  },[circle,yexes]);
  return (
    <div>
      <div  className="bg-black overflow-hidden min-h-screen flex flex-col items-center justify-center gap-10 py-10">
        <img ref={boxRef} onClick={()=>{
        setCircle(random)
        setYexes(randomy)
        setRotate(randomro)
        // console.log(circle)
      }} className="w-20 h-20 cursor-pointer" src="https://images.vexels.com/media/users/3/242241/isolated/preview/409d95bf597e130c6c1b1d2ac3f5dbf5-side-fly-geometric-color-stroke.png" alt="" />
        
    </div>
    </div>
  )
}

export default Makhi
