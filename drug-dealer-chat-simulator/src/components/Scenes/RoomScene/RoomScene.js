import { useContext } from "react";
import { CurrentSceneContext } from "../../../global-state/CurrentSceneContext";
import useConstWindowDimensions from "../../../lib/utils"

import './RoomScene.css'
import { TooltipContext } from "../../../global-state/TooltipContext";
import SceneRegion from "../SceneRegion/SceneRegion";

const IMAGE_ASPECT_RATIO = 16 / 9;
export const IMAGE_WIDTH = 1456
export const IMAGE_HEIGHT = 816


export default function RoomScene() {

    // Baseline Stuff
    const { currentSceneName, setCurrentSceneName } = useContext(CurrentSceneContext)
    const { tooltipText, setTooltipText } = useContext(TooltipContext)

    function onLaptop() {
        setCurrentSceneName('Computer')
        setTooltipText(null)
    }

    // Image Rendering
    const windowDimensions = useConstWindowDimensions()
    const windowAspectRatio = windowDimensions.width / windowDimensions.height

    const isWindowWider = windowAspectRatio > IMAGE_ASPECT_RATIO

    let imageWidth
    let imageHeight
    if (isWindowWider) {
        const percentWindowIsWider = windowDimensions.width / IMAGE_WIDTH
        imageHeight = IMAGE_HEIGHT * percentWindowIsWider
        imageWidth = windowDimensions.width
    } else {
        const percentWindowIsTaller = windowDimensions.height / IMAGE_HEIGHT
        imageHeight = windowDimensions.height
        imageWidth = IMAGE_WIDTH * percentWindowIsTaller
    }

    const imageData = {
        x: (windowDimensions.width - imageWidth) / 2,
        y: (windowDimensions.height - imageHeight) / 2,
        width: imageWidth,
        height: imageHeight
    }


    return <>
        <img className="room-background" src="/Scenes/Bedroom2.png" width={imageData.width} height={imageData.height} style={{
            left: `${imageData.x}px`,
            top: `${imageData.y}px`
        }}/>

        <SceneRegion
            tooltip={"Return to laptop."}
            onClick={onLaptop}
            regionData={{
                x: 0.2,
                y: 0.67,
                width: 0.17,
                height: 0.29
            }}
            imageData={imageData}
        />
        <SceneRegion
            tooltip={"Go out."}
            regionData={{
                x: 0.3,
                y: 0,
                width: 0.18,
                height: 0.6
            }}
            imageData={imageData}
        />
        <SceneRegion
            tooltip={"End the day."}
            regionData={{
                x: 0.58,
                y: 0.50,
                width: 0.3,
                height: 0.3
            }}
            imageData={imageData}
        />
    </>
}


// 