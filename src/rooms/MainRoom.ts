import { Room, Client } from "@colyseus/core";
import { MainRoomState, Player } from "./schema/MainRoomState";
import { ACTIONS } from "./constant";

type PlayerDirection = 'front' | 'left' | 'right' | 'back'
type PlayerAnimation = 'idle' | 'move'
interface PositionPayload {
  x: number
  y: number
  animation: PlayerAnimation
  direction: PlayerDirection
}

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

    this.onMessage(ACTIONS.move, (client, payload: PositionPayload) => {
      const { x, y } = payload
      const _player = this.state.players.get(client.sessionId)
      _player.x = x
      _player.y = y
      this.broadcast(ACTIONS.move, {
        sessionId: client.sessionId,
        ...payload
      }, { except: client })
    })
  }

  onLeave (client: Client, consented: boolean) {
    console.log(client.sessionId, "left!", consented);
    this.state.players.delete(client.sessionId)
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }
}
