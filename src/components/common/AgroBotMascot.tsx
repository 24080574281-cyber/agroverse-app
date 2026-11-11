import React from 'react';
import { motion } from 'motion/react';

export type MascotPose = 
  | 'thumbs_up'   // Standing with tablet & thumb up (Left big)
  | 'celebrate'   // Cheerful laughing with double thumbs up (Top middle)
  | 'thinking'    // Thinking with question mark (Top right)
  | 'laptop'      // Sitting with laptop (Bottom middle)
  | 'harvest'     // Holding crate of vegetables & heart (Bottom right)
  | 'sheet';      // Full sheet

interface AgroBotMascotProps {
  pose?: MascotPose;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  className?: string;
  speechBubble?: string;
  onClick?: () => void;
  animated?: boolean;
}

export const AgroBotMascot: React.FC<AgroBotMascotProps> = ({
  pose = 'thumbs_up',
  size = 'md',
  className = '',
  speechBubble,
  onClick,
  animated = true
}) => {
  // Dimension maps
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32',
    '2xl': 'w-48 h-48',
    full: 'w-full h-auto aspect-square'
  };

  // Background position percentages corresponding to each mascot on the sprite sheet:
  // Sheet is ~ 3:2 aspect ratio with 5 distinct poses
  const getPoseStyle = (poseType: MascotPose): React.CSSProperties => {
    switch (poseType) {
      case 'thumbs_up':
        // Big mascot on left: X ~ 14%, Y ~ 50%, zoomed ~ 210%
        return {
          backgroundImage: `url('/assets/aistudio/Cheerful_Sprout_Robot_Mascot_Sheet_86150c02.png')`,
          backgroundSize: '225% 150%',
          backgroundPosition: '5% 45%',
          backgroundRepeat: 'no-repeat'
        };
      case 'celebrate':
        // Top middle: X ~ 60%, Y ~ 20%
        return {
          backgroundImage: `url('/assets/aistudio/Cheerful_Sprout_Robot_Mascot_Sheet_86150c02.png')`,
          backgroundSize: '310% 230%',
          backgroundPosition: '60% 12%',
          backgroundRepeat: 'no-repeat'
        };
      case 'thinking':
        // Top right: X ~ 88%, Y ~ 20%
        return {
          backgroundImage: `url('/assets/aistudio/Cheerful_Sprout_Robot_Mascot_Sheet_86150c02.png')`,
          backgroundSize: '310% 230%',
          backgroundPosition: '90% 12%',
          backgroundRepeat: 'no-repeat'
        };
      case 'laptop':
        // Bottom middle: X ~ 60%, Y ~ 80%
        return {
          backgroundImage: `url('/assets/aistudio/Cheerful_Sprout_Robot_Mascot_Sheet_86150c02.png')`,
          backgroundSize: '310% 230%',
          backgroundPosition: '60% 88%',
          backgroundRepeat: 'no-repeat'
        };
      case 'harvest':
        // Bottom right with vegetable crate & heart: X ~ 90%, Y ~ 85%
        return {
          backgroundImage: `url('/assets/aistudio/Cheerful_Sprout_Robot_Mascot_Sheet_86150c02.png')`,
          backgroundSize: '310% 230%',
          backgroundPosition: '90% 88%',
          backgroundRepeat: 'no-repeat'
        };
      case 'sheet':
      default:
        return {};
    }
  };

  const content = (
    <div className={`relative inline-flex flex-col items-center select-none ${onClick ? 'cursor-pointer' : ''} ${className}`}>
      {speechBubble && (
        <motion.div
          initial={{ opacity: 0, y: 8, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="absolute -top-12 z-20 whitespace-nowrap bg-white dark:bg-slate-800 text-slate-800 dark:text-emerald-300 text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg border border-emerald-100 dark:border-emerald-800 flex items-center gap-1.5 pointer-events-none"
        >
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          {speechBubble}
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white dark:bg-slate-800 border-r border-b border-emerald-100 dark:border-emerald-800 rotate-45" />
        </motion.div>
      )}

      {pose === 'sheet' ? (
        <img
          src="/assets/aistudio/Cheerful_Sprout_Robot_Mascot_Sheet_86150c02.png"
          alt="AgroBot Mascot Agroverse"
          className="rounded-2xl w-full h-auto object-cover shadow-sm"
        />
      ) : (
        <div
          className={`${sizeClasses[size]} rounded-full overflow-hidden transition-transform duration-300 hover:scale-105 drop-shadow-md`}
          style={getPoseStyle(pose)}
          role="img"
          aria-label={`AgroBot ${pose}`}
        />
      )}
    </div>
  );

  if (animated) {
    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
      >
        {content}
      </motion.div>
    );
  }

  return <div onClick={onClick}>{content}</div>;
};
