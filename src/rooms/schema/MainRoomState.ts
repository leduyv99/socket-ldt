import { Schema } from "@colyseus/schema";

export interface Player {
  x: number
  y: number
}

export class MainRoomState extends Schema {
  players: Map<string, Player>
}
