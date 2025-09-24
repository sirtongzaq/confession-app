"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { SlidingNumber } from "../../../components/motion-primitives/sliding-number";

interface SlidingNumberBasicProps {
  loading: boolean;
}

export function SlidingNumberBasic({ loading }: SlidingNumberBasicProps) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!loading) {
      setValue(100); // reset ถ้า loading = false
      return;
    }

    if (value >= 100) return;

    const interval = setInterval(() => {
      setValue((prev) => Math.min(prev + 1, 100));
    }, 0);

    return () => clearInterval(interval);
  }, [loading, value]);

  if (!loading) return null;

  return (
    <motion.div
      initial={{ y: 0, fontSize: 24 }}
      animate={{ y: 0, fontSize: 24 }}
      transition={{
        ease: [1, 0, 0.35, 0.95],
        duration: 1.5,
        delay: 0.3,
      }}
      className="leading-none text-black dark:text-white"
    >
      <div className="inline-flex items-center gap-1 font-mono">
        <SlidingNumber value={value} />%
      </div>
    </motion.div>
  );
}
