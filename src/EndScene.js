export default class EndScene extends Phaser.Scene {
    constructor() {
        super('end-scene')
<<<<<<< HEAD
    }
    
    create(){
        this.map = this.make.tilemap({ key: 'map'})
		const tileset = this.map.addTilesetImage('ground','terrain')
		const bgtile = this.map.addTilesetImage('bg','bg')
		const layer = this.map.createLayer('end', [tileset,bgtile], 0, 0)
        this.add.text((this.scale.width / 2) - 120, (this.scale.height / 2) -30, 'You win!', { fontSize: '48px', fill: '#fff' })

        // this.input.on('pointerdown', () => {
        //     this.scene.start('main-scene')
        // })
    }
=======
    }   
>>>>>>> 104dc2b454762619c66133b5a5383d7e46a087b0
}