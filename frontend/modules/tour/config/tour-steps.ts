import { DriveStep } from "driver.js";

export const TOUR_STEPS: DriveStep[] = [
  {
    element: "#tour-logo",
    popover: {
      title: "Welcome to Insighta Flow",
      description: "A workspace for analyzing user demographics. Let's walk through the key features to get you started.",
      side: "bottom",
      align: "start",
    },
  },
  {
    element: "#tour-import",
    popover: {
      title: "Import Demographic Datasets",
      description: "Click here to upload CSV demographic files (up to 100MB). Ingestion streams data instantly.",
      side: "bottom",
      align: "center",
    },
  },
  {
    element: "#tour-query-builder",
    popover: {
      title: "Visual Query Builder",
      description: "Build recursive logical rules (AND/OR groups) filtering demographic attributes like Age, Income, and Category.",
      side: "right",
      align: "start",
    },
  },
  {
    element: "#tour-run-query",
    popover: {
      title: "Run Query",
      description: "Once your query is built, click here to execute it against the database.",
      side: "bottom",
      align: "center",
    },
  },
  {
    element: "#tour-tab-results",
    popover: {
      title: "Results View",
      description: "See paginated, sortable raw data records matched by the query. You can also export this subset to CSV.",
      side: "top",
      align: "center",
    },
  },
  {
    element: "#tour-tab-analytics",
    popover: {
      title: "Analytics Dashboard",
      description: "Switch to this tab to visualize averages, distributions, and registration trends in interactive Recharts charts.",
      side: "top",
      align: "center",
    },
  },
  {
    element: "#tour-save",
    popover: {
      title: "Save Workspaces",
      description: "Save your active query state and dataset references remotely to load them later.",
      side: "bottom",
      align: "center",
    },
  },
  {
    element: "#tour-open",
    popover: {
      title: "Open Workspaces",
      description: "Access and reload previously saved analytical workspaces or clean up deleted sessions.",
      side: "bottom",
      align: "center",
    },
  },
];
