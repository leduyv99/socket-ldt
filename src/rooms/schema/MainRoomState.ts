import { MapSchema, Schema, type } from "@colyseus/schema";

export class Player extends Schema {
  @type("number") x: number;
  @type("number") y: number;
  @type("number") i: number;
  @type("string") animation: string;
}

export class MainRoomState extends Schema {
  @type({ map: Player }) players = new MapSchema<Player>();
}
