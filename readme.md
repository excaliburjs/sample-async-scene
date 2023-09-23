## Example Async Resource Loading Per Scene

Sometimes you want to only load resources when going to a specific scene, this shows how by wrapping the scene transition api.

Press the "enter" key (non-numpad) to trigger loading a new async scene

Some things to consider:
* You may not want to flash the loader like this example does, remove `loader.canvas.draw` code
* You may not want to show a button to the user, set `loader.suppressPlayButton = true;`

### Running Locally

* Install node.js
* Navigate to the root of this project on the command lines
* Run `npm install` on the command line
* Run `npm start` to start a parcel server on http://localhost:1234 