import { useState, useEffect } from "react";

interface UseTypingPlaceholderProps {
  text: string;
  delay?: number;
  pauseTime?: number;
  loop?: boolean;
  isActive: boolean;
}

export function useTypingPlaceholder({
  text,
  delay = 100,
  pauseTime = 1500,
  loop = true,
  isActive,
}: UseTypingPlaceholderProps) {
  const [placeholder, setPlaceholder] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!isActive) {
      setPlaceholder("");
      setIndex(0);
      setIsDeleting(false);
      return;
    }

    let timeout: NodeJS.Timeout;

    if (!isDeleting && index < text.length) {
      timeout = setTimeout(() => {
        setPlaceholder((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, delay);
    } else if (!isDeleting && index === text.length && loop) {
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, pauseTime);
    } else if (isDeleting && index > 0) {
      timeout = setTimeout(() => {
        setPlaceholder((prev) => prev.slice(0, -1));
        setIndex((prev) => prev - 1);
      }, delay / 2); // Faster deletion
    } else if (isDeleting && index === 0) {
      setIsDeleting(false);
    }

    return () => clearTimeout(timeout);
  }, [index, isDeleting, text, delay, pauseTime, loop, isActive]);

  return placeholder;
}
