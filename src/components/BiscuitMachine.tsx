import React, { MouseEventHandler } from "react";
import { ReactComponent as MachineBase } from "../aseets/base.svg";
import "./BiscuitMachine.css";

const BiscuitMachine = ({
  ovenTemperature,
  ovenHeated,
  motorOn,
  machineOn,
  machinePaused,
  cookedCookiesAmount,
  firstCookiePosition,
  lastCookiePosition,
  onMachineOnClick,
  onMachineOffClick,
  onMachinePauseClick,
}: {
  ovenTemperature: number;
  ovenHeated: boolean;
  motorOn: boolean;
  machineOn: boolean;
  machinePaused: boolean;
  cookedCookiesAmount: number;
  firstCookiePosition: number;
  lastCookiePosition: number;
  onMachineOnClick: MouseEventHandler<HTMLButtonElement>;
  onMachineOffClick: MouseEventHandler<HTMLButtonElement>;
  onMachinePauseClick: MouseEventHandler<HTMLButtonElement>;
}) => {
  const cookieDistance = 80;
  const conveyorLength = 6;
  const ovenLength = 2;
  const ovenPosition = 4;

  return (
    <>
      <div className="machine-container">
            {/* Static */}
             <img
              src="./extruder-stamper.png"
              alt="cookie"
              style={{ position: "absolute", left: 32, bottom: 154, width: 144 }}
            />
             <img
              src="./biscuit-container.png"
              alt="cookie"
              style={{ position: "absolute", left: (cookieDistance * (conveyorLength - 1)) + 120, bottom: 46, width: 56, zIndex: 1 }}
            />

            {/* Conveyor */}
            <div 
            style={{ position: "absolute", left: 35, bottom: 113, backgroundColor: 'grey',width: (cookieDistance * (conveyorLength - 1)) + 60,  height: 5, border: "2px rgb(99, 98, 98) solid" }}

            />
            {/* Oven */}
            
            <div 
            style={{ position: "absolute", left: ovenPosition * cookieDistance - cookieDistance / 2 - 11, bottom: 114, height: 75, width: cookieDistance * ovenLength , border: "2.5px rgb(99, 98, 98) solid", zIndex: -1 }}

            />

            <div 
            style={{ position: "absolute", left: ovenPosition * cookieDistance - cookieDistance / 2 - 3, bottom: 114, height: 37, width: cookieDistance * ovenLength - 16 , border: "2.5px rgb(99, 98, 98) solid", zIndex: -1 }}

            />
            {/* Dynamic */}
        {lastCookiePosition < 1 && firstCookiePosition > -1 ? (
          <>
            <img
              src="./cookie-dough.png"
              alt="cookie"
              style={{ position: "absolute", right: 480, bottom: 122 }}
            />
            <img
              src="./cookie-dough-falling.png"
              alt="cookie-dough-falling"
              style={{
                position: "absolute",
                right: 474,
                bottom: 129,
                zIndex: -1,
              }}
            />
          </>
        ) : null}
        <div className="stamping-head"></div>
        <div className="stamping-pipe"></div>
        {
         firstCookiePosition > -1 ? Array.from({ length: conveyorLength }).map((x, i) => {
          return (
          <>
            {lastCookiePosition < i + 2 && firstCookiePosition > i ?
            <img
              src="./cookie.png"
              alt="cookie"
              style={{
                position: "absolute",
                right: 386 - (cookieDistance * i),
                bottom: 115,
                zIndex: -1,
              }}
            /> : null}
          </>
          ) 
         }) : null
        }
     
        {firstCookiePosition === 5 &&
        lastCookiePosition > 0 &&
        cookedCookiesAmount > 0 ? (
          <img
            src="./falling-cookie.png"
            alt="falling-cookie"
            style={{ position: "absolute", left: (cookieDistance * (conveyorLength - 1)) + 120, bottom: 80, zIndex: 1 }}
          />
        ) : null}

        
        <div
          className="heating-agent"
          style={{ backgroundColor: ovenHeated ? "red" : "rgb(184, 181, 181",   width: cookieDistance * ovenLength - 45,
          left: cookieDistance * ovenPosition - 30 }}
        ></div>
        <div className="oven-temperature">{ovenTemperature}°</div>
        {cookedCookiesAmount ? (
          <div className="total-cookies">{cookedCookiesAmount}</div>
        ) : null}

        <div className="btn-group">
          <button
            onClick={onMachineOnClick}
            style={{
              backgroundColor: machineOn ? "#04AA6D" : "rgb(184, 181, 181)",
            }}
          >
            On
          </button>
          <button
            style={{
              backgroundColor:
                !machineOn && !machinePaused ? "#04AA6D" : "rgb(184, 181, 181)",
            }}
            onClick={onMachineOffClick}
          >
            Off
          </button>
          <button
            onClick={onMachinePauseClick}
            style={{
              backgroundColor: machinePaused ? "#04AA6D" : "rgb(184, 181, 181)",
            }}
          >
            Pause
          </button>
        </div>
      </div>
    </>
  );
};
export default BiscuitMachine;
