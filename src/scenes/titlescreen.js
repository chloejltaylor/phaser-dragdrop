import Phaser from '../lib/phaser.js'

export default class Title extends Phaser.Scene

{

constructor()
{
super('title')
}

currentSublevel = 0
start
games
levels

preload()
{

        this.load.setPath('./src/assets/')
        this.load.atlas(
            'spritesheet',
            'spritesheet.png',
            'spritesheet.json'
          )


    this.load.image('play', 'Buttons/play_big_idle.png')
    this.load.image('background', 'background/background.png')
    this.load.spine("hand","Anim/hand/onboarding_hand.json","Anim/hand/onboarding_hand.atlas")

    this.load.image('close', 'Buttons/close.png')
    this.load.image('charHitZone', 'bonus-mystery.png')   
    this.load.image('target', 'temp/hitzone.png')
    this.load.image('dock-bonus', 'docks/dock_3_bonus.png')

    this.load.image('scenario1a', 'bonus-bg-static-a.png')
    this.load.image('scenario2a', 'bonus-bg-static-a.png')
    this.load.image('scenario3a', 'bonus-bg-static-a.png')
    this.load.image('scenario1b', 'bonus-bg-static-b.png')
    this.load.image('scenario2b', 'bonus-bg-static-b.png')
    this.load.image('scenario3b', 'bonus-bg-static-b.png')


    this.load.audio('correct', 'Sounds/correct.mp3')
    this.load.audio('incorrect', 'Sounds/cartoonboing.mp3')
    this.load.audio('siren-po', 'Sounds/police_placeholder.mp3')
    this.load.audio('siren-ff', 'Sounds/fireengine_placeholder.mp3')
    this.load.audio('siren-pm', 'Sounds/ambulance_placeholder.mp3')

    this.load.spine("po","char/po/char_po.json","char/po/char_po.atlas")
    this.load.spine("ff","char/ff/char_ff.json","char/ff/char_ff.atlas")
    this.load.spine("pm","char/pm/char_pm.json","char/pm/char_pm.atlas")


    
}

create()
{

    this.levels = [0,1,2]
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
          }
      }
    shuffle(this.levels)
    console.log("level order: "+ this.levels)

    const width = this.scale.width
    const height = this.scale.height

    this.add.image(700, 450, 'background');

    this.add.text(width * 0.5, height * 0.3, 'HELPING THE EMERGENCY SERVICES', {
    fontSize: 48}).setOrigin(0.5)

    this.start = this.add.image(width * 0.5, height * 0.7, 'spritesheet', 'play_big_idle.png').setScale(1.5).setInteractive()
   
    // this.start.once('pointerdown', () => {

        this.scene.start('bonus',  {
            levels: this.levels,
            currentSublevel: this.currentSublevel,
            firstLevel: true
        })

        // }
        // )

}

}