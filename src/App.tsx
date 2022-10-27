import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

// TODO: improve
console.log(process.env)
if(!process.env.REACT_APP_BUSCUIT_WS_URL || !process.env.REACT_APP_BUSCUIT_REST_API_URL) {
  throw new Error('Please configure env variables BUSCUIT_WS_URL && BUSCUIT_REST_API_URL')
}
const socket = io(process.env.REACT_APP_BUSCUIT_WS_URL);
function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [ovenTemperature, setOvenTemperature] = useState(null);
  const [ovenHeated, setOvenHeated] = useState(false);
  const [motorOn, setMotorOn] =  useState(false);
  const [machineOn, setMachineOn] = useState(false);
  const [machinePaused, setMachinePaused] = useState(false);
  const [cookedCookiesAmount, setCookedCookiesAmount] = useState(0);
  const [firstCookiePosition, setFirstCookiePosition] = useState(-1);
  const [lastCookiePosition, setLastCookiePosition] = useState(-1);

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('OVEN_TEMPERATURE_CNAHGE', (value) => {
      setOvenTemperature(value);
    });

    socket.on('OVEN_HEATED', (value) => {
      setOvenHeated(value);
    });

    socket.on('MOTOR_ON', (value) => {
      setMotorOn(value);
    });

    socket.on('MACHINE_ON', (value) => {
      console.log('Machin is on')
      setMachineOn(value);
    });

    socket.on('MACHINE_PAUSED', (value) => {
      setMachinePaused(value);
    });

    socket.on('COOKIE_COOKED', (value) => {
      setCookedCookiesAmount(value);
    });

    socket.on('COOKIES_MOVED', (value) => {
      setFirstCookiePosition(value.firstCookiePosition);
      setLastCookiePosition(value.lastCookiePosition);

    });

//TODO: unsubscribe, why?
    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('pong');
    };
  }, []);

  return (
    <div>
      <p>Connected: { '' + isConnected }</p>
      <p>Oven temperature: { ovenTemperature || '-' }</p>
      <p>Motor ON: { motorOn ? 'TRUE' : 'FALSE' }</p>
      <p>Machine ON: { machineOn ? 'TRUE' : 'FALSE' }</p>
      <p>Machine PAUSED: { machinePaused ? 'TRUE' : 'FALSE' }</p>

      <button onClick={ () => socket.emit('TURN_ON_MACHINE') }>ON</button>
      <button onClick={ () => socket.emit('TURN_OFF_MACHINE') }>OFF</button>
      <button onClick={ () => socket.emit('PAUSE_MACHINE') }>PAUSE</button>

      <p>Total Cooked Cookies: { cookedCookiesAmount }</p>

      <p>First Cookie Position: { firstCookiePosition }</p>
      <p>Last Cookie Position: { lastCookiePosition }</p>

    </div>
  );
}

export default App;