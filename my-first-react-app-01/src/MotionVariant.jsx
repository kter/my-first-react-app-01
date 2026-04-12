import { useState } from 'react';
import { motion } from 'motion/react';

export default function MotionVariant() {
  const [active, setActive] = useState(true);
  const panel = {
    active: { opacity: 1, scale: 1 },
    disable: { opacity: 0.3, scale: 0.8 }
  };

  return (
    <>
      <button onClick={() => setActive(act => !act)}>Click</button>
      <motion.div variants={panel}
        initial="active"
        animate={active ? 'active' : 'disable'}
        style={{ width: '350px', height: '250px', backgroundColor: '#90ee90' }}>
        variants
      </motion.div>
    </>
  );
}
