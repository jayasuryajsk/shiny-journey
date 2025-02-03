import { useState, useEffect, useCallback } from 'react';
import cx from 'classnames';
import { motion } from 'framer-motion';
import { Tooltip, TooltipTrigger } from '@/components/ui/tooltip';

export type ToolProps = {
  description: string;
  icon: React.ReactNode;
  selectedTool: string | null;
  setSelectedTool: React.Dispatch<React.SetStateAction<string | null>>;
  isToolbarVisible?: boolean;
  setIsToolbarVisible?: React.Dispatch<React.SetStateAction<boolean>>;
  isAnimating: boolean;
  append: (message: any, chatRequestOptions?: any) => Promise<string | null | undefined>;
  onClick: ({ appendMessage }: { appendMessage: any }) => void;
};

export function Tool({
  description,
  icon,
  selectedTool,
  setSelectedTool,
  isToolbarVisible,
  setIsToolbarVisible,
  isAnimating,
  append,
  onClick,
}: ToolProps) {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (selectedTool !== description) {
      setIsHovered(false);
    }
  }, [selectedTool, description]);

  const handleSelect = useCallback(() => {
    if (!isToolbarVisible && setIsToolbarVisible) {
      setIsToolbarVisible(true);
      return;
    }
    if (!selectedTool) {
      setIsHovered(true);
      setSelectedTool(description);
      return;
    }
    if (selectedTool !== description) {
      setSelectedTool(description);
    } else {
      setSelectedTool(null);
      onClick({ appendMessage: append });
    }
  }, [selectedTool, description, isToolbarVisible, setIsToolbarVisible, setSelectedTool, append, onClick]);

  return (
    <Tooltip open={isHovered && !isAnimating}>
      <TooltipTrigger asChild>
        <motion.div
          className={cx('p-3 rounded-full', {
            'bg-primary !text-primary-foreground': selectedTool === description,
          })}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => {
            if (selectedTool !== description) setIsHovered(false);
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              handleSelect();
            }
          }}
          initial={{ scale: 1, opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.1 } }}
          onClick={handleSelect}
        >
          {icon}
        </motion.div>
      </TooltipTrigger>
    </Tooltip>
  );
} 