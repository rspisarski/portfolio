import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface ScrollTextProps {
    text: string;
}

export default function ScrollText({ text }: ScrollTextProps) {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({

        target: containerRef,
        offset: ["start start", "end end"]
    });
    const x = useTransform(scrollYProgress, [0, 1], ['-20vw', '40vw']);

    const opacity = useTransform(scrollYProgress, 
        [0, 0.3, 0.3],
        [0, .1, 0.1]
    );



    return (
        <motion.div
            ref={containerRef}
            className="absolute top-[-10px] text-[80px] md:text-[132px] font-bold text-brand-light-purple dark:text-brand-light-purple whitespace-nowrap z-0 overflow-x-hidden"
            style={{ x, opacity }}
        >
            {text}
        </motion.div>
    );
}