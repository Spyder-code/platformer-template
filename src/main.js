import Phaser, { Scale } from 'phaser'
import MainScene from './MainScene'
import LevelTwoScene from './LevelTwoScene'
import LevelThreeScene from './LevelThreeScene'
import EndScene from './EndScene'

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
	scene: [MainScene, LevelTwoScene, LevelThreeScene, EndScene],
}

export default new Phaser.Game(config)
