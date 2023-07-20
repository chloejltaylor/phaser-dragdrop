import Phaser from  '../lib/phaser.js'

export default class pause extends Phaser.Scene
{
	constructor()
	{
		super('pause')
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

        this.pausetext = this.add.text(700, 350, 'PAUSE SCREEN', {
            fontSize: 32
        })
        this.closeButton = this.add.image(700, 450, 'close')
        this.closeButton.setInteractive().on('pointerdown', pointer =>
        {
            this.game.scene.resume(this.currentScene)
            this.scene.stop()
        });

    }


}