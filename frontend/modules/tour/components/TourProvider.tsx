"use client";

import { useEffect, ReactNode } from "react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { useTour } from "../hooks/useTour";
import { TOUR_STEPS } from "../config/tour-steps";
import { useWorkspaceStore } from "@/store";

interface TourProviderProps {
  children: ReactNode;
}

export function TourProvider({ children }: TourProviderProps) {
  const { isActive, start, end } = useTour();
  const datasetId = useWorkspaceStore((state) => state.datasetId);

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

    const filteredSteps = TOUR_STEPS.filter((step) => {
      if (!datasetId) {
        const excludedElements = [
          "#tour-query-builder",
          "#tour-run-query",
          "#tour-tab-results",
          "#tour-tab-analytics",
        ];
        return !excludedElements.includes(step.element as string);
      }
      return true;
    });

    const driverObj = driver({
      showProgress: true,
      allowClose: true,
      stagePadding: 6,
      stageRadius: 6,
      overlayColor: "rgba(0, 0, 0, 0.75)",
      steps: filteredSteps,
      onDestroyed: () => {
        localStorage.setItem("insighta-tour-done", "true");
        end();
      },
    });

    driverObj.drive();

    return () => {
      driverObj.destroy();
    };
  }, [isActive, end, datasetId]);

  return <>{children}</>;
}
