const ease = "easeInOut";

export const fadeUpAnimation = {
    variants: {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
    },
    viewport: { once: true },
    transition: { duration: 0.5, ease }
};

export const scaleInAnimation = {
    variants: {
        initial: { opacity: 0, scale: 0.5 },
        whileInView: { opacity: 1, scale: 1 },
    },
    viewport: { once: true },
    transition: { duration: 0.5, ease }

};

export const slideUpAnimation = {
    variants: {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 }
    },
    viewport: { once: true },
    transition: { duration: 0.2, ease: "powerIn" }
};
