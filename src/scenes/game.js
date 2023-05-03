import Phaser from '../lib/phaser.js'


export default class Game extends Phaser.Scene
{
    timedEvent


    constructor() 
    {
    super('game')
    }

    init()
    {
    let numcorrect = 0
    }

    preload()
    {
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
        this.load.image('target', './src/assets/Game/emptybox.png')
        // this.load.json('anim', './src/assets/Anim/char_pc.json')
        // this.load.atlas('anim-atlas', './src/assets/Anim/char_pc.atlas')
        // this.load.spritesheet('anim-spritesheet', './src/assets/Anim/char_pc.png')

        this.load.image('background', './src/assets/Game/grid-bg.png')
        this.load.image('platform', './src/assets/Environment/ground.png')

        // this.load.spritesheet("star-bad", "./src/assets/Items/star-bad-spritesheet.png", {
        //     frameWidth: 76,
        //     frameHeight: 74
        // });
        this.load.audio('boing', './src/assets/Sounds/cartoonboing.mp3')
        this.load.audio('pop', './src/assets/Sounds/cartoonbubblepop.mp3')
        this.load.spine("player-spine","./src/assets/Anim/char_pc.json","./src/assets/Anim/char_pc.atlas")

        this.load.spine("hand","./src/assets/Anim/hand/onboarding_hand.json","./src/assets/Anim/hand/onboarding_hand.atlas")

    }

    create()
    {

        let target1posX = 1000
        let target1posY = 450
        let marginX = 150
        let marginY = 300

            this.add.image(700, 450, 'background');
            this.add.text(700, 50, 'Numbers one and two are correct').setFontSize(35).setShadow(3, 3).setOrigin(0.5);

                    //  Create some 'drop zones'
            this.add.image(target1posX, target1posY, 'target')

           
            let object1 = this.add.image(100, 100, 'idle_1')
            let object2 = this.add.image(100, 400, 'idle_2')
            let object3 = this.add.image(100, 700, 'idle_3')
            object1.setInteractive({ draggable: true })
            object2.setInteractive({ draggable: true })
            object3.setInteractive({ draggable: true })

        object1.object = ['idle_1','active_1','correct_1','incorrect_1']
        object2.object = ['idle_2','active_2','correct_2','incorrect_2']
        object3.object = ['idle_3','active_3','idle_3','incorrect_3']
        object1.endX = 1000
        object1.endY = 300
        object2.endX = 1000
        object2.endY = 600
        object3.endX = 100
        object3.endY = 700
        object1.over = false
        object2.over = false
        object1.iscorrect = true
        object2.iscorrect = true
        object3.iscorrect = false
        let numcorrect = 0
        let totalnumobjects = 2
        // this.add.spine(512, 650, 'hand', '01_tap', false);
        // const container = this.add.spineContainer();
        // container.add(hand);

   
            // this.input.on('dragstart', function () {
    
                //console.log("off we go")
    
            // }, this);


        this.input.on('gameobjectover', (pointer, gameObject) =>
        {
            // console.log(gameObject)
            gameObject.setTexture(gameObject.object[1]);

        });


    
            this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
    
                gameObject.x = dragX;
                gameObject.y = dragY;

                
            });

            this.input.on('dragend', (pointer, gameObject) => {

                const x = gameObject.x;
                const y = gameObject.y;

                gameObject.setTexture(gameObject.object[0]);
    
                if ((x < target1posX+marginX && x > target1posX-marginX) && (y < target1posY+marginY && y > target1posY-marginY) && !gameObject.over)
                {
                    gameObject.setTexture(gameObject.object[2])
                    gameObject.disableInteractive();
                    gameObject.x = gameObject.endX
                    gameObject.y = gameObject.endY
                    if(gameObject.iscorrect) {numcorrect++}
                    if(numcorrect == totalnumobjects){
                        this.add.spine(512, 650, 'hand', '01_tap', false);
                        this.timedEvent = this.time.delayedCall(2000, this.playGameOver, [], this);
                    }
                }
                
  
                });
            }

            playGameOver() {
                this.scene.start('game-over')
            }

    update()
    {




}

}