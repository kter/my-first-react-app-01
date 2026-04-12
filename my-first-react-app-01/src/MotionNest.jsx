import { motion } from 'motion/react';
import books from './books.js'

export default function MotionNest() {
  const list = {
    hidden: { backgroundColor: '#fff' },
    show: { backgroundColor: '#90ee90', transition: { duration: 5 } }
  };

  const item = {
    hidden: { x: '100vw', opacity: 0 },
    show: { x: 0, opacity: 1, transition: { duration: 0.3 } }
  };

  return (
    <motion.ul variants={list}
      initial="hidden" animate="show"
      style={{ border: '1px solid #00', width: '80vw' }}>

      {books.map(b => (
        <motion.li key={b.isbn} variants={item} style={{ padding: '5px' }}>
          {b.title} ({b.price}円)
        </motion.li>
      ))}
    </motion.ul>
  );
}

