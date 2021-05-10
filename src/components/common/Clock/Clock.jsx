import React, { useEffect, useState } from "react";
import "./styles.scss";
const Clock = () => {
  const [time, setTime] = useState(
    new Date().toLocaleTimeString(navigator.language, {
      hour12: true,
    })
  );
  useEffect(() => {
    setInterval(() => {
      setTime(
        new Date().toLocaleTimeString(navigator.language, {
          hour12: true,
        })
      );
    }, 1000);
  }, []);
  const timeArr = time.split(":");
  return (
    <div className="clock">
      <div className="time">
        <h6 className="hr-min">
          {`${timeArr[0]} : ${timeArr[1]} `}
          <span className="sec">{timeArr[2]}</span>
        </h6>
      </div>
    </div>
  );
};

export default Clock;
