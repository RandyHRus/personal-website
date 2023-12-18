import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

let inViewTriggered = false; // Global to ensure that animation only runs once.

export default function FadeIn(props: any) {
    const [ref, inView] = useInView({});

    if (inView) inViewTriggered = true;

    return (
        <motion.div
            ref={ref}
            animate={inView || inViewTriggered ? "visible" : "hidden"}
            variants={{
                hidden: { opacity: 0, y: "20%" },
                visible: { opacity: 1, y: "0%" },
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            {props.children}
        </motion.div>
    );
}
