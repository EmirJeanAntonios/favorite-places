import { RefObject, useEffect } from "react";

// This hook accepts a ref and a callback function to call on outside clicks
function useOutsideClick<T extends HTMLElement>(
  ref: RefObject<T>,
  onOutsideClick: (event: MouseEvent) => void
): void {
  useEffect(() => {
    // Handler to call on click
    const handleClickOutside = (event: MouseEvent): void => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onOutsideClick(event);
      }
    };

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, onOutsideClick]); // Re-bind the event listener if ref or handler changes
}

export default useOutsideClick;
