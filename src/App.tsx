import React, { useState, useEffect, MouseEventHandler } from "react";
import io from "socket.io-client";
import "./App.css";
import BiscuitMachine from "./components/BiscuitMachine";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import CookieSpinner from "./components/CookieSpinner";
import {
  BiscuitMachineEvents,
  BuscuitMachineEventPayloadTypes,
} from 'biscuit-machine-commons';

if (!process.env.REACT_APP_BISCUIT_WS_URL) {
  throw new Error("Please configure env variable REACT_APP_BISCUIT_WS_URL");
}

let socket = io(process.env.REACT_APP_BISCUIT_WS_URL);
const subscribeToEvent = <T extends BiscuitMachineEvents | 'connect' | 'disconnect' | 'connect_error'>(
  event: T,
  callback:  T extends BiscuitMachineEvents ? (value: BuscuitMachineEventPayloadTypes[T]) => void : (...args: any[]) => void,
) => {
  socket.on<T>(event, callback as any);
}
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
  const [conveyorLength, setConveyorLength] = useState(-1);
  const [ovenLength, setOvenLength] = useState(-1);
  const [ovenStartPosition, setOvenStartPosition] = useState(-1);

  useEffect(() => {
    subscribeToEvent("connect", () => {
      setIsConnected(true);
    });

    subscribeToEvent("disconnect", () => {
      setIsConnected(false);
    });

    subscribeToEvent("connect_error", (e) =>
      toastr.error(
        "Server connection error, please check Readme if problem persists."
      )
    );

    subscribeToEvent(BiscuitMachineEvents.OVEN_TEMPERATURE_CHANGE, (value) => {
      setOvenTemperature(value);
    });

    subscribeToEvent(BiscuitMachineEvents.OVEN_HEATED, (value) => {
      setOvenHeated(value);
    });

    subscribeToEvent(BiscuitMachineEvents.MOTOR_ON, (value) => {
      setMotorOn(value);
    });

    subscribeToEvent(BiscuitMachineEvents.MACHINE_ON, (value) => {
      if (value) {
        toastr.success("Biscuit machine is running.");
      }
      setMachineOn(value);
    });

    subscribeToEvent(BiscuitMachineEvents.INITIAL_CONFIG,({conveyorLength, ovenLength, ovenPosition}) => {
      setConveyorLength(conveyorLength);
      setOvenLength(ovenLength);
      setOvenStartPosition(ovenPosition);
    });

    subscribeToEvent(BiscuitMachineEvents.MACHINE_PAUSED, (value) => {
      if (value) {
        toastr.success("Biscuit machine paused.");
      }
      setMachinePaused(value);
    });

    subscribeToEvent(BiscuitMachineEvents.COOKIE_COOKED, (value) => {
      setCookedCookiesAmount(value);
    });

    subscribeToEvent(BiscuitMachineEvents.ERROR, (value) => {
      toastr.error(value);
    });

    subscribeToEvent(BiscuitMachineEvents.WARNING, (value) => {
      toastr.warning(value);
    });

    subscribeToEvent(BiscuitMachineEvents.COOKIES_MOVED, (value) => {
      setFirstCookiePosition(value.firstCookiePosition);
      setLastCookiePosition(value.lastCookiePosition);
      console.log('all cooiies', value.lastCookiePosition, value.firstCookiePosition)
      console.log('burned', value.lastBurnedCookiePosition, value.firstBurnedCookiePosition)
    });

    return () => {
      socket.removeAllListeners();
    };
  }, []);

  const machineOnHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    socket.emit(BiscuitMachineEvents.TURN_ON_MACHINE);
  };
  const machinePauseHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    socket.emit(BiscuitMachineEvents.PAUSE_MACHINE);
  };

  const machineOffHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    socket.emit(BiscuitMachineEvents.TURN_OFF_MACHINE);
  };

  return (
    <div>
      {isConnected && conveyorLength > 0 ? (
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
          conveyorLength={conveyorLength}
          ovenLength={ovenLength}
          ovenPosition={ovenStartPosition}
        />
      ) : (
        <CookieSpinner />
      )}
    </div>
  );
}

export default App;
