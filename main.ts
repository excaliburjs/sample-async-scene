import { Engine, Keys } from "excalibur";
import { SceneRouter } from "./scene-router";
import { SyncScene } from "./sync-scene";
import { LoadingScene } from "./loading-scene";

const engine = new Engine({
    width: 800,
    height: 600
});

const sceneRouter = new SceneRouter(engine);

sceneRouter.addScene('root', new SyncScene());
sceneRouter.addScene('async-scene', new LoadingScene());

engine.start();

engine.input.keyboard.on('press', e => {
    if (e.key === Keys.Enter) {
        sceneRouter.goToSceneAsync('async-scene');
    }
})