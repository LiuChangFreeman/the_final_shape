import {Image, Stack, Text} from "office-ui-fabric-react";
import {ChoiceGroup, DefaultButton, PrimaryButton} from "@fluentui/react";
import React, {useEffect, useRef, useState} from "react";
import CountdownTimer from "../components/timmer";
import BaseShape from "../components/base";

const options = [
  {
    key: '0',
    imageSrc: "./icons/shapes/0_.svg",
    imageAlt: '圆',
    imageSize: {width: 32, height: 32},
    selectedImageSrc: "./icons/shapes/0.svg",
    text: '圆',
  },
  {
    key: '3',
    imageSrc: "./icons/shapes/3_.svg",
    imageAlt: '三角',
    imageSize: {width: 32, height: 32},
    selectedImageSrc: "./icons/shapes/3.svg",
    text: '三角',
  },
  {
    key: 'F',
    imageSrc: "./icons/shapes/F_.svg",
    imageAlt: '正方形',
    imageSize: {width: 32, height: 32},
    selectedImageSrc: "./icons/shapes/F.svg",
    text: '正方形',
  },
];

const totalBasicShape = ["0", "3", "F"]


const Game = (props) => {
  const [timmerKey, setTimmerKey] = useState(new Date().getTime())
  const [currentShape, setCurrentShape] = useState("0")
  const [shapesArray, setShapesArray] = useState([
    {
      shapes: ["0", "3"], index: 0
    },
    {
      shapes: ["3", "F"], index: 1
    },
    {
      shapes: ["F", "0"], index: 2
    }
  ])
  const [targetArray, setTargetArray] = useState([
    {
      shapes: ["0"]
    },
    {
      shapes: ["3"]
    },
    {
      shapes: ["F"]
    }
  ])

  function isSuccessOnce(shapes, targetShape) {
    let tempShapes = shapes.filter(shapeItem => shapeItem !== targetShape)
    tempShapes = tempShapes.filter((item, index) => tempShapes.indexOf(item) === index)
    return tempShapes.length > 1
  }


  const isSuccess = shapesArray
    .every((item, index) => isSuccessOnce(item.shapes, targetArray[index].shapes[0]));

  function setShapesArrayNow(shapesArray) {
    const newShapesArray = [...shapesArray];
    setShapesArray(newShapesArray)
  }

  function randGame() {


    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

    const totalBasicShapeNew = shuffleArray(totalBasicShape)
    const newTargetArray = shuffleArray(targetArray)
    setTargetArray(newTargetArray)

    let newShapesArray = []
    for (let i = 0; i < 3; i += 1) {
      const shapeCurrent = targetArray[i].shapes[0]
      let shapes = [shapeCurrent]
      shapes.push(totalBasicShapeNew[i])
      newShapesArray.push({
        shapes: shapes,
        index: i
      })
    }
    setShapesArray(newShapesArray)
    setTimmerKey(new Date().getTime())
  }

  useEffect(() => {
    randGame()
  }, [])

  return (
    <Stack style={{paddingTop: 50}} horizontalAlign="center">
      <Stack
        style={{width: "100%"}}
        horizontal
        horizontalAlign="center"
        tokens={{
          childrenGap: 15
        }}
      >
        {
          isSuccess &&
          <Text style={{color: 'red'}}>改变符号成功</Text>
        }
        {
          !isSuccess &&
          <CountdownTimer key={timmerKey} initialTime={210}/>
        }
        <PrimaryButton onClick={() => {
          randGame()
        }}>重置游戏</PrimaryButton>
      </Stack>


      <ChoiceGroup
        label="当前图形"
        defaultSelectedKey="0"
        options={options}
        onChange={(e, option) => {
          setCurrentShape(option.key)
        }}/>

      <Text variant="mediumPlus">外场</Text>
      <Stack
        horizontal
        horizontalAlign="center"
        verticalAlign="start"
        style={{margin: 3}}
        tokens={{
          childrenGap: 5
        }}
        wrap
      >
        {
          shapesArray.map((item, index) => {
              return <BaseShape
                shapes={item.shapes}
                targetShape={targetArray[index].shapes[0]}
                isSuccess={isSuccess}
                currentShape={currentShape}
                cutShape={item.cutShape}
                hasCut={shapesArray.find(item => item.cutShape !== undefined && item.cutShape !== null)}
                setCutShape={() => {
                  let hasCut = shapesArray.find(item => item.cutShape !== undefined && item.cutShape !== null)
                  if (hasCut !== undefined) {
                    item.cutShape = currentShape
                    shapesArray[index] = item
                    let needSwapShapes = shapesArray.filter(shape => shape.cutShape !== undefined && shape.cutShape !== null)
                    let shapeA = needSwapShapes[0]
                    let shapeB = needSwapShapes[1]
                    let filteredA = shapeA.shapes.filter(shape => shape !== shapeA.cutShape)
                    if (filteredA.length === 0) {
                      filteredA.push(shapeA.shapes[0])
                    }
                    let filteredB = shapeB.shapes.filter(shape => shape !== shapeB.cutShape)
                    if (filteredB.length === 0) {
                      filteredB.push(shapeB.shapes[0])
                    }
                    filteredA.push(shapeB.cutShape)
                    filteredB.push(shapeA.cutShape)
                    shapeA.shapes = filteredA
                    shapeB.shapes = filteredB
                    shapeA.cutShape = undefined
                    shapeB.cutShape = undefined
                    shapesArray[shapeA.index] = shapeA
                    shapesArray[shapeB.index] = shapeB
                  } else {
                    item.cutShape = currentShape
                    shapesArray[index] = item
                  }
                  setShapesArrayNow(shapesArray)
                }}
              />
            }
          )
        }
      </Stack>
      <Text variant="mediumPlus">内场</Text>
      <Stack
        horizontal
        horizontalAlign="center"
        verticalAlign="center"
        style={{margin: 3}}
        tokens={{
          childrenGap: 5
        }}
        wrap
      >
        {
          targetArray.map((item, index) => {
              return <BaseShape shapes={item.shapes}/>
            }
          )
        }
      </Stack>

    </Stack>
  );
}


export default Game;
