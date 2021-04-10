import { useState } from 'react';
import { useResizeDetector } from 'react-resize-detector';

interface SSRMultistepConfig {
  minWidth: number;
  maxWidth: number;
  transition?: number;
}

/** Hook to provide styles for SSR/SSG multistep functionality */
export const useSSRMultistep = (configObj: SSRMultistepConfig) => {
  const defaultValues = {
    transition: 0.3,
  };
  const config = { ...defaultValues, ...configObj };

  //logic
  const [frame, setFrame] = useState(0);
  const { minWidth, maxWidth, transition } = config;
  const { width, ref } = useResizeDetector();

  const dynamicWidth = width || minWidth;

  // styles
  const windowStyles = {
    minWidth,
    maxWidth,
    overflow: 'hidden',
  };

  // Reacts to frame change to move
  const moveFrame = (step: number) => `translateX(${step * -dynamicWidth}px)`;

  const stripStyles = {
    display: 'flex',
    width: 'fit-content',
    transition: `${transition}s`,
    transform: moveFrame(frame),
  };

  // Styles to hide frame
  const hideFrame = (stepNumber: number) => {
    const currentStep = frame === stepNumber;
    const opacity = currentStep ? 1 : 0;
    const visibility = currentStep ? 'visible' : 'hidden';
    return { opacity, visibility };
  };

  const baseFrameStyles = {
    width: dynamicWidth,
    transition: `visibility 0s, opacity ${transition}s`,
  };

  const frameStyles = (stepNumber: number) => ({
    ...baseFrameStyles,
    ...hideFrame(stepNumber),
  });

  return {
    frame,
    setFrame,
    ref,
    windowStyles,
    stripStyles,
    frameStyles,
  };
};
