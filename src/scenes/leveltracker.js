import Phaser from  '../lib/phaser.js'
import eventsCenter from './eventscentre.js'

export default class levelTracker extends Phaser.Scene
{
	constructor()
	{
		super('level-tracker')
	}

    init (data)
    {
        // this.levels = data.levelorder
        // console.log(data.levels)

    }


	create()

    {
        this.label = this.add.text(10, 10, 'Hit space for levels', {
            fontSize: 32

        })

        // listen to 'startLevel' event and call `selectLevel` when it fires
        eventsCenter.once('startLevel1', this.selectLevel1, this)
        eventsCenter.once('startLevel2', this.selectLevel2, this)
        eventsCenter.once('startLevel3', this.selectLevel3, this)
        eventsCenter.once('startBonus', this.selectBonus, this)
        this.events.on('shutdown', this.shutdown, this);

        // clean up when Scene is shutdown
        this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
            eventsCenter.off('startLevel1', this.selectLevel1, this)
        })
        this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
            eventsCenter.off('startLevel2', this.selectLevel2, this)
        })
        this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
            eventsCenter.off('display-next-level', this.displayNextLevel, this)
        })

    }

    shutdown ()
    {
        //  We need to clear keyboard events, or they'll stack up when the Menu is re-run
        eventsCenter.shutdown();
    }

    selectLevel1()
    {
                this.scene.start('level1',  {
                char: this.characters[this.levels[0]], 
                vehicle: this.vehicles[this.levels[0]],
                vehicleWin: this.vehiclesWin[this.levels[0]],
                correctItem: this.correctItems[this.levels[0]]
            })

    }

    selectLevel2()
    {
        this.scene.start('level2',  {
            char: this.characters[this.levels[1]], 
            vehicle: this.vehicles[this.levels[1]],
            vehicleWin: this.vehiclesWin[this.levels[1]],
            correctItem: this.correctItems[this.levels[1]]
        })
    }

    selectLevel3()
    {
        this.scene.start('level3',  {
            char: this.characters[this.levels[2]], 
            vehicle: this.vehicles[this.levels[2]],
            vehicleWin: this.vehiclesWin[this.levels[2]],
            correctItem: this.correctItems[this.levels[2]]
        })
    }

        selectBonus()
    {
            console.log("BONUS")
            console.log(this.bonusLevels[this.levels[2]])
            
            this.scene.start(this.bonusLevels[this.levels[2]])

    }

    
    displayNextLevel(level) {

        console.log(this.levels)
        this.label.text = `Levels will be: `+ this.level1games[this.levels[0]]+` `+ this.level2games[this.levels[1]]+` `+ this.level3games[this.levels[2]]
    
    }

}