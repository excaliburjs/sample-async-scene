import { Actor, Color, Scene, vec } from "excalibur";


export class SyncScene extends Scene {
    onInitialize() {
        this.add(new Actor({
            width: 100,
            height: 100,
            color: Color.Red
        }));
        this.camera.pos = vec(0, 0);
    }
}