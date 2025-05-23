import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import imag1 from '../../src/assets/switzerland.jpg';
import imag2 from '../../src/assets/italy.jpg';
import imag3 from '../../src/assets/dusctland.jpg';

const cardData = [
  {
    country: 'Switzerland',
    image: imag1,
    year: '1905',
  },
  {
    country: 'Italy',
    image: imag2,
    year: '2006',
    rotate: 'rotate-6',
  },
  {
    country: 'Deutschland',
    image: imag3,
    year: '2004',
    rotate: '-rotate-6',
  }
];

const Cards = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <div
      ref={ref}
      className=" grid grid-cols-3 sm:grid-cols-2 xsm:grid-cols-2 justify-center gap-4"
    >
      {cardData.map((card, i) => {
        // Convert tailwind rotation classes to degrees
        const rotate =
          card.rotate === 'rotate-6'
            ? 6
            : card.rotate === '-rotate-6'
            ? -6
            : 0;

        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 100, rotate }}
            animate={inView ? { opacity: 1, x: 0, rotate } : {}}
            transition={{ duration: 0.6, delay: i * 0.2, ease: 'easeOut' }}
            className=" w-60 h-full bg-[#e3d5c0] hover:bg-yellow-500 cursor-pointer transition-all duration-300 rounded-xl shadow-lg px-3 py-2 text-center font-serif text-black"
          >
            <img
              src={card.image}
              alt={card.country}
              className="rounded-xl mb-4 h-56 w-60 object-cover mx-auto"
            />
            <div className="text-3xl font-extralight tracking-tighter font-suisse mb-2">
              {card.country}
            </div>

            <div className="my-2 flex justify-between text-sm tracking-widest px-4 font-mono">
              <span>{card.year.slice(0, 2)}</span>
              <span>{card.year.slice(2)}</span>
            </div>

            <div className="mt-3 uppercase text-[10px] tracking-wider border-t border-black pt-2">
              <div>MELTER ASSAYER</div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default Cards;
