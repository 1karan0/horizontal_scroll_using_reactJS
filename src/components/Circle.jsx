import { useRef, useEffect, useState } from "react";
import gsap from "gsap";

export default function AnimatedTextSwap() {
  const textRef = useRef(null);
  const [text, setText] = useState("Hello GSAP!");

  // Animate on text change
  useEffect(() => {
    if (!textRef.current) return;

    const tl = gsap.timeline();

    tl.fromTo(textRef.current,{
      y: 0,
      opacity: 1,
    },{
      y: 20,
      opacity: 0,
      duration: 0.3,
      ease: "power2.out",
      onComplete: () => {
        // Replace the text content after fade-out
        textRef.current.textContent = text;
      },
    });

    tl.fromTo(
      textRef.current,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      }
    );
  }, [text]);

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 ref={textRef} className="text-4xl font-bold">
        {text}
      </h1>
      <button
        onClick={() => setText("New Animated Text!")}
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Change Text
      </button>
    </div>
  );
}
