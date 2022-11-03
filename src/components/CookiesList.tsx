import { ReactComponent as Cookie } from "../cookie.svg";
import './CookiesList.css';

const CookiesList = ({
  conveyorLength,
  lastCookiePosition,
  firstCookiePosition,
  shouldAnimate,
  motorPulseDurationSeconds,
  firstBurnedCookiePosition,
  lastBurnedCookiePosition,
  ovenPosition,
  ovenLength,
  cookieDistance,
}: {
  conveyorLength: number;
  lastCookiePosition: number;
  firstCookiePosition: number;
  shouldAnimate: boolean;
  motorPulseDurationSeconds: number;
  firstBurnedCookiePosition: number;
  lastBurnedCookiePosition: number;
  ovenPosition: number;
  ovenLength: number;
  cookieDistance: number;
}) => {
  const getCookieColor = (cookieIndex: number) => {
    const cookieDonePercentage = getCookieDonePercentageByIndex(cookieIndex);

    if (cookieDonePercentage > 1) {
      return "black";
    }

    const multiplier = 1 - cookieDonePercentage * 0.39;
    return `rgb(${216 * multiplier}, ${159 * multiplier}, ${57 * multiplier})`;
  };

  const getCookieDonePercentageByIndex = (cookieIndex: number) => {
    const conveyorHasasBurnedCookies =
      firstBurnedCookiePosition !== -1 || lastBurnedCookiePosition !== -1;
    if (conveyorHasasBurnedCookies) {
      const cookieIsBurned =
        cookieIndex + 1 <= firstBurnedCookiePosition &&
        cookieIndex + 1 >= lastBurnedCookiePosition;
      if (cookieIsBurned) {
        return 2;
      }
    }
    if (cookieIndex < ovenPosition - 2) {
      return 0;
    }

    if (cookieIndex >= ovenPosition + ovenLength - 3) {
      return 1;
    }
    const cookiePositionInOven = cookieIndex - ovenPosition + 2;
    return cookiePositionInOven / ovenLength;
  };

  const fallInBasketAnimation: React.CSSProperties = shouldAnimate
    ? {
        animation: `rotate-br ${motorPulseDurationSeconds}s linear`,
        animationIterationCount: "infinite",
        zIndex: 10,
      }
    : {};

  const slideRightAnimation: React.CSSProperties = shouldAnimate
    ? {
        animation: `slide-right ${motorPulseDurationSeconds}s`,
        animationIterationCount: "infinite",
      }
    : {};

  return (
    <>
      {Array.from({ length: conveyorLength - 1 }).map((x, i) => {
        return (
         
            <div
              key={i}
              style={{
                position: "absolute",
                left: 45 + cookieDistance * (i + 1),
                opacity:
                  lastCookiePosition < i + 2 && firstCookiePosition > i ? 1 : 0,
                bottom: 109,
                zIndex: -1,
                ...(i === conveyorLength - 2
                  ? fallInBasketAnimation
                  : slideRightAnimation),
              }}
            >
              <Cookie style={{ width: 50, color: getCookieColor(i) }} />
            </div>
          
        );
      })}
    </>
  );
};

export default CookiesList;
