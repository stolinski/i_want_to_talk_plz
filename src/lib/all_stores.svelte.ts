import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { PUBLIC_WS_URL } from "$env/static/public";

export function get_a_room(room: string) {
  const ydoc = new Y.Doc();

  // Connect to the WebSocket server
  new WebsocketProvider(
    PUBLIC_WS_URL, // WebSocket server URL
    room, // Room name or document ID
    ydoc
  );

  const yCounter = ydoc.getMap<number>("level");

  // On create get the value from yCounter or create one
  let level: number = $state((yCounter.get("level") as number) || 0);

  yCounter.observeDeep(() => {
    level = (yCounter.get("level") as number) || 0;
  });

  return {
    get level() {
      return level;
    },
    set: (y: string) => {
      yCounter.set("level", parseFloat(y));
    },
  };
}
