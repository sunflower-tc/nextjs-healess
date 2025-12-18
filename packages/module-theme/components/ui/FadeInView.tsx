import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const FadeInView = ({ children }: { children: React.ReactNode }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: '100px',
  });

  return (
    <motion.div
      ref={ref}
      initial={{ y: 10, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : {}}
      exit={{ y: -10, opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
};

export default FadeInView;
