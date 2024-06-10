import React, {useEffect, useRef, useState} from "react";
import {
  TextField,
  Stack, Image,
} from "office-ui-fabric-react";
import {_0, _3, _F, _00, _33, _30, _FF, _F3, _F0} from './constant'
import {DefaultButton} from "@fluentui/react";

const Str2Shape = {
  "00": _00,
  "03": _30,
  "0F": _F0,
  "30": _30,
  "33": _33,
  "3F": _F3,
  "F0": _F0,
  "F3": _F3,
  "FF": _FF,
  "0": _0,
  "3": _3,
  "F": _F,
}

const BaseShape = (props) => {
  const {shapes, targetShape, currentShape, cutShape, setCutShape, hasCut,isSuccess} = props;
  const shapes2str = shapes.join("")
  const shape = Str2Shape[shapes2str]
  const showCut = shapes.indexOf(currentShape) > -1 && cutShape == null
    && shapes.length > 1
    && (hasCut===undefined||hasCut.cutShape !== currentShape)
  const glow = shapes.indexOf(targetShape) > -1 && cutShape != null
  return (
    <Stack>
      <div style={{position: 'relative', width: '101px', height: '130px', border: glow ? "1px solid red" : ""}}>
        <Image src={"./icons/shapes/guardian.png"} width={101} height={130}/>
        <div style={{position: 'absolute', top: 0, right: 0}}>{shape}</div>
        {
          glow &&
          <div style={{position: 'absolute', bottom: 0, color: "red", right: 40}}>发光</div>
        }
      </div>
      {
        showCut &&!isSuccess&&
        <DefaultButton onClick={() => {
          setCutShape()
        }}>剖开</DefaultButton>
      }
    </Stack>
  );
}

export default BaseShape;
