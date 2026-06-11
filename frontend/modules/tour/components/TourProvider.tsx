"use client";

import { useEffect, ReactNode } from "react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { useTour } from "../hooks/useTour";
import { TOUR_STEPS } from "../config/tour-steps";

interface TourProviderProps {
  children: ReactNode;
}

export function TourProvider({ children }: TourProviderProps) {
  const { isActive, start, end } = useTour();

  useEffect(() => {
    const tourDone = localStorage.getItem("insighta-tour-done");
    if (tourDone !== "true") {
      const timer = setTimeout(() => {
        start();
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [start]);

  useEffect(() => {
    if (!isActive) return;

    const driverObj = driver({
      showProgress: true,
      allowClose: true,
      overlayColor: "rgba(0, 0, 0, 0.75)",
      steps: TOUR_STEPS,
      onDestroyed: () => {
        localStorage.setItem("insighta-tour-done", "true");
        end();
      },
    });

    driverObj.drive();

    return () => {
      driverObj.destroy();
    };
  }, [isActive, end]);

  return <>{children}</>;
}
