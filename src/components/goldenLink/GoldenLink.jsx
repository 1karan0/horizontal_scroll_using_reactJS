import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IoMdArrowForward } from "react-icons/io";
import SplitText from "gsap/SplitText";
import { motion } from "framer-motion";
import image1 from "../../assets/1951.jpg";
import image2 from "../../assets/1973.jpeg";
import image3 from "../../assets/1986.jpg";
import image4 from "../../assets/1988.jpg";
import image5 from "../../assets/1999.jpg";
import image6 from "../../assets/2002.png";
import image7 from "../../assets/2013.jpg";
import image8 from "../../assets/2021.jpg";
import image9 from "../../assets/2022.jpg";
import Cards from "../Cards";
import { useSwipeable } from "react-swipeable";
import { IoMdInformationCircleOutline } from "react-icons/io";


gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SplitText);
const values = [
  {
    letter: "A",
    title: "Refining",
    desc: "Gold, silver, platinum and palladium",
  },
  {
    letter: "B",
    title: "Investment",
    desc: "Cast and minted investment products.",
  },
  {
    letter: "C",
    title: "Luxury",
    desc: "Semifinished products and alloys for luxury watchmaking and jewellery.",
  },
  {
    letter: "D",
    title: "Services",
    desc: "Precious metals trading, hedging, transport and transformation support.",
  },
];
const historyData = [
  {
    year: 1951,
    image: image1, // Adjust this path based on your project
    location: "Switzerland",
    description: "Establishment of Argor SA in Chiasso, Switzerland.",
  },
  {
    year: 1973,
    image: image2,
    location: "Switzerland",
    description: "Establishment of Argor SA in Chiasso, Switzerland.",
  },
  {
    year: 1986,
    image: image3,
    location: "Switzerland",
    description: "Entered new markets globally.",
  },
  {
    year: 1988,
    image: image4,
    location: "Switzerland",
    description: "Introduced advanced refining technologies.",
  },
  {
    year: 1999,
    image: image5,
    location: "Switzerland",
    description: "Introduced advanced refining technologies.",
  },
  {
    year: 2002,
    image: image6,
    location: "Switzerland",
    description: "Introduced advanced refining technologies.",
  },
  {
    year: 2013,
    image: image7,
    location: "Switzerland",
    description: "Introduced advanced refining technologies.",
  },
  {
    year: 2021,
    image: image8,
    location: "Switzerland",
    description: "Introduced advanced refining technologies.",
  },
  {
    year: 2022,
    image: image9,
    location: "Switzerland",
    description: "Establishment of Argor SA in Chiasso, Switzerland.",
  },
  // Add more years as needed
];

