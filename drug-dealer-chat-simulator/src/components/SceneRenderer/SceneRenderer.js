import { useContext } from "react";
import { CurrentSceneContext, CurrentSceneContextProvider } from "../../global-state/CurrentSceneContext";
import ComputerScene from "../Scenes/ComputerScene/ComputerScene";
import RoomScene from "../Scenes/RoomScene/RoomScene";

const SCENES = {
    'Computer': ComputerScene,
    'Room': RoomScene
}

export default function SceneRenderer() {

    const { currentSceneName, setCurrentSceneName } = useContext(CurrentSceneContext)

    const SceneComponent = SCENES[currentSceneName]

    return <div className="scene-box">
        { currentSceneName in SCENES && <SceneComponent/> }
    </div>
}