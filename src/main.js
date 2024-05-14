import Phaser, { Scale } from 'phaser'
import MainScene from './MainScene'

const config = {
	type: Phaser.AUTO,
	parent: 'app',
	width: 800,
	height: 400,
	debug: true,
	physics: {
		default: 'matter',
		matter: {
			// debug: true,
		},
	},
	Scale: {
		mode: Scale.ScaleModes.FIT,
		autoCenter: Scale.Center.CENTER_BOTH,
	},
	scene: [MainScene],
}

export default new Phaser.Game(config)
