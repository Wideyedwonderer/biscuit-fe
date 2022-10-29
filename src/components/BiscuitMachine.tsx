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
  return (
    <>
      <div className="machine-container">
        <MachineBase></MachineBase>
        {lastCookiePosition < 1 && firstCookiePosition > -1 ? (
          <>
            <img
              src="./cookie-dough.png"
              alt="cookie"
              style={{ position: "absolute", right: 479, bottom: 122 }}
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

        {lastCookiePosition < 2 && firstCookiePosition > 0 ? (
          <img
            src="./cookie.png"
            alt="cookie"
            style={{
              position: "absolute",
              right: 386,
              bottom: 115,
              zIndex: -1,
            }}
          />
        ) : null}
        {lastCookiePosition < 3 && firstCookiePosition > 1 ? (
          <img
            src="./cookie.png"
            alt="cookie"
            style={{
              position: "absolute",
              right: 305,
              bottom: 115,
              zIndex: -1,
            }}
          />
        ) : null}
        {lastCookiePosition < 4 && firstCookiePosition > 2 ? (
          <img
            src="./cooked-cookie.png"
            alt="cooked-cookie"
            style={{
              position: "absolute",
              right: 217,
              bottom: 115,
              zIndex: -1,
            }}
          />
        ) : null}
        {lastCookiePosition < 5 && firstCookiePosition > 3 ? (
          <img
            src="./cooked-cookie.png"
            alt="cooked-cookie"
            style={{
              position: "absolute",
              right: 147,
              bottom: 115,
              zIndex: -1,
            }}
          />
        ) : null}
        {lastCookiePosition < 6 && firstCookiePosition > 4 ? (
          <img
            src="./cooked-cookie.png"
            alt="cooked-cookie"
            style={{ position: "absolute", right: 79, bottom: 115, zIndex: -1 }}
          />
        ) : null}
        {firstCookiePosition === 5 &&
        lastCookiePosition > 0 &&
        cookedCookiesAmount > 0 ? (
          <img
            src="./falling-cookie.png"
            alt="falling-cookie"
            style={{ position: "absolute", right: 25, bottom: 80, zIndex: 1 }}
          />
        ) : null}

        {cookedCookiesAmount > 0 ? (
          <img
            src="./cooked-cookie.png"
            alt="cooked-cookie"
            style={{ position: "absolute", right: 12, bottom: 55, zIndex: -1 }}
          />
        ) : null}
        {cookedCookiesAmount > 1 ? (
          <img
            src="./cooked-cookie.png"
            alt="cooked-cookie"
            style={{ position: "absolute", right: 12, bottom: 60, zIndex: -1 }}
          />
        ) : null}
        {cookedCookiesAmount > 2 ? (
          <img
            src="./cooked-cookie.png"
            alt="cooked-cookie"
            style={{ position: "absolute", right: 12, bottom: 60, zIndex: -1 }}
          />
        ) : null}
        {cookedCookiesAmount > 4 ? (
          <img
            src="./cooked-cookie.png"
            alt="cooked-cookie"
            style={{ position: "absolute", right: 12, bottom: 65, zIndex: -1 }}
          />
        ) : null}
        <div
          className="heating-agent"
          style={{ backgroundColor: ovenHeated ? "red" : "rgb(184, 181, 181" }}
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
