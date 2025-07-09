"use client";
import * as React from "react";

export const DelayConfigurator = () => {
  const [time] = React.useState(() => {
    if (typeof window === "undefined") return 250;
    const timePreference = localStorage.getItem("rsc-wait");
    const time = timePreference ? parseInt(timePreference, 10) : 250;
    return time;
  });

  return (
    <div className="w-full mx-auto mt-auto mb-6 max-w-md">
      <label className="fieldset w-full">
        <span className="fieldset-legend">RSC Delay in MS</span>
        <input
          type="range"
          min={250}
          max="2000"
          defaultValue={time}
          className="range range-xs w-full"
          step="250"
          onInput={(e) => {
            const value = e.currentTarget.value;
            localStorage.setItem("rsc-wait", value);
            window.location.reload();
          }}
        />
        <div className="flex justify-between px-2.5 mt-2 text-xs">
          <span>|</span>
          <span>|</span>
          <span>|</span>
          <span>|</span>
          <span>|</span>
          <span>|</span>
          <span>|</span>
          <span>|</span>
        </div>
        <div className="flex justify-between px-2.5 mt-2 text-xs">
          <span>250</span>
          <span>500</span>
          <span>750</span>
          <span>1000</span>
          <span>1250</span>
          <span>1500</span>
          <span>1750</span>
          <span>2000</span>
        </div>
      </label>
    </div>
  );
};
