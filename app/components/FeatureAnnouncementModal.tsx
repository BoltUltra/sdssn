'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface Feature {
  name: string;
  description: string;
  availableIn: string;
}

const features: Feature[] = [
  {
    name: 'Advanced Analytics',
    description: 'Dive deep into your data with our advanced analytics tools.',
    availableIn: 'Q3 2024',
  },
  {
    name: 'AI-Powered Predictions',
    description: 'Harness the power of AI to make accurate predictions.',
    availableIn: 'Q4 2024',
  },
  {
    name: 'Real-time Collaboration',
    description:
      'Work together seamlessly with real-time collaboration features.',
    availableIn: 'Q1 2025',
  },
];

export default function FeatureAnnouncementModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-lg relative overflow-hidden"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X size={24} />
            </motion.button>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                Exciting Features Coming Soon!
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                We're working hard to bring you amazing new features. Here's a
                sneak peek of what's coming:
              </p>
            </motion.div>

            <motion.div className="space-y-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.name}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg"
                >
                  <h3 className="font-semibold text-gray-800 dark:text-white">
                    {feature.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    Available in: {feature.availableIn}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="absolute -bottom-12 -right-12 w-40 h-40 bg-blue-500 rounded-full opacity-10"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 90, 0],
              }}
              transition={{
                duration: 10,
                ease: 'easeInOut',
                times: [0, 0.5, 1],
                repeat: Infinity,
              }}
            />
            <motion.div
              className="absolute -top-12 -left-12 w-32 h-32 bg-purple-500 rounded-full opacity-10"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, -60, 0],
              }}
              transition={{
                duration: 8,
                ease: 'easeInOut',
                times: [0, 0.5, 1],
                repeat: Infinity,
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
