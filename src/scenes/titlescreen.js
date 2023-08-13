import Phaser from '../lib/phaser.js'

export default class Title extends Phaser.Scene

{

constructor()
{
super('title')
}

currentSublevel = 0


preload()
{
    
    this.load.image('play', './src/assets/Buttons/play_big_idle.png')
    this.load.image('background', './src/assets/background/background.png')
    this.load.image('handHelper', './src/assets/onboarding/onboarding_hand.png')
    this.load.spine("hand","./src/assets/Anim/hand/onboarding_hand.json","./src/assets/Anim/hand/onboarding_hand.atlas")
    this.load.image('continue', './src/assets/Buttons/continue.png')
    this.load.image('close', './src/assets/Buttons/close.png')
    this.load.image('charHitZone', './src/assets/temp/bonus_paramedic-1b.png')

    this.scene.run('ui-scene')
    this.scene.run('music')

    this.load.image('target', './src/assets/temp/hitzone.png')
    this.load.image('vehicle-pm', './src/assets/vehicles/vehicle_ambulance.png')
    this.load.image('vehicle-pm-win', './src/assets/vehicles/vehicle_ambulance.png')
    this.load.image('vehicle-pm-interactive', './src/assets/vehicles/vehicle_ambulance.png')
    this.load.image('vehicle-ff', './src/assets/vehicles/vehicle_fire_appliance.png')
    this.load.image('vehicle-ff-win', './src/assets/vehicles/vehicle_fire_appliance.png')
    this.load.image('vehicle-ff-interactive', './src/assets/vehicles/vehicle_fire_appliance.png')
    this.load.image('vehicle-po', './src/assets/vehicles/vehicle_police_car.png')
    this.load.image('vehicle-po-win', './src/assets/vehicles/vehicle_police_car.png')
    this.load.image('vehicle-po-interactive', './src/assets/vehicles/vehicle_police_car.png')
    this.load.image('dock1-pm', './src/assets/docks/dock_3_paramedic.png')
    this.load.image('dock2-pm', './src/assets/docks/dock_4_paramedic.png')
    this.load.image('dock3-pm', './src/assets/docks/dock_5_paramedic.png')
    this.load.image('dock1-ff', './src/assets/docks/dock_3_firefighter.png')
    this.load.image('dock2-ff', './src/assets/docks/dock_4_firefighter.png')
    this.load.image('dock3-ff', './src/assets/docks/dock_5_firefighter.png')
    this.load.image('dock1-po', './src/assets/docks/dock_3_police.png')
    this.load.image('dock2-po', './src/assets/docks/dock_4_police.png')
    this.load.image('dock3-po', './src/assets/docks/dock_5_police.png')
    this.load.image('dock-bonus', './src/assets/docks/dock_3_bonus.png')

    this.load.image('item', './src/assets/temp/dnd_item.png')
    this.load.image('item2', './src/assets/temp/dnd_item-2.png')
    this.load.image('item3', './src/assets/temp/dnd_item-3.png')
    this.load.image('item4', './src/assets/temp/dnd_item-4.png')
    this.load.image('item5', './src/assets/temp/dnd_item-5.png')
    this.load.image('decoy1', './src/assets/temp/decoy1.png')
    this.load.image('decoy2', './src/assets/temp/decoy2.png')
    this.load.image('decoy3', './src/assets/temp/decoy3.png')
    this.load.image('decoy4', './src/assets/temp/decoy4.png')
    this.load.image('item1-correct-pm', './src/assets/items/paramedic_icon_01.png')
    this.load.image('item2-correct-pm', './src/assets/items/paramedic_icon_02.png')
    this.load.image('item3-correct-pm', './src/assets/items/paramedic_icon_03.png')
    this.load.image('item1-correct-ff', './src/assets/items/firefighter_icon_01.png')
    this.load.image('item2-correct-ff', './src/assets/items/firefighter_icon_02.png')
    this.load.image('item3-correct-ff', './src/assets/items/firefighter_icon_03.png')
    this.load.image('item1-correct-po', './src/assets/items/police_icon_01.png')
    this.load.image('item2-correct-po', './src/assets/items/police_icon_02.png')
    this.load.image('item3-correct-po', './src/assets/items/police_icon_03.png')

    this.load.audio('correct', './src/assets/Sounds/correct.mp3')
    this.load.audio('incorrect', './src/assets/Sounds/cartoonboing.mp3')
    this.load.audio('siren-po', './src/assets/Sounds/police_placeholder.mp3')
    this.load.audio('siren-ff', './src/assets/Sounds/fireengine_placeholder.mp3')
    this.load.audio('siren-pm', './src/assets/Sounds/ambulance_placeholder.mp3')

    this.load.spine("po","./src/assets/char/po/char_po.json","./src/assets/char/po/char_po.atlas")
    this.load.spine("ff","./src/assets/char/ff/char_ff.json","./src/assets/char/ff/char_ff.atlas")
    this.load.spine("pm","./src/assets/char/pm/char_pm.json","./src/assets/char/pm/char_pm.atlas")


    
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

    const width = this.scale.width
    const height = this.scale.height

    this.add.image(700, 450, 'background');

    this.add.text(width * 0.5, height * 0.3, 'HELPING THE EMERGENCY SERVICES', {
    fontSize: 48}).setOrigin(0.5)

    this.start = this.add.image(width * 0.5, height * 0.7, 'play').setScale(1.5).setInteractive()
   
    this.start.once('pointerdown', () => {
        // this.scene.stop()
        // this.scene.start('bonus')

        this.scene.start('level1',  {
            levels: this.levels,
            currentSublevel: this.currentSublevel,
            firstLevel: true
        })

        }
        )

}

}