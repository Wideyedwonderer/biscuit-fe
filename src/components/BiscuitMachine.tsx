import React, { MouseEventHandler } from "react";
import { ReactComponent as Cookie } from "./cookie.svg";
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
  conveyorLength,
  ovenLength,
  ovenPosition,
  firstBurnedCookiePosition,
  lastBurnedCookiePosition,
}: {
  ovenTemperature: number;
  ovenHeated: boolean;
  motorOn: boolean;
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
}) => {
  const cookieDistance = 80;
  const getCookieColor = (cookieIndex: number) => {
    const cookieDonePercentage = getCookieDonePercentageByIndex(cookieIndex);
    console.log(cookieDonePercentage, cookieIndex)

    if(cookieDonePercentage > 1) {
      return 'black';
    }


    const multiplier = 1 - (cookieDonePercentage * 0.39);
    console.log(cookieDonePercentage, multiplier, cookieIndex)
    return `rgb(${216 * multiplier}, ${159 * multiplier}, ${57 * multiplier})`
  }
  const getCookieDonePercentageByIndex = (cookieIndex: number) => {
    const conveyorHasasBurnedCookies =
      firstBurnedCookiePosition !== -1 || lastBurnedCookiePosition !== -1;
    if (conveyorHasasBurnedCookies) {
      const cookieIsBurned = cookieIndex + 1 <= firstBurnedCookiePosition && cookieIndex + 1 >= lastBurnedCookiePosition;
      if(cookieIsBurned) {
        return 2;
      }
    }
    if(cookieIndex < ovenPosition - 2) {
      return 0;
    }
    // 7 4 5
    if(cookieIndex >= ovenPosition + ovenLength - 3) {
      return 1;
    }
    const cookiePositionInOven = cookieIndex - ovenPosition + 1;

    return cookiePositionInOven / ovenLength;
  };
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
        {firstCookiePosition > -1
          ? Array.from({ length: conveyorLength }).map((x, i) => {
              return (
                <>
                  {lastCookiePosition < i + 2 && firstCookiePosition > i ? (
                    <div
                      style={{
                        position: "absolute",
                        right: 386 - cookieDistance * i,
                        bottom: 109,
                        zIndex: -1,
                      }}
                    >
                      <Cookie style={{ width: 50, color: getCookieColor(i) }} />
                    </div>
                  ) : null}
                </>
              );
            })
          : null}
        {firstCookiePosition === 5 &&
        lastCookiePosition > 0 &&
        cookedCookiesAmount > 0 ? (
          <img
            src="./falling-cookie.png"
            alt="falling-cookie"
            style={{
              position: "absolute",
              left: cookieDistance * (conveyorLength - 1) + 120,
              bottom: 80,
              zIndex: 1,
            }}
          />
        ) : null}
        <div
          className="heating-agent"
          style={{
            backgroundColor: ovenHeated ? "red" : "rgb(184, 181, 181",
            width: cookieDistance * ovenLength - 45,
            left: cookieDistance * ovenPosition - 30,
          }}
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