const GoldenLink = () => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeYear, setActiveYear] = useState(historyData[0]);
  const yearRef = useRef(null);
  const descRef = useRef(null);
  const imgRef = useRef(null);
  // const sec3Ref = useRef(null);
  // const tl = gsap.timeline();

  const currentIndex = historyData.findIndex((e) => e.year === activeYear.year);

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      const nextIndex = (currentIndex + 1) % historyData.length;
      setActiveYear(historyData[nextIndex]);
    },
    onSwipedRight: () => {
      const prevIndex =
        (currentIndex - 1 + historyData.length) % historyData.length;
      setActiveYear(historyData[prevIndex]);
    },
    preventScrollOnSwipe: true,
    trackTouch: true,
  });

  useEffect(() => {
    // Animate image
    gsap.fromTo(
      imgRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.3, ease: "power3.out" }
    );

    // Animate year
    gsap.fromTo(
      yearRef.current,
      { y: 50 },
      { y: 0, duration: 0.6, ease: "power3.out" }
    );

    // Animate description
    gsap.fromTo(
      descRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
    );
  }, [activeYear]);
  useEffect(() => {
    const yearElem = document.querySelector(".staggerYear");
    const split = new SplitText(yearElem, { type: "chars" });

    gsap.fromTo(
      split.chars,
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.05,
        ease: "power3.out",
        duration: 0.6,
      }
    );
  }, [activeYear.year]);

  useEffect(() => {
    let ismobile = window.innerWidth < 640;
    let ctx;
    if (!ismobile) {
      ctx = gsap.context(() => {
        const sections = gsap.utils.toArray(".panel");

        gsap.to(sections, {
          xPercent: -100 * (sections.length - 1),
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            pin: true,
            scrub: 9,
            end: () => "+=" + containerRef.current.offsetWidth,
          },
        });
      }, containerRef);
    }

    return () => {
      if (ctx) ctx.revert();
    };
  }, []);
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const childVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 80 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };
  const staggerWrap = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const handlePlay = () => {
    setIsPlaying(true);
    videoRef.current?.play();
  };

  const handleStop = () => {
    setIsPlaying(false);
    videoRef.current?.pause();
  };

  return (
    <div ref={containerRef} className="relative w-full h-screen">
      <div className="flex xsm:flex-col sm:flex-col sm:h-screen sm:overflow-x-hidden xsm:h-screen  md:h-full md:flex-row bg-[#7c6f63] w-full xsm:overflow-x-hidden md:overflow-hidden">
        <section className="sec-1 panel ml-20 w-full xsm:flex-col sm:flex-col sm:mt-40 xsm:mt-20 flex-row  xsm:px-7 sm:ml-0 sm:px-7 xsm:ml-0 flex-shrink-0 flex sm:gap-10 xsm:gap-10 gap-32 items-center  bg-[#7c6f63] px-20  text-black xsm:z-0 sm:z-0 z-50">
          <div className="md:w-[70%] xsm:w-full sm:w-full">
            <motion.div
              className="text-5xl xsm:text-2xl font-thin"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              we are the
            </motion.div>

            <div className="flex xsm:flex-col xsm:gap-6 sm:gap-6 sm:flex-col sm:items-start xsm:items-start items-end">
              <motion.div
                className="text-[#dccdb4] text-[180px] xsm:text-7xl  font-thin tracking-tighter leading-none"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
              >
                <h1 className="tracking-tighter">Golden</h1>Link
              </motion.div>

              <motion.div
                className="-ml-52 sm:-ml-0  xsm:-ml-0 mb-4 text-5xl xsm:text-2xl font-thin"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
              >
                for precious metal, <br /> all along the value <br /> chain
              </motion.div>
            </div>
          </div>
          <div className="w-[40%] sm:w-full xsm:w-full z-50">
            <motion.div
              className="relative w-[700px] xsm:w-full sm:w-full sm:h-[19rem] xsm:h-[10rem] h-[390px] xsm:rounded-[50px] rounded-[80px] overflow-hidden"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
            >
              <div
                className={`absolute top-0 left-0 w-full h-full transition-opacity duration-700 ${
                  isPlaying ? "opacity-0 z-0" : "opacity-100 z-10"
                }`}
              >
                <img
                  src="https://argor.adoratorio.app/wp-content/uploads/2022/05/argor-full-poster.jpg"
                  alt="Preview"
                  className="w-full h-full object-cover rounded-3xl"
                />
              </div>
              <video
                ref={videoRef}
                src="https://argor.adoratorio.app/wp-content/uploads/2022/05/argor-full-video-small.mp4"
                className={`absolute top-0 left-0 w-full h-full object-cover rounded-3xl transition-opacity duration-700 ${
                  isPlaying ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
                playsInline
              />
              {!isPlaying ? (
                <button className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 z-20">
                  <div
                    onClick={handlePlay}
                    className="w-20 xsm:w-10 xsm:h-10 sm:w-10 sm:h-10 h-20 bg-[#3c3c3c] bg-opacity-70 rounded-full flex items-center justify-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-8 h-8 text-white ml-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 5v14l11-7z"
                      />
                    </svg>
                  </div>
                </button>
              ) : (
                <button className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 z-20">
                  <div
                    onClick={handleStop}
                    className="w-20 xsm:w-10 xsm:h-10 sm:w-10 sm:h-10 h-20 bg-[#3c3c3c6a] bg-opacity-70 rounded-full flex items-center justify-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-8 h-8 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 9v6m4-6v6"
                      />
                    </svg>
                  </div>
                </button>
              )}
            </motion.div>
          </div>
        </section>

        <section className="sec-2 panel w-screen flex-shrink-0 flex items-center justify-center bg-[#7c6f63] text-[#e9dbc6] sm:px-7 xsm:px-7 px-16 py-20">
          <div className="flex xsm:flex-col sm:flex-col flex-row sm:gap-10 xsm:gap-10 xsm:items-start sm:items-start items-center mt-10 sm:ml-0 xsm:ml-0 ml-10 w-full justify-center">
            {/* Left Column */}
            <motion.div
              className="w-full sm:w-full lg:w-1/3 min-w-[300px] sm:-mr-0 xsm:-mr-0 -mr-20"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
            >
              <motion.div
                className="flex xsm:items-start  items-center mb-6"
                variants={childVariants}
              >
                <div className="border border-black px-4 py-2 text-black tracking-tighter text-6xl items-center flex h-[110px]">
                  01
                </div>
                <div className="border border-black px-4 py-2 text-black w-[120px] font-light leading-5 text-2xl border-l-0 h-[110px] flex flex-col items-center justify-center">
                  The <span>group</span>
                </div>
              </motion.div>

              <motion.h2
                className=" text-5xl font-light tracking-tighter text-[#e9dbc6]"
                variants={childVariants}
              >
                The <br />
                <span className="font-semibold ">Heraeus</span> <br />
                Group
              </motion.h2>

              <motion.p
                className="mt-6 text-lg  tracking-tight font-medium leading-tight text-[#dccdb4]"
                variants={childVariants}
              >
                Argor-Heraeus is part of the <br />
                Global Business Unit Heraeus <br /> Precious Metals (HPM) <br />
                belonging to the German <br /> technological group Heraeus.
              </motion.p>
            </motion.div>

            {/* Right Column */}
            <motion.div
              className="flex flex-row sm:flex-col xsm:flex-col items-center"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
            >
              <div className="md:w-[370px] sm:w-full sm:h-full xsm:w-full xsm:h-[400px] h-[500px] flex-shrink-0">
                <img
                  src="https://argor.adoratorio.app/wp-content/uploads/2021/09/heraeus_hq-e1631184232512.jpg"
                  alt="Heraeus Building"
                  className="rounded-[65px] xsm:rounded-[50px] w-full h-full object-cover"
                />
              </div>

              <motion.div
                className="w-full sm:mt-6 xsm:-ml-0 sm:-ml-0 xsm:mt-8 -ml-11"
                variants={containerVariants}
              >
                <motion.h3
                  className="text-5xl font-normal text-[#dccdb4]"
                  variants={childVariants}
                >
                  <p>The world’s largest</p>
                  <p> provider of precious</p> <p>metals.</p>
                </motion.h3>

                <motion.div
                  className="mt-6 sm:mt-6 text-base tracking-tight font-medium sm:leading-snug xsm:leading-snug leading-tight text-[#dccdb4]"
                  variants={containerVariants}
                >
                  {[
                    "Headquartered in Hanau, Germany, Heraeus’ technological",
                    "group includes businesses in the environmental,",
                    "electronics, health and industrial applications",
                    "sectors,",
                    "offering innovative technologies and solutions based on",
                    "broad materials expertise and technological leadership.",
                    "Argor-Heraeus’ key position in the value chain makes it the",
                    "ideal partner for all players in the precious metals",
                    "industry.",
                  ].map((line, index) => (
                    <motion.p key={index} variants={childVariants}>
                      {line}
                    </motion.p>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="sec-3 panel w-screen flex-shrink-0 flex items-center justify-center bg-[#7c6f63] text-[#e9dbc6] sm:px-7 xsm:px-7 px-16 py-20">
          <motion.div
            className="max-w-7xl sm:w-full xsm:w-full sm:grid-cols-1 xsm:grid-cols-1 grid sm:gap-8   grid-cols-2 mt-10 items-center gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {/* Stats Card */}
            <motion.div
              className="bg-[#695f55] p-10 rounded-[60px] text-[#f7e7c6] w-[80%] sm:w-full xsm:w-full"
              variants={childVariants}
            >
              <div className="grid grid-cols-2 xsm:grid-cols-1 xsm:divide-none divide-x divide-[#9e9084]">
                <div className="flex flex-col xsm:divide-none divide-[#9e9084]">
                  <motion.div
                    className="px-10 xsm:px-0 py-8 text-center flex flex-col xsm:items-start xsm:justify-between xsm:flex-row"
                    variants={containerVariants}
                  >
                    <div className="text-6xl xsm:text-4xl">23</div>
                    <div className="text-lg xsm:text-sm mt-2 leading-snug ">
                      Billion <br /> in Revenue
                    </div>
                  </motion.div>
                  <motion.div
                    className="px-10 xsm:px-0 py-8 text-center xsm:justify-between flex flex-col xsm:flex-row"
                    variants={containerVariants}
                  >
                    <div className="text-6xl xsm:text-4xl">40</div>
                    <div className="text-lg xsm:text-sm mt-2 leading-snug">
                      Worldwide <br /> Countries
                    </div>
                  </motion.div>
                </div>

                <div className="flex flex-col xsm:divide-none divide-[#9e9084]">
                  <motion.div
                    className="px-10 xsm:px-0 xsm:justify-between py-8 text-center flex flex-col xsm:flex-row"
                    variants={containerVariants}
                  >
                    <div className="text-6xl xsm:text-4xl">15k</div>
                    <div className="text-lg xsm:text-sm mt-2 leading-snug">
                      Employees <br /> Worldwide
                    </div>
                  </motion.div>
                  <motion.div
                    className="px-10 xsm:px-0 xsm:justify-between py-8 text-center flex flex-col xsm:flex-row"
                    variants={containerVariants}
                  >
                    <div className="text-6xl xsm:text-4xl">11</div>
                    <div className="text-lg xsm:text-sm mt-2 leading-snug">
                      Global <br /> Business Units
                    </div>
                  </motion.div>
                </div>
              </div>

              <div className="text-lg xsm:text-sm italic text-center mt-6 text-[#f7e7c6]">
                *Heraeus Group Data
              </div>
            </motion.div>

            {/* Right Side Text Content */}
            <motion.div
              className="flex flex-col gap-10"
              variants={containerVariants}
            >
              <motion.div
                className="flex items-center"
                variants={childVariants}
              >
                <div className="border border-black px-4 py-2 text-black tracking-tighter text-6xl items-center flex h-[100px]">
                  02
                </div>
                <div className="border border-black px-4 py-2 text-black w-[120px] font-light leading-6 text-2xl border-l-0 h-[100px] flex flex-col items-center justify-center">
                  What <span>we do</span>
                </div>
              </motion.div>

              <motion.div className="space-y-2" variants={containerVariants}>
                {values.map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex  items-center justify-between border-b border-[#4e443b] py-4"
                    variants={childVariants}
                  >
                    <div className="flex items-start gap-6 w-full">
                      <div className="text-black text-xl font-thin w-6">
                        {item.letter}.
                      </div>

                      <div className="flex flex-row xsm:flex-col xsm:items-start xsm:gap-1 text-lg items-center justify-start gap-10 w-full">
                        <div className="text-4xl xsm:text-2xl text-[#e9dbc6] min-w-[160px]">
                          {item.title}
                        </div>

                        <div className="text-sm xsm:text-xs text-[#e9dbc6] max-w-[500px]">
                          {item.desc}
                        </div>
                      </div>
                    </div>

                    <button className="min-w-[40px] h-10 w-10 rounded-full bg-[#3d352f] font-extralight flex items-center justify-center text-xl text-[#f7e7c6]">
                      <IoMdArrowForward />
                    </button>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        <section className="sec-4 xsm:z-0 sm:z-0 z-50 panel w-screen h-screen flex-shrink-0 flex items-center justify-center bg-[#7c6f63] text-[#e9dbc6] ">
          <div className=" flex flex-row xsm:flex-col sm:flex-col items-center sm:mt-40 sm:h-screen sm:gap-1 sm:items-start sm:ml-0 xsm:mt-40 xsm:h-screen xsm:gap-1 xsm:items-start xsm:ml-0 ml-20 w-full justify-center">
            <motion.div
              className="bg-[#695b4f] px-40 py-20 sm:px-10 sm:w-full sm:h-[100vh] xsm:px-10 z-10 h-[100vh]  xsm:w-full w-[70%]"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
            >
              <motion.h1
                className="text-[150px] xsm:text-7xl sm:text-8xl sm:mt-0 leading-none xsm:mt-0 mt-20"
                variants={fadeUp}
              >
                Our history
              </motion.h1>

              <motion.p
                className="text-black text-lg xsm:mt-10 sm:mt-10 mt-20"
                variants={fadeUp}
              >
                70 years of refining and <br /> transforming precious <br />
                metals.
              </motion.p>
            </motion.div>

            <div className=" -ml-32 xsm:-ml-12 sm:-ml-10 z-20 mt-24 xsm:-mt-12 ">
              <div className=" ">
                <div ref={imgRef} className="relative">
                  <div className=" mt-12 ml-12 xsm:hidden sm:hidden absolute text-sm text-[#f5e5cc]">
                    <p>Location</p>
                    <p className="text-2xl tracking-tighter font-bold">
                      {activeYear.location}
                    </p>
                  </div>
                  <motion.img
                  {...handlers}
                    src={activeYear.image}
                    alt={`History ${activeYear.year}`}
                    className="rounded-[6rem] xsm:rounded-[2rem] sm:rounded-[2rem] sm:w-[50%] w-[45vw] xsm:w-[80%] xsm:h-[34vh] h-[49vh] object-cover shadow-xl touch-pan-x"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />

                  <motion.div
                    ref={yearRef}
                    className="text-[8rem] xsm:text-8xl -mt-20 xsm:-mt-14 ml-10 xsm:ml-16 sm:ml-20  leading-none opacity-80 font-extralight"
                    variants={staggerWrap}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    <motion.p className="staggerYear" variants={fadeUp}>
                      {activeYear.year}
                    </motion.p>
                    <motion.p
                      className="staggerYear text-lg xsm:text-xs sm:text-sm"
                      variants={fadeUp}
                      ref={descRef}
                    >
                      {activeYear.description}
                    </motion.p>
                  </motion.div>
                </div>
              </div>

              {/* Desktop Version (unchanged) */}
              <motion.div
                variants={staggerWrap}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="xsm:hidden flex items-center justify-center gap-4 mt-10 text-[#f5e5cc] text-lg"
              >
                {historyData.map((entry, index) => (
                  <React.Fragment key={entry.year}>
                    <motion.button
                      variants={fadeUp}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      onClick={() => setActiveYear(entry)}
                      className="relative flex flex-col items-center group"
                    >
                      <span
                        className={`transition duration-300 ${
                          activeYear.year === entry.year
                            ? "font-bold underline underline-offset-4"
                            : "hover:underline"
                        }`}
                      >
                        {entry.year}
                      </span>
                    </motion.button>

                    {index !== historyData.length - 1 && (
                      <motion.div
                        variants={fadeUp}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="w-12 h-[2px] bg-[#c4b4a0] opacity-50"
                      />
                    )}
                  </React.Fragment>
                ))}
              </motion.div>

              {/* Mobile Version */}
              <div
                className="xsm:flex sm:flex hidden w-full justify-center items-center gap-14 xsm:ml-10 xsm:mt-14 mt-10 text-[#f5e5cc] text-lg "
              >
              <div className="flex items-center justify-center gap-4">
                <IoMdInformationCircleOutline  className="text-black"/><p className="text-sm text-black">Swipe Sideway to <br /> navigate the timeline</p>
              </div>
                <button
                  onClick={() => {
                    const currentIndex = historyData.findIndex(
                      (e) => e.year === activeYear.year
                    );
                    const nextIndex = (currentIndex + 1) % historyData.length;
                    setActiveYear(historyData[nextIndex]);
                  }}
                >
                  <IoMdArrowForward className="text-[#f5e5cc] text-3xl" />
                </button>
              </div>
            </div>
          </div>
        </section>
        <section className="sec-5 panel w-full flex-shrink-0 flex justify-center bg-[#7c6f63] text-[#e9dbc6]">
          <div className="flex xsm:flex-col sm:flex-col sm:ml-0 xsm:ml-0 w-full sm:mt-44 xsm:mt-52 items-center ml-40">
            <div className="bg-[#695b4f] sm:w-full xsm:w-full w-[60%] sm:py-10 xsm:py-10 px-16 z-10 sm:h-full xsm:h-full h-[100vh]">
              <motion.h1
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeUp}
                className="text-[150px] sm:text-8xl xsm:text-7xl font-suisse font-thin tracking-tighter leading-none sm:mt-10 xsm:mt-10 mt-40"
              >
                Loc- <br />
                ations
              </motion.h1>
              <motion.p
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeUp}
                className="text-black text-lg mt-20"
              >
                70 years of refining and <br /> transforming precious <br />{" "}
                metals .
              </motion.p>
            </div>
            <div className="-ml-40 sm:-ml-0 sm:mt-0 xsm:-ml-0 xsm:mt-0 z-20 mt-24">
              <Cards />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default GoldenLink;
