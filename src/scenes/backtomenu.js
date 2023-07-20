import Phaser from  '../lib/phaser.js'

export default class backtomenu extends Phaser.Scene
{
	constructor()
	{
		super('backtomenu')
	}

	create()

    {
        this.add.image(700, 450, 'background')

        // add all scene keys here that you want to pause when the pause button is pressed
        const scenes=['title', 'ui','level1', 'level2', 'level3', 'bonus']

        // This finds all active scenes and pauses them 
        for(let i=0; i<scenes.length; i++){

            if(this.game.scene.isActive(scenes[i]))
            {
                this.currentScene = scenes[i]
                this.game.scene.pause(scenes[i])
            }
                       
        }

        this.backtomenurtext = this.add.text(700, 350, 'RETURN TO MAP SCREEN?', {
            fontSize: 32
        })
        this.closeButton = this.add.image(500, 450, 'close')
        this.closeButton.setInteractive().on('pointerdown', pointer =>
        {
            this.game.scene.resume(this.currentScene)
            this.scene.stop()
        })
        this.playButton = this.add.image(900, 450, 'play').setScale(0.4)
        this.playButton.setInteractive().on('pointerdown', pointer =>
        {
            this.scene.stop()
            this.game.scene.stop(this.currentScene)
            this.scene.run('title')
        });

    }


}