import { motion } from 'framer-motion';
import { slideUpAnimation } from '../../utils/animations.ts';
import ScrollText from './ScrollText.tsx';

interface SectionHeadingProps {
    text: string;
}

export default function SectionHeading({text }: SectionHeadingProps) {
    return (
        <div>
        <motion.h2
            className="text-2xl font-bold mb-12 flex flex-row gap-4 items-center"
            viewport={{ once: true }}
            transition={{ duration: .5, ease: 'easeOut' }}
            {...slideUpAnimation.variants}

        >
            {text}
        </motion.h2>

        <ScrollText text={text}/>
        </div>
    );
}

