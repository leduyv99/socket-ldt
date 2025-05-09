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

  onCreate() {
  }

  onJoin(client: Client) {
    console.log(client.sessionId, "joined!");
    const player = new Player()
    player.x = Math.floor(Math.random() * 100 + 20)
    player.y = Math.floor(Math.random() * 100 + 20)
    this.state.players.set(client.sessionId, player)

    this.onMessage(ACTIONS.move, (client, payload: PositionPayload) => {
      const _player = this.state.players.get(client.sessionId)
      _player.x = payload.x
      _player.y = payload.y
      _player.animation = payload.animation
      this.state.players.set(client.sessionId, _player)

      this.broadcast(ACTIONS.move, {
        sessionId: client.sessionId,
        ...payload
      }, { except: client })
    })

    this.onMessage(ACTIONS.updateAsset, (client, indexAsset) => {
      const _player = this.state.players.get(client.sessionId)
      _player.i = indexAsset
      this.broadcast(ACTIONS.updateAsset, {
        sessionId: client.sessionId,
        indexAsset
      }, { })
    })
  }

  onLeave(client: Client, consented: boolean) {
    console.log(client.sessionId, "left!", consented);
    this.state.players.delete(client.sessionId)
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }
}
