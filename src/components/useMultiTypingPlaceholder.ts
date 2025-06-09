import { useState, useEffect } from "react";

interface UseMultiTypingProps {
  texts: string[];
  delay?: number;
  pauseTime?: number;
  isActive: boolean;
}

export function useMultiTypingPlaceholder({
  texts,
  delay = 100,
  pauseTime = 1500,
  isActive,
}: UseMultiTypingProps) {
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [placeholder, setPlaceholder] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!isActive) {
      setPlaceholder("");
      return;
    }

    const currentText = texts[textIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && charIndex < currentText.length) {
      timeout = setTimeout(() => {
        setPlaceholder(currentText.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, delay);
    } else if (!isDeleting && charIndex === currentText.length) {
      timeout = setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setPlaceholder(currentText.slice(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      }, delay / 2);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setTextIndex((prev) => (prev + 1) % texts.length);
    }

    return () => clearTimeout(timeout);
  }, [texts, textIndex, charIndex, isDeleting, delay, pauseTime, isActive]);

  return placeholder;
}
