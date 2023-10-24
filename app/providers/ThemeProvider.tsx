'use client';

import { ThemeContext } from '@/context/ThemeContext';
import React, { useContext, useEffect, useState } from 'react';

const ThemeProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const { theme } = useContext(ThemeContext);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (mounted) {
    return (
      <div
        className={`
          ${
            theme === 'light'
              ? 'bg-gradient-to-b from-neutral-200 to-neutral-100 text-neutral-950'
              : 'bg-gradient-to-b from-slate-900 to-gray-900 text-neutral-100'
          }
          `}
      >
        {children}
      </div>
    );
  }
};

export default ThemeProvider;
