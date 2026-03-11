"use client";

import { useEffect, useRef, useState } from "react";

export default function StickyRevealHeader({
  children,
}: {
  children: React.ReactNode;
}) {
  const [show, setShow] = useState(true);
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;

      // ignore tiny scroll jitter
      if (Math.abs(delta) < 6) return;

      // always show at top
      if (y < 40) {
        setShow(true);
        lastY.current = y;
        return;
      }

      // scrolling down => hide, scrolling up => show
      if (delta > 0) setShow(false);
      else setShow(true);

      lastY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={[
        "sticky top-0 z-50 transition-transform duration-300 ease-out",
        show ? "translate-y-0" : "-translate-y-full",
      ].join(" ")}
    >
      {children}
    </div>
  );
}