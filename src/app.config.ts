import config from "@colyseus/tools";
import { MainRoom } from "./rooms/MainRoom";
import { ROOMS } from "./rooms/constant";
import cors from 'cors'

export default config({
	initializeGameServer: (gameServer) => {
		gameServer.define(ROOMS.main, MainRoom);
	},
	initializeExpress: (app) => {
		app.use(cors())
		app.get("/", (req, res) => res.send("Server running."))
	},
	beforeListen: () => {

	},
	options: {
		devMode: true
	}
});