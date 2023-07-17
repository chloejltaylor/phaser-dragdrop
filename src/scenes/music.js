import Phaser from  '../lib/phaser.js'

export default class music extends Phaser.Scene
{
	constructor()
	{
		super('music')
	}

    preload()

    {
        this.load.audio('music', './src/assets/Sounds/music.mp3')
    }

	create()

    {

        this.music = this.sound.add('music', {volume: 0.01});
        // this.music.play()
    }


}