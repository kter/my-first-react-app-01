import { motion } from 'motion/react';

export default function MotionBasic() {
  return (
    <div>
      <motion.img src="/image/logo.jpg" animate={{ rotate: 720, x: 500 }} />
    </div>
  );
}

