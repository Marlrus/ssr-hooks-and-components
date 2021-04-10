import { useEffect, useState } from 'react';

interface DelayConfig {
  show?: boolean;
  startDelay?: number;
  unrenderDelay?: number;
}

/** Allows for delayed class setting and unsetting for dynamic renderding and un-rendering */
export const useDelayClass = (config?: DelayConfig) => {
  const defaultValues = {
    show: true,
    startDelay: 1,
    unrenderDelay: 200,
  };
  const configObj = { ...defaultValues, ...config };

  const { show, startDelay, unrenderDelay } = configObj;

  const [visible, setVisible] = useState(false);
  const [render, setRender] = useState(false);

  // Fade in and out animation
  useEffect(() => {
    if (!show) return setVisible(false);
    setTimeout(() => {
      setVisible(true);
    }, startDelay);
  }, [show, setVisible]);

  // Render & un-render component
  useEffect(() => {
    if (show) return setRender(true);
    setTimeout(() => {
      setRender(false);
    }, unrenderDelay);
  }, [show, setRender]);

  return { visible, render };
};
