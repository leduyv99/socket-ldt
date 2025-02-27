import { Room, Client } from "@colyseus/core";
import { MainRoomState, Player } from "./schema/MainRoomState";

export class MainRoom extends Room<MainRoomState> {
  state = new MainRoomState();

  onCreate () {
  }

  onJoin (client: Client) {
    console.log(client.sessionId, "joined!");
    const randomPos = Math.floor(Math.random() * 10)
    this.state.players.set(client.sessionId, { x: randomPos, y : randomPos })
  }

  onLeave (client: Client, consented: boolean) {
    this.state.players.delete(client.sessionId)
    console.log(client.sessionId, "left!", consented);
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }
}
