import React, { useState, useEffect, MouseEventHandler } from "react";
import io from "socket.io-client";
import "./App.css";
import BiscuitMachine from "./components/BiscuitMachine";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import CookieSpinner from "./components/CookieSpinner";

if (!process.env.REACT_APP_BISCUIT_WS_URL) {
  throw new Error("Please configure env variable REACT_APP_BISCUIT_WS_URL");
}

let socket = io(process.env.REACT_APP_BISCUIT_WS_URL);
function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [ovenTemperature, setOvenTemperature] = useState(0);
  const [ovenHeated, setOvenHeated] = useState(false);
  const [motorOn, setMotorOn] = useState(false);
  const [machineOn, setMachineOn] = useState(false);
  const [machinePaused, setMachinePaused] = useState(false);
  const [cookedCookiesAmount, setCookedCookiesAmount] = useState(0);
  const [firstCookiePosition, setFirstCookiePosition] = useState(-1);
  const [lastCookiePosition, setLastCookiePosition] = useState(-1);

  useEffect(() => {
    socket.on("error", (e) => console.log(99999, e));
    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("OVEN_TEMPERATURE_CHANGE", (value) => {
      setOvenTemperature(value);
    });

    socket.on("OVEN_HEATED", (value) => {
      setOvenHeated(value);
    });

    socket.on("MOTOR_ON", (value) => {
      setMotorOn(value);
    });
    socket.on("connect_error", (e) =>
      toastr.error(
        "Server connection error, please check Readme if problem persists."
      )
    );
    socket.on("MACHINE_ON", (value) => {
      if (value) {
        toastr.success("Biscuit machine is running.");
      }
      setMachineOn(value);
    });

    socket.on("MACHINE_PAUSED", (value) => {
      if (value) {
        toastr.success("Biscuit machine paused.");
      }
      setMachinePaused(value);
    });

    socket.on("COOKIE_COOKED", (value) => {
      setCookedCookiesAmount(value);
    });

    socket.on("ERROR", (value) => {
      toastr.error(value);
    });

    socket.on("COOKIES_MOVED", (value) => {
      setFirstCookiePosition(value.firstCookiePosition);
      setLastCookiePosition(value.lastCookiePosition);
    });

    return () => {
      socket.removeAllListeners();
    };
  }, []);

  const machineOnHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    socket.emit("TURN_ON_MACHINE");
  };
  const machinePauseHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    socket.emit("PAUSE_MACHINE");
  };

  const machineOffHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    socket.emit("TURN_OFF_MACHINE");
  };

  // const errorHandler = (handler: any) => {
  //   const handleError = (err: string) => {
  //     console.error("please handle me", err);
  //   };

  //   return (...args: any[]) => {
  //     try {
  //       //@ts-ignore
  //       const ret = handler.apply(this, args);
  //       if (ret && typeof ret.catch === "function") {
  //         // async handler
  //         ret.catch(handleError);
  //       }
  //     } catch (e: any) {
  //       // sync handler
  //       handleError(e);
  //     }
  //   };
  // };
  return (
    <div>
      {isConnected ? (
        <BiscuitMachine
          ovenTemperature={ovenTemperature}
          ovenHeated={ovenHeated}
          motorOn={motorOn}
          machineOn={machineOn}
          machinePaused={machinePaused}
          cookedCookiesAmount={cookedCookiesAmount}
          firstCookiePosition={firstCookiePosition}
          lastCookiePosition={lastCookiePosition}
          onMachineOnClick={machineOnHandler}
          onMachineOffClick={machineOffHandler}
          onMachinePauseClick={machinePauseHandler}
        />
      ) : (
        <CookieSpinner />
      )}
    </div>
  );
}

export default App;
