import { useCallback, useRef } from 'react';

/**
 * useDebounceCallback - A hook that creates a debounced function that delays invoking the callback until after
 * a specified delay in milliseconds has elapsed since the last time the debounced function was invoked.
 * 
 * @param callback - Function to debounce
 * @param delay - Delay in milliseconds
 * @returns A debounced version of the callback function
 */
function useDebounceCallback<T extends (...args: any[]) => void>(callback: T, delay: number): T {
    // Use a ref to store the handle of the timeout
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // useCallback to return a stable function
    const debouncedFunction = useCallback((...args: Parameters<T>) => {
        // Clear the existing timeout, if any
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        // Set a new timeout
        timeoutRef.current = setTimeout(() => {
            callback(...args);
        }, delay);
    }, [callback, delay]); // Re-create this function if callback or delay changes

    // Return the debounced function
    return debouncedFunction as T;
}

export default useDebounceCallback;