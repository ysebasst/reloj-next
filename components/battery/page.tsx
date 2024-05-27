"use client";

import { CSSProperties, useEffect, useState } from 'react';
import styles from './battery.module.css';

declare global {
  interface Navigator {
    getBattery(): Promise<any>;
  }
}

function Battery() {

  const [batteryLevel, setBatteryLevel] = useState<number>(0);

  const COLORS = {
    red: '#FF0000',
    orange: '#FFA500',
    green: '#00FF00',
    default: '#FFFFFF',
  };

  useEffect(() => {
    getBatteryLevel();
    const interval = setInterval(() => {
      getBatteryLevel();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getBatteryLevel = async (): Promise<void> => {
    if (!window?.navigator?.getBattery) {
      console.log("El administrador de batería no es compatible");
      return;
    }

    const batteryManager = await window.navigator.getBattery();
    const batteryLevel = batteryManager.level;

    const batteryLevelFormatted = Math.floor(batteryLevel * 100);

    setBatteryLevel(batteryLevelFormatted);
  }

  const getBatteryLevelWidth = (): string => {

    if (batteryLevel === 0) { return '100%'; }

    return `${ batteryLevel }%`;
  }

  const getColorStatusValue = (): string => {

    if (batteryLevel === 0) { return COLORS.default; }

    if (batteryLevel <= 10) { return COLORS.red; }

    if (batteryLevel <= 20) { return COLORS.orange; }

    if (batteryLevel >= 90) { return COLORS.green; }

    return COLORS.default;
  }

  const batteryStatusValueStyles: CSSProperties = {
    backgroundColor: getColorStatusValue(),
    width: getBatteryLevelWidth(),
  }

  const batteryStyles: CSSProperties = {
    borderColor: getColorStatusValue(),
  }

  return (
    <section className={styles['battery-container']}>
      <div
        className={styles['battery']}
        style={batteryStyles}
      >
        <div className={styles['battery__status-bar']}>
          <span
            className={styles['battery__status-value']}
            style={batteryStatusValueStyles}
          >{getBatteryLevelWidth()}</span>
        </div>
      </div>
    </section>
  );
}

export default Battery;
