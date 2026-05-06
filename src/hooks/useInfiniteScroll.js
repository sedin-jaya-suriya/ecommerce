import { useEffect, useRef } from "react";


const useInfiniteScroll = (callback, hasMore) => {
  const ref = useRef();
  const callbackRef = useRef(callback);


  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          callbackRef.current?.();
        }
      },
      { rootMargin: "200px", threshold: 0 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [hasMore]);
};

export default useInfiniteScroll;