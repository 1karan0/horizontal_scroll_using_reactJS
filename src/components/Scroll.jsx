import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalScroll() {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    const panels = gsap.utils.toArray('.panel');

    gsap.to(panels, {
      xPercent: -100 * (panels.length - 1),
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        pin: true,
        scrub: 1,
        snap: 1 / (panels.length - 1),
        end: () => '+=' + el.offsetWidth,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex h-screen w-[max-content] overflow-hidden"
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <section
          key={i}
          className="panel w-screen h-screen overflow-hidden flex items-center justify-center text-4xl font-bold"
          style={{
            backgroundColor: i % 2 === 0 ? '#f0f0f0' : '#c0c0c0',
          }}
        >
          Slide {i + 1}
        
        </section>
      ))}
    </div>
  );
}
