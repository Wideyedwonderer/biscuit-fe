import { ReactComponent as MachineBase } from "./aseets/base.svg";

const BiscuitMachine = ({
  ovenTemperature,
  ovenHeated,
  motorOn,
  machineOn,
  machinePaused,
  cookedCookiesAmount,
  firstCookiePosition,
  lastCookiePosition,
}: {
  ovenTemperature: number;
  ovenHeated: boolean;
  motorOn: boolean;
  machineOn: boolean;
  machinePaused: boolean;
  cookedCookiesAmount: number;
  firstCookiePosition: number;
  lastCookiePosition: number;
}) => {
  return (
    <>
      <div className="machine-container">
        <MachineBase></MachineBase>
        {true ?? (
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
        )}
        <div className="stamping-head"></div>
        <div className="stamping-pipe"></div>

        {(lastCookiePosition < 2 && firstCookiePosition > 0) ? <img
          src="./cookie.png"
          alt="cookie"
          style={{ position: "absolute", right: 386, bottom: 115, zIndex: -1 }}
        /> : null
        }
        {(lastCookiePosition < 3 && firstCookiePosition > 1) ? <img
          src="./cookie.png"
          alt="cookie"
          style={{ position: "absolute", right: 305, bottom: 115, zIndex: -1 }}
        /> : null}
        {(lastCookiePosition < 4 && firstCookiePosition > 2) ? <img
          src="./cooked-cookie.png"
          alt="cooked-cookie"
          style={{ position: "absolute", right: 217, bottom: 115, zIndex: -1 }}
        />: null}
        {(lastCookiePosition < 5 && firstCookiePosition > 3) ? <img
          src="./cooked-cookie.png"
          alt="cooked-cookie"
          style={{ position: "absolute", right: 147, bottom: 115, zIndex: -1 }}
        />: null}
        {(lastCookiePosition < 6 && firstCookiePosition > 4) ? <img
          src="./cooked-cookie.png"
          alt="cooked-cookie"
          style={{ position: "absolute", right: 79, bottom: 115, zIndex: -1 }}
        />: null}
       {/* {(lastCookiePosition === 5 && firstCookiePosition) > 0 ??  <img
          src="./falling-cookie.png"
          alt="falling-cookie"
          style={{ position: "absolute", right: 25, bottom: 80, zIndex: 1 }}
        />} */}

        <div className="heating-agent"></div>
      </div>

      <p>Total Cooked Cookies: {cookedCookiesAmount}</p>

      <p>First Cookie Position: {firstCookiePosition}</p>
      <p>Last Cookie Position: {lastCookiePosition}</p>
    </>
  );
};
export default BiscuitMachine;
