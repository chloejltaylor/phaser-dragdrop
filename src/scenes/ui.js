import Phaser from  '../lib/phaser.js'
import eventsCenter from './eventscentre.js'
// import Title from './titlescreen.js'

export default class UIScene extends Phaser.Scene
{
	constructor()
	{
		super('ui-scene')
	}

	create()

    {
        this.label = this.add.text(10, 10, 'Count: 0', {
            fontSize: 32

        })

        // listen to 'update-count' event and call `updateCount()`
        // when it fires
        eventsCenter.on('update-count', this.updateCount, this)



        // clean up when Scene is shutdown
        this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
            eventsCenter.off('update-count', this.updateCount, this)
        })

    }

    updateCount(count)
    {
        this.label.text = `Count: ${count}`
    }


}