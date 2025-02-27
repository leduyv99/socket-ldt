import { Room, Client } from "@colyseus/core";
import { MainRoomState, Player } from "./schema/MainRoomState";

export class MainRoom extends Room<MainRoomState> {
  state = new MainRoomState();

  onCreate () {
  }

  onJoin (client: Client) {
    console.log(client.sessionId, "joined!");
    const player = new Player()
    player.x = Math.floor(Math.random() * 100)
    player.y = Math.floor(Math.random() * 100)
    this.state.players.set(client.sessionId, player)
  }

  onLeave (client: Client, consented: boolean) {
    console.log(client.sessionId, "left!", consented);
    this.state.players.delete(client.sessionId)
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }
}
