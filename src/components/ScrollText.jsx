import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

    export default function ScrollText({ text }) {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
    });
    const x = useTransform(scrollYProgress, [0, 1], ['40vw', '-10vw']);


    return (
    <motion.div
        ref={containerRef}
        client:load
        initial={{ opacity: 0 }}
        whileInView={{ opacity: .1 }}
        transition={{ duration: 1, delay: 1 }}
        viewport={{ once: true }}
        className="absolute top-[-10px] text-[132px] font-bold text-brand-light-purple dark:text-brand-light-purple whitespace-nowrap z-0"
        style={{ x }}
    >

        {text}
    </motion.div>
    );
}