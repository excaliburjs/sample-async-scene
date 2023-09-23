import { Engine, Scene } from "excalibur";

export interface AsyncScene {
    isAsyncInitialized: boolean;
    onAsyncInitialize(engine: Engine): Promise<void>;
}

export function isAsyncScene(scene: Scene | AsyncScene): scene is AsyncScene {
    return (scene as any).isAsyncInitialized !== undefined && (scene as any).onAsyncInitialize;
}

export class SceneRouter {
    scenes = new Map<string, AsyncScene | Scene>();
    constructor(public engine: Engine) {}

    addScene(name: string, scene: AsyncScene | Scene) {
        this.scenes.set(name, scene);
        this.engine.addScene(name, scene as Scene);
    }

    async goToSceneAsync(sceneName: string) {
        const scene = this.scenes.get(sceneName);

        if (scene && isAsyncScene(scene)) {
            if (!scene.isAsyncInitialized) {
                await scene.onAsyncInitialize(this.engine);
            }
            this.engine.goToScene(sceneName);
        }
    }
}