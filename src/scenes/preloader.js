import Phaser from '../lib/phaser.js'

export default class preloader extends Phaser.Scene
{
    constructor() 
    {
    super('preloader')
    }

    preload()
    {
        this.load.image('play', './src/assets/Buttons/play_big_idle.png')
        this.load.image('background', './src/assets/Game/grid-bg.png')
        this.scene.run('level-tracker')
    
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
        this.load.image('vehicle', './src/assets/temp/vehicle-1a.png')
        this.load.image('vehicle-win', './src/assets/temp/vehicle-1b.png')
        this.load.image('vehicle-fire', './src/assets/temp/vehicle-2a.png')
        this.load.image('vehicle-fire-win', './src/assets/temp/vehicle-2b.png')
        this.load.image('vehicle-po', './src/assets/temp/vehicle-3a.png')
        this.load.image('vehicle-po-win', './src/assets/temp/vehicle-3b.png')
        this.load.image('dock', './src/assets/temp/dnd_dock_1.png')
        this.load.image('item', './src/assets/temp/dnd_item.png')
        this.load.image('background', './src/assets/Game/grid-bg.png')
        this.load.image('platform', './src/assets/Environment/ground.png')
        this.load.audio('correct', './src/assets/Sounds/cartoonboing.mp3')
        this.load.audio('incorrect', './src/assets/Sounds/cartoonbubblepop.mp3')
        this.load.spine("po","./src/assets/char/po/char_po.json","./src/assets/char/po/char_po.atlas")
        this.load.spine("ff","./src/assets/char/ff/char_ff.json","./src/assets/char/ff/char_ff.atlas")
        this.load.spine("pm","./src/assets/char/pm/char_pm.json","./src/assets/char/pm/char_pm.atlas")
        this.load.image('continue', './src/assets/Buttons/continue.png')
    
    
    
    
    }

}