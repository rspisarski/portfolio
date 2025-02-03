import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect } from 'react';

export default function ScrollText({ text }) {
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

    // Enhanced debug logging
    useEffect(() => {
        console.log("Component mounted");
        console.log("Container ref:", containerRef.current);
        
        const unsubscribe = scrollYProgress.on("change", (latest) => {
            console.log("Scroll progress:", latest);
            console.log("Container bounds:", containerRef.current?.getBoundingClientRect());
        });
        return () => unsubscribe();
    }, [scrollYProgress]);

    return (
        <motion.div
            ref={containerRef}
            className="absolute top-[-10px] text-[132px] font-bold text-brand-light-purple dark:text-brand-light-purple whitespace-nowrap z-0 overflow-x-hidden"
            style={{ x, opacity }}
        >
            {text}
        </motion.div>
    );
}