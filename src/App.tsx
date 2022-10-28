import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./App.css";
import BiscuitMachine from "./BiscuitMachine";
import toastr from "toastr";
import "toastr/build/toastr.min.css"
// TODO: improve
if (
  !process.env.REACT_APP_BISCUIT_WS_URL
) {
  throw new Error(
    "Please configure env variable BISCUIT_WS_URL"
  );
}
;
const socket = io(process.env.REACT_APP_BISCUIT_WS_URL);
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
    console.log(111111111)
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

    socket.on("MACHINE_ON", (value) => {
      if(value){
        toastr.success('Biscuit machine is running.');
      }
      setMachineOn(value);
    });

    socket.on("MACHINE_PAUSED", (value) => {
      if(value) {
        toastr.success('Biscuit machine paused.');
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
      socket.off("connect");
      socket.off("disconnect");
      socket.off("pong");
      socket.off("ERROR");
      socket.off("COOKIES_MOVED");
      socket.off("COOKIE_COOKED");
      socket.off("MACHINE_PAUSED");
      socket.off("MACHINE_ON");
      socket.off("MOTOR_ON");
      socket.off("OVEN_HEATED");
      socket.off("OVEN_TEMPERATURE_CNAHGE");
    };
  }, []);

  return (
    <div>
      <BiscuitMachine
        ovenTemperature={ovenTemperature}
        ovenHeated={ovenHeated}
        motorOn={motorOn}
        machineOn={machineOn}
        machinePaused={machinePaused}
        cookedCookiesAmount={cookedCookiesAmount}
        firstCookiePosition={firstCookiePosition}
        lastCookiePosition={lastCookiePosition}
      />

      <p>Connected: {"" + isConnected}</p>
      <p>Oven temperature: {ovenTemperature || "-"}</p>
      <p>Motor ON: {motorOn ? "TRUE" : "FALSE"}</p>
      <p>Oven HEATED: {ovenHeated ? "TRUE" : "FALSE"}</p>
      <p>Machine ON: {machineOn ? "TRUE" : "FALSE"}</p>
      <p>Machine PAUSED: {machinePaused ? "TRUE" : "FALSE"}</p>

      <button onClick={() => socket.emit("TURN_ON_MACHINE")}>ON</button>
      <button onClick={() => socket.emit("TURN_OFF_MACHINE")}>OFF</button>
      <button onClick={() => socket.emit("PAUSE_MACHINE")}>PAUSE</button>
    </div>
  );
}

export default App;
