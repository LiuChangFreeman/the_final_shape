import React, { useState, useEffect } from 'react';
import {ProgressIndicator,Stack} from "@fluentui/react";
import {Text} from "office-ui-fabric-react";

const CountdownTimer = ({ initialTime}) => {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(prevTime => prevTime - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (remainingTime) => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const percent=(initialTime - time)/initialTime

  return (
    <Stack style={{width:"50%",maxWidth:250}}>
      {
        percent>=1&&
        <Text style={{color: 'red'}}>游戏结束</Text>
      }
      {
        percent<1&&
        <ProgressIndicator
          description={`${formatTime(time)} 即将终结`}
          percentComplete={percent}
        />
      }
    </Stack>
  );
};

export default CountdownTimer;
