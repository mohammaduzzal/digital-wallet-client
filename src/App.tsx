/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Outlet } from "react-router"
import CommonLayout from "./components/layout/CommonLayout"
import { useEffect } from "react"
import "driver.js/dist/driver.min.css";
import tourSteps from "./lib/tourSteps";

const Driver: any = require("driver.js");




function App() {
  useEffect(() => {
    const hasSeenTour = localStorage.getItem("hasSeenTour");
    if (!hasSeenTour) {
      const driver = new Driver({
        allowClose: true,
        overlayClickNext: true,
        showButtons: true,
        padding: 10,
        opacity: 0.75,
      });

      // Convert your existing tourSteps to Driver.js format
      const driverSteps = tourSteps.map(step => ({
        element: step.selector,
        popover: {
          title: "",
          description: step.content,
          position: "bottom"
        }
      }));

      driver.defineSteps(driverSteps);
      driver.start();

      driver.on('reset', () => {
        localStorage.setItem("hasSeenTour", "true");
      });
    }
  }, []);




  return (
    <>



      <CommonLayout>
        <Outlet />
      </CommonLayout>
    </>
  )
}

export default App
