import React, { MouseEventHandler, useEffect, useState } from "react";
import "./BiscuitMachine.css";
import ControlButtons from "./components/ControlButtons";
import CookiesList from "./components/CookiesList";

const BiscuitMachine = ({
  ovenTemperature,
  machineOn,
  machinePaused,
  cookedCookiesAmount,
  firstCookiePosition,
  lastCookiePosition,
  onMachineOnClick,
  onMachineOffClick,
  onMachinePauseClick,
  conveyorLength,
  ovenLength,
  ovenPosition,
  firstBurnedCookiePosition,
  lastBurnedCookiePosition,
  motorPulseDurationSeconds,
}: {
  ovenTemperature: number;
  machineOn: boolean;
  machinePaused: boolean;
  cookedCookiesAmount: number;
  firstCookiePosition: number;
  lastCookiePosition: number;
  firstBurnedCookiePosition: number;
  lastBurnedCookiePosition: number;
  onMachineOnClick: MouseEventHandler<HTMLButtonElement>;
  onMachineOffClick: MouseEventHandler<HTMLButtonElement>;
  onMachinePauseClick: MouseEventHandler<HTMLButtonElement>;
  conveyorLength: number;
  ovenLength: number;
  ovenPosition: number;
  motorPulseDurationSeconds: number;
}) => {
  const cookieDistance = 80;
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (machineOn && lastCookiePosition < 2) {
      if (
        lastCookiePosition === 1
      ) {
        setShouldAnimate(true);
      }
    } else {
      setShouldAnimate(false);
    }

  }, [lastCookiePosition, machineOn, machinePaused]);

  const fallingDough: React.CSSProperties = shouldAnimate
    ? {
        animation: `dough-falling ${motorPulseDurationSeconds}s linear`,
        animationIterationCount: "infinite",
      }
    : {};

  const slideRightFirst: React.CSSProperties = shouldAnimate
    ? {
        animation: `slide-right-first ${motorPulseDurationSeconds}s`,
        animationIterationCount: "infinite",
      }
    : {};
  const stampAnimation: React.CSSProperties = shouldAnimate
    ? {
        WebkitAnimation: `slide-top ${motorPulseDurationSeconds}s ease-in`,
        animation: `slide-top ${motorPulseDurationSeconds}s ease-in`,
        animationIterationCount: "infinite",
        zIndex: -1,
      }
    : {};
  return (
    <>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: `${conveyorLength * cookieDistance + 200}px`,
          height: "215px",
          overflowX: "scroll",
        }}
      >
        <img
          src="./extruder-stamper.png"
          alt="cookie"
          style={{ position: "absolute", left: 32, bottom: 154, width: 144 }}
        />
        <img
          src="./biscuit-container.png"
          alt="cookie"
          style={{
            position: "absolute",
            left: cookieDistance * (conveyorLength - 1) + 120,
            bottom: 46,
            width: 56,
            zIndex: 1,
          }}
        />
        {/* Conveyor */}
        <div
          style={{
            position: "absolute",
            left: 35,
            bottom: 113,
            backgroundColor: "grey",
            width: cookieDistance * (conveyorLength - 1) + 60,
            height: 5,
            border: "2px rgb(99, 98, 98) solid",
          }}
        />
        {/* Oven */}
        <div
          style={{
            position: "absolute",
            left: ovenPosition * cookieDistance - cookieDistance / 2 - 11,
            bottom: 114,
            height: 75,
            width: cookieDistance * ovenLength,
            border: "2.5px rgb(99, 98, 98) solid",
            zIndex: -1,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: ovenPosition * cookieDistance - cookieDistance / 2 - 3,
            bottom: 114,
            height: 37,
            width: cookieDistance * ovenLength - 16,
            border: "2.5px rgb(99, 98, 98) solid",
            zIndex: -1,
          }}
        />

        {/* Heater */}
        <div
          className="heating-agent"
          style={{
            backgroundColor: "red",
            filter: `brightness(${ovenTemperature / 2.4 + 50}%)`,
            width: cookieDistance * ovenLength - 45,
            left: cookieDistance * ovenPosition - 30,
            position: "absolute",
            height: "4px",
            border: "1.5px grey solid",
            bottom: "144px",
          }}
        />
        {/* Temperature */}
         <div
          style={{
            position: "absolute",
            left: cookieDistance * ovenPosition - 40,
            bottom: "160px",
            fontSize: 18,
          }}
        >
          {ovenTemperature}°
        </div>
       {/* Falling dough */}
        {shouldAnimate ? (
          <>
            <img
              src="./cookie-dough.png"
              alt="cookie"
              style={{
                position: "absolute",
                left: 40,
                bottom: 122,
                ...slideRightFirst,
              }}
            />
            <img
              src="./cookie-dough-falling.png"
              alt="cookie-dough-falling"
              style={{
                position: "absolute",
                left: 47,
                bottom: 129,
                zIndex: -1,
                ...fallingDough,
              }}
            />
          </>
        ) : null}

        {/* Stamper */}
        <div className="stamping-head" style={{ ...stampAnimation }}></div>
        <div className="stamping-pipe" style={{ ...stampAnimation }}></div>

        {/* Cookies */}
        {firstCookiePosition > -1 ? (
          <CookiesList
            conveyorLength={conveyorLength}
            lastCookiePosition={lastCookiePosition}
            firstCookiePosition={firstCookiePosition}
            shouldAnimate={shouldAnimate}
            motorPulseDurationSeconds={motorPulseDurationSeconds}
            firstBurnedCookiePosition={firstBurnedCookiePosition}
            lastBurnedCookiePosition={lastBurnedCookiePosition}
            ovenPosition={ovenPosition}
            ovenLength={ovenLength}
            cookieDistance={cookieDistance}
          />
        ) : null}
        {cookedCookiesAmount ? (
          <div
            style={{
              position: "absolute",
              fontSize: 18,
              left: cookieDistance * conveyorLength + 95,
              bottom: "65px",
            }}
          >
            {cookedCookiesAmount}
          </div>
        ) : null}
        <ControlButtons
          onMachineOffClick={onMachineOffClick}
          onMachineOnClick={onMachineOnClick}
          onMachinePauseClick={onMachinePauseClick}
          machineOn={machineOn}
          machinePaused={machinePaused}
        />
      </div>
    </>
  );
};
export default BiscuitMachine;
