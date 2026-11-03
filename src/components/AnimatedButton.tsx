import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ChevronRight, ArrowUpRight } from 'lucide-react';
import { soundFX } from '../audio/soundFx';

interface AnimatedButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  icon?: 'arrow' | 'chevron' | 'up-right' | 'none';
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  variant = 'primary',
  icon = 'none',
  onClick,
  className = '',
  type = 'button',
  disabled = false,
}) => {
  const handleClick = () => {
    if (disabled) return;
    soundFX.playClick();
    if (onClick) onClick();
  };

  const variantStyles = {
    primary:
      'bg-neutral-900 hover:bg-black text-white border border-neutral-900 shadow-xs hover:shadow-sm',
    secondary:
      'bg-white hover:bg-neutral-50 text-neutral-900 border border-neutral-200/90 shadow-2xs hover:border-neutral-300',
    ghost:
      'bg-transparent hover:bg-neutral-100 text-neutral-700 hover:text-neutral-900',
  };

  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={handleClick}
      whileHover={{ y: -1.5, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      className={`group relative inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-medium text-xs tracking-wide uppercase transition-colors duration-200 cursor-pointer ${variantStyles[variant]} ${className}`}
    >
      <span>{children}</span>

      {icon === 'arrow' && (
        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
      )}
      {icon === 'chevron' && (
        <ChevronRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
      )}
      {icon === 'up-right' && (
        <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      )}
    </motion.button>
  );
};
