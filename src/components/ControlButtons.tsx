import { MouseEventHandler } from "react";
import './ControlButtons.css';

const ControlButtons = ({
    onMachineOnClick,
    onMachineOffClick,
    onMachinePauseClick,
    machineOn,
    machinePaused
}: {
    onMachineOnClick: MouseEventHandler<HTMLButtonElement>;
    onMachineOffClick: MouseEventHandler<HTMLButtonElement>;
    onMachinePauseClick: MouseEventHandler<HTMLButtonElement>; 
    machineOn: boolean;
    machinePaused: boolean;
}) => {

    return (
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
    )
}
export default ControlButtons;