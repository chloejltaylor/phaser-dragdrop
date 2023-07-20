import Phaser from  '../lib/phaser.js'
import eventsCenter from './eventscentre.js'
// import Title from './titlescreen.js'

export default class UIScene extends Phaser.Scene
{
	constructor()
	{
		super('ui-scene')
	}

    preload()
    {
        this.load.image('pause', './src/assets/Buttons/pause.png')
        this.load.image('back', './src/assets/Buttons/back.png')
    }

	create()

    {
        this.backbutton = this.add.image(50, 50, 'back')
        this.backbutton.setInteractive().on('pointerdown', pointer =>
        {
            this.scene.run('backtomenu')
        });

        this.pausebutton = this.add.image(1350, 50, 'pause')
        this.pausebutton.setInteractive().on('pointerdown', pointer =>
        {
            this.scene.run('pause')
        });

        // listen to 'update-count' event and call `updateCount()`
        // when it fires
        // eventsCenter.on('pause', this.updateCount, this)



        // clean up when Scene is shutdown
        // this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
        //     eventsCenter.off('update-count', this.updateCount, this)
        // })

    }

    // updateCount(count)
    // {
    //     this.label.text = `Count: ${count}`
    // }


}