import { motion } from 'framer-motion';

const SectionTitle = ({ eyebrow, title, children }) => (
  <motion.div className="section-title" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
    <span>{eyebrow}</span>
    <h2>{title}</h2>
    {children && <p>{children}</p>}
  </motion.div>
);

export default SectionTitle;
