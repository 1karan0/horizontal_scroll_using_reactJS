import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const SvgTrail = () => {
  const svgRef = useRef(null);
  const pointer = useRef({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });

  const trail = useRef([]);
  const ease = 0.95;
  const total = 100;

  useEffect(() => {
    const handleMouseMove = (e) => {
      pointer.current.x = e.clientX;
      pointer.current.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    gsap.ticker.add(() => {
      for (let i = 0; i < total; i++) {
        const line = trail.current[i];
        if (!line || !line.el) continue;

        const leader =
          i === 0 ? pointer.current : trail.current[i - 1].pos;

        line.pos.x += (leader.x - line.pos.x) * ease;
        line.pos.y += (leader.y - line.pos.y) * ease;

        line.el.setAttribute("x1", line.pos.x);
        line.el.setAttribute("y1", line.pos.y);
        line.el.setAttribute("x2", leader.x);
        line.el.setAttribute("y2", leader.y);
      }
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      gsap.ticker.remove();
    };
  }, []);

  // Initialize the trail array once
  if (trail.current.length === 0) {
    trail.current = Array.from({ length: total }).map(() => ({
      el: null,
      pos: { x: pointer.current.x, y: pointer.current.y  },
    }));
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <svg
        ref={svgRef}
        className="absolute top-0 left-0 w-full h-full"
      >
        {trail.current.map((line, i) => {
          const opacity = (total - i) / total;
          return (
            <line
              key={i}
              ref={(el) => {
                trail.current[i].el = el;
              }}
              x1="10"
              y1="10"
              x2="10"
              y2="10"
              stroke="#EFBF04"
              strokeWidth="3"
              strokeLinecap="round"
              style={{ opacity }}
            />
          );
        })}
      </svg>
    </div>
  );
};

export default SvgTrail;
