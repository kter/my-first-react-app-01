import { motion } from 'motion/react';

export default function MotionWhile() {
  return (
    <div>
      <motion.button
        initial={{ scale: 1, backgroundColor: '#00f' }}
        whileHover={{ scale: 1.2, backgroundColor: '#f0f' }}
        whileTap={{ scale: 0.8, backgroundColor: '#f00' }}
        transition={{ duration: 0.2 }}
        style={{ padding: '10px', color: '#fff' }}>
        Push me
      </motion.button>
    </div>
  );
}
