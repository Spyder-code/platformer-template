import Phaser from 'phaser'

export default class LevelThreeScene extends Phaser.Scene {
	
	constructor() {
		super('level-three')
	}

	init(){
		this.cursor = this.input.keyboard.createCursorKeys()
		this.isTouchingGround = false
		this.level = 3;
	}

	preload() {
		this.load.image('spike','spike.png')
		this.load.image('end','end.png')
		this.load.image('terrain','terrain.png')
		this.load.image('bg','bg.png')
		this.load.tilemapTiledJSON('map', 'maps.json')
		this.load.spritesheet('player-idle','player/Idle.png',{frameWidth: 32, frameHeight: 32})
		this.load.spritesheet('player-run','player/Run.png',{frameWidth: 32, frameHeight: 32})
		this.load.spritesheet('player-jump','player/Jump.png',{frameWidth: 32, frameHeight: 32})
	}

	create() {

		this.map = this.make.tilemap({ key: 'map'})
		const tileset = this.map.addTilesetImage('ground','terrain')
		const bgtile = this.map.addTilesetImage('bg','bg')
		const layer = this.map.createLayer('maps'+this.level, [tileset,bgtile], 0, 0)


		layer.setCollisionByProperty({ collides: true })

		this.matter.world.convertTilemapLayer(layer)

		const { width, height } = this.scale
		this.createPlayerAnimation()
		this.createObjectLayers()
		this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

		const mapWidth = this.map.widthInPixels;
		const mapHeight = this.map.heightInPixels;
		this.cameras.main.setBounds(0, 0, mapWidth, mapHeight);
		this.cameras.main.setZoom(1.5)

		// Set world bounds to the size of the tilemap
		// this.matter.world.setBounds(0, 0, mapWidth, mapHeight);
		
		this.cameras.main.startFollow(this.player, true, 0.5, 0.5, 0, 0)

	}

	update(){
		const speed = 2
		const jump = 7
		if(!this.player){
			return
		}
		if(this.cursor.left.isDown){
			this.player.setVelocityX(-speed)
			this.player.setFlipX(true)
			this.player.play('player-run',true)
		}else if(this.cursor.right.isDown){
			this.player.setVelocityX(speed)
			this.player.setFlipX(false)
			this.player.play('player-run',true)
		}else if(this.cursor.up.isDown && this.isTouchingGround){
			this.player.setVelocityY(-jump)
			this.player.play('player-jump',true)
			this.isTouchingGround = false
		}else{
			this.player.setVelocityX(0)
			this.player.play('player-idle',true)
		}

		if (Phaser.Input.Keyboard.JustDown(this.spacebar) && this.isTouchingGround) {
			this.player.setVelocityY(-jump)
			this.player.play('player-jump',true)
			this.isTouchingGround = false
		}

	}

	createPlayerAnimation(){
		this.anims.create({
			key: 'player-idle',
			frames: this.anims.generateFrameNumbers('player-idle', { start: 0, end: 10 }),
			repeat: -1
		})
		this.anims.create({
			key: 'player-run',
			frames: this.anims.generateFrameNumbers('player-run', { start: 0, end: 11 }),
			repeat: -1
		})
		this.anims.create({
			key: 'player-jump',
			frames: this.anims.generateFrameNumbers('player-jump', { start: 0, end: 1 }),
			repeat: -1
		})
	}

	createObjectLayers(){
		const object = this.map.getObjectLayer('objects'+this.level)
		object.objects.forEach((obj) => {
			const { x, y, width, height, name } = obj

			switch(name){
				case 'spawn':{
					this.player = this.matter.add.sprite(x, y,'player-idle',0).play('player-idle').setFixedRotation()
					this.player.setOnCollide((data) => {
						this.isTouchingGround = true

						const sprite = data.bodyB.gameObject
						const type = sprite.getData('type')

						switch (type) {
							case 'trap':
								this.player.setPosition(x,y)
								break;
							case 'finish':
								this.finish()
								break;
						
							default:
								break;
						}
					})
					break
				}

				case 'spike':{
					const spike = this.matter.add.sprite(x, y,'spike', undefined, {
						isStatic: true,
						isSensor: true
					})
					spike.setData('type', 'trap')
					// console.log(spike);
					break
				}
				
				case 'finish':{
					const end = this.matter.add.sprite(x, y,'end', undefined, {
						isStatic: true,
						isSensor: true
					}).setScale(0.5)
					end.setData('type', 'finish')
					break
				}
			}
		})
	}

	finish() {
		this.scene.start('end-scene')
	}
}
