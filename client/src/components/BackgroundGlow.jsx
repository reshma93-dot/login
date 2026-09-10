import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import './BackgroundGlow.css';

const BackgroundGlow = ({ speed = 1, interactivity = 0.05 }) => {
    // Manual Mouse Control Values
    const mouseX = useSpring(useMotionValue(0), { damping: 30, stiffness: 200 });
    const mouseY = useSpring(useMotionValue(0), { damping: 30, stiffness: 200 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            // Map mouse position to a range that shifts the glow
            const x = (e.clientX / window.innerWidth - 0.5) * 200 * interactivity;
            const y = (e.clientY / window.innerHeight - 0.5) * 200 * interactivity;
            mouseX.set(x);
            mouseY.set(y);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [interactivity, mouseX, mouseY]);

    // Base durations that you can now multiply by the speed prop
    const baseDurations = {
        ambient: 60 / speed,
        main: 70 / speed,
        core: 60 / speed,
        shimmer: 40 / speed
    };

    return (
        <motion.div
            style={{ x: mouseX, y: mouseY }}
            className="glow-container"
        >
            <div className="glow-wrapper">

                {/* Layer 3: Ambient Glow */}
                <motion.div
                    animate={{
                        opacity: [0.15, 0.3, 0.15],
                        scale: [1, 1.2, 1],
                        x: ['-50%', '50%', '-30%', '-50%'],
                        y: ['-40%', '40%', '20%', '-40%']
                    }}
                    transition={{
                        duration: baseDurations.ambient,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="glow-layer ambient-glow"
                    style={{
                        willChange: 'transform'
                    }}
                />

                {/* Layer 2: Main Glow */}
                <motion.div
                    animate={{
                        opacity: [0.35, 0.6, 0.35],
                        scale: [1, 1.1, 1],
                        x: ['40%', '-40%', '30%', '40%'],
                        y: ['50%', '-50%', '-20%', '50%']
                    }}
                    transition={{
                        duration: baseDurations.main,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="glow-layer main-glow"
                    style={{
                        willChange: 'transform'
                    }}
                />

                {/* Layer 1: Core Light */}
                <motion.div
                    animate={{
                        scale: [1, 1.15, 1],
                        opacity: [0.7, 1, 0.7],
                        x: ['-20%', '20%', '10%', '-20%'],
                        y: ['-30%', '30%', '-10%', '-30%']
                    }}
                    transition={{
                        duration: baseDurations.core,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="glow-layer core-glow"
                    style={{
                        willChange: 'transform'
                    }}
                />

                {/* Top-Right Secondary Highlight */}
                <motion.div
                    animate={{
                        opacity: [0.3, 0.6, 0.3],
                        x: ['60%', '-60%', '60%'],
                        y: ['-60%', '60%', '-60%']
                    }}
                    transition={{
                        duration: baseDurations.shimmer,
                        repeat: Infinity,
                        ease: "linear"
                    }}
          
                
                />
            </div>
        </motion.div>
    );
};

export default React.memo(BackgroundGlow);
