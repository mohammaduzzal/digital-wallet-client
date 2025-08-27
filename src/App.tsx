import { Outlet } from "react-router"
import CommonLayout from "./components/layout/CommonLayout"
import { useEffect, useState } from "react"
import Joyride, { type CallBackProps, STATUS } from "react-joyride";
import tourSteps from "./lib/tourSteps";



function App() {
  const [runTour,setRunTour] = useState(false)

  useEffect(()=>{
    const hasSeenTour = localStorage.getItem("hasSeenTour")
    if(!hasSeenTour){
      setRunTour(true)
    }
  },[])

  const handleJoyRideCallback =(data : CallBackProps)=>{
    const {status} = data
     const finished: boolean = status === STATUS.FINISHED || status === STATUS.SKIPPED
    if (finished) {
      localStorage.setItem("hasSeenTour", "true");
      setRunTour(false);
    }
  }


  return (
    <>

     <Joyride
        steps={tourSteps}
        run={runTour}
        continuous
        showSkipButton
        showProgress
        callback={handleJoyRideCallback}
        styles={{
          options: {
            zIndex: 10000,
          },
        }}
      />


    <CommonLayout>
      <Outlet/>
    </CommonLayout>
    </>
  )
}

export default App
