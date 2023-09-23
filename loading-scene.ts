import { Actor, Color, Engine, ExcaliburGraphicsContext, ImageSource, Loader, Scene, vec } from "excalibur";
import { AsyncScene } from "./scene-router";

// import to satisfy parcel
import swordUrl from './sword.png'

export class LoadingScene extends Scene implements AsyncScene {
    isAsyncInitialized: boolean = false;

    loader: Loader;
    resources = {
        playerImage: new ImageSource(swordUrl),
    }

    constructor() {
        super();

        this.loader = new Loader([
            this.resources.playerImage,
        ]);
        this.loader.loadingBarColor = Color.White;
        this.loader.backgroundColor = Color.Black.toHex();
        // this.loader.loadingBarPosition = vec(40, 270);
        this.loader.playButtonText = 'Let\'s Go!';
        this.loader.suppressPlayButton = true;

    }

    onPostDraw(ctx: ExcaliburGraphicsContext) {
        if (!this.loader.isLoaded()) {
            this.loader.canvas.draw(ctx, 0, 0);
        }
    }
    async onAsyncInitialize(engine: Engine) {
        console.log("async init load started");

        // Optionally hook into the post to draw the loader
        engine.onPostDraw = (ctx) => this.onPostDraw(ctx);

        // Tell the loader about the engine
        this.loader.wireEngine(engine);

        await this.loader.load();

        const actor = new Actor({
            width: 100,
            height: 100
        });
        actor.graphics.use(this.resources.playerImage.toSprite());
        this.add(actor);

        console.log("async init load complete");
    }

    onInitialize() {
        console.log("sync init started");
        this.camera.pos = vec(0, 0);
        console.log("sync init complete");
    }

    onActivate() {
        console.log("sync activate started");
        console.log("sync activate complete");
    }
}