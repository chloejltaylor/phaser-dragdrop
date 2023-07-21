import Phaser from '../lib/phaser.js'
import eventsCenter from './eventscentre.js'

export default class Title extends Phaser.Scene

{

constructor()
{
super('title')
}

vehicles = ['vehicle-pm', 'vehicle-ff', 'vehicle-po']
vehiclesWin = ['vehicle-pm-win', 'vehicle-ff-win', 'vehicle-po-win']
vehiclesInteractive = ['vehicle-pm-interactive', 'vehicle-ff-interactive', 'vehicle-po-interactive']
characters = ['pm', 'ff', 'po']
correctItems = ['item4', 'item3', 'item5']
sublevel = 0


preload()
{
    
    this.load.image('play', './src/assets/Buttons/play_big_idle.png')
    // this.load.image('background', './src/assets/Game/grid-bg.png')
    this.load.image('background', './src/assets/Environment/background.png')
    this.load.image('handHelper', './src/assets/onboarding/onboarding_hand.png')
    this.load.spine("hand","./src/assets/Anim/hand/onboarding_hand.json","./src/assets/Anim/hand/onboarding_hand.atlas")

    this.scene.run('level-tracker')
    this.scene.run('ui-scene')
    this.scene.run('music')
    this.load.image('idle_1', './src/assets/Game/idle_1.png')
    this.load.image('idle_2', './src/assets/Game/idle_2.png')
    this.load.image('idle_3', './src/assets/Game/idle_3.png')
    this.load.image('active_1', './src/assets/Game/active_1.png')
    this.load.image('active_2', './src/assets/Game/active_2.png')
    this.load.image('active_3', './src/assets/Game/active_3.png')
    this.load.image('correct_1', './src/assets/Game/correct_1.png')
    this.load.image('correct_2', './src/assets/Game/correct_2.png')
    this.load.image('correct_3', './src/assets/Game/correct_3.png')
    this.load.image('incorrect_1', './src/assets/Game/incorrect_1.png')
    this.load.image('incorrect_2', './src/assets/Game/incorrect_2.png')
    this.load.image('incorrect_3', './src/assets/Game/incorrect_3.png')
    this.load.image('target', './src/assets/temp/hitzone.png')
    this.load.image('vehicle-pm', './src/assets/temp/vehicle-1a.png')
    this.load.image('vehicle-pm-win', './src/assets/temp/vehicle-1b.png')
    this.load.image('vehicle-pm-interactive', './src/assets/temp/vehicle-1c.png')
    this.load.image('vehicle-ff', './src/assets/temp/vehicle-2a.png')
    this.load.image('vehicle-ff-win', './src/assets/temp/vehicle-2b.png')
    this.load.image('vehicle-ff-interactive', './src/assets/temp/vehicle-2c.png')
    this.load.image('vehicle', './src/assets/temp/vehicle-1a.png')
    this.load.image('vehicle-win', './src/assets/temp/vehicle-1b.png')
    this.load.image('vehicle-fire', './src/assets/temp/vehicle-2a.png')
    this.load.image('vehicle-fire-win', './src/assets/temp/vehicle-2b.png')
    this.load.image('vehicle-fire-interactive', './src/assets/temp/vehicle-2c.png')
    this.load.image('vehicle-po', './src/assets/temp/vehicle-3a.png')
    this.load.image('vehicle-po-win', './src/assets/temp/vehicle-3b.png')
    this.load.image('vehicle-po-interactive', './src/assets/temp/vehicle-3c.png')
    this.load.image('dock', './src/assets/temp/dnd_dock_1.png')
    this.load.image('dock2', './src/assets/temp/dnd_dock_2.png')
    this.load.image('dock3', './src/assets/temp/dnd_dock_3.png')
    this.load.image('item', './src/assets/temp/dnd_item.png')
    this.load.image('item2', './src/assets/temp/dnd_item-2.png')
    this.load.image('item3', './src/assets/temp/dnd_item-3.png')
    this.load.image('item4', './src/assets/temp/dnd_item-4.png')
    this.load.image('item5', './src/assets/temp/dnd_item-5.png')
    this.load.image('decoy1', './src/assets/temp/decoy1.png')
    this.load.image('decoy2', './src/assets/temp/decoy2.png')
    this.load.image('decoy3', './src/assets/temp/decoy3.png')
    this.load.image('decoy4', './src/assets/temp/decoy4.png')
    this.load.image('background', './src/assets/Game/grid-bg.png')
    this.load.image('platform', './src/assets/Environment/ground.png')
    this.load.audio('correct', './src/assets/Sounds/correct.mp3')
    this.load.audio('incorrect', './src/assets/Sounds/cartoonboing.mp3')
    
    this.load.spine("po","./src/assets/char/po/char_po.json","./src/assets/char/po/char_po.atlas")
    this.load.spine("ff","./src/assets/char/ff/char_ff.json","./src/assets/char/ff/char_ff.atlas")
    this.load.spine("pm","./src/assets/char/pm/char_pm.json","./src/assets/char/pm/char_pm.atlas")
    this.load.image('continue', './src/assets/Buttons/continue.png')
    this.load.image('close', './src/assets/Buttons/close.png')
    this.load.image('charHitZone', './src/assets/temp/bonus_paramedic-1b.png')
    
}

create()
{

    this.games = ['level1pm', 'level1ff', 'level1po']
    this.level1games = ['level1pm', 'level1ff', 'level1po']
    this.level2games = ['level2pm', 'level2ff', 'level2po']
    this.level3games = ['level3pm', 'level3ff', 'level3po']
    this.bonusLevels = ['bonus', 'bonus', 'bonus']
    this.levels = [0,1,2]
    function shuffle(array) {
        array.sort(() => Math.random() - 0.5);
      }
    shuffle(this.levels)
    console.log("level order: "+ this.levels)



    this.input.keyboard.on('keydown-SPACE', () => {
		eventsCenter.emit('display-next-level', this)
        gameObject.setInteractive().on('pointerdown', function() {
    if (scene.scale.isFullscreen) {
        scene.scale.stopFullscreen();
        // On stop fulll screen
    } else {
        scene.scale.startFullscreen();
        // On start fulll screen
    }
});
	})

	this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
		this.input.keyboard.off('keydown-SPACE')
	})

    

    const width = this.scale.width
    const height = this.scale.height

    this.add.image(700, 450, 'background');

    this.add.text(width * 0.5, height * 0.3, 'HELPING THE EMERGENCY SERVICES', {
    fontSize: 48}).setOrigin(0.5)

    this.start = this.add.image(width * 0.5, height * 0.7, 'play').setScale(1.5).setInteractive()

    
    
    this.start.once('pointerdown', () => {
        this.scene.stop()
        // this.scene.start('bonus')

        this.scene.start('level1',  {
            char: this.characters[this.levels[0]], 
            vehicle: this.vehicles[this.levels[0]],
            vehicleWin: this.vehiclesWin[this.levels[0]],
            vehicleInteractive: this.vehiclesInteractive[this.levels[0]],
            correctItem: this.correctItems[this.levels[0]],
            levels: this.levels,
            sublevel: this.sublevel,
            firstLevel: true
        })

        }
        )

}

}