import Phaser from '../lib/phaser.js'


export default class level1po extends Phaser.Scene
{
    timedEvent


    constructor() 
    {
    super('level1po')
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
        this.load.image('target', './src/assets/temp/hitzone.png')
        this.load.image('vehicle', './src/assets/temp/vehicle-3a.png')
        this.load.image('vehicle-win', './src/assets/temp/vehicle-3b.png')
        this.load.image('dock', './src/assets/temp/dnd_dock_1.png')
        this.load.image('item', './src/assets/temp/dnd_item.png')

        this.load.image('background', './src/assets/Game/grid-bg.png')
        this.load.image('platform', './src/assets/Environment/ground.png')

        this.load.audio('correct', './src/assets/Sounds/cartoonboing.mp3')
        this.load.audio('incorrect', './src/assets/Sounds/cartoonbubblepop.mp3')
        this.load.spine("po","./src/assets/char/po/char_po.json","./src/assets/char/po/char_po.atlas")
        this.load.spine("ff","./src/assets/char/ff/char_ff.json","./src/assets/char/ff/char_ff.atlas")
        this.load.spine("pm","./src/assets/char/pm/char_pm.json","./src/assets/char/pm/char_pm.atlas")
    }

    create()
    {

        console.log(this.test)
        // Coordinates of the drop zone
        let target1posX = 950
        let target1posY = 340

        // Space around drop zone that is accepted
        let marginX = 150
        let marginY = 300

        // Starting positions of the draggables

        let startY1 = 800
        let startY2 = 800
        let startY3 = 800

        let startingPositionsX = [400, 700, 1000]
        console.log(startingPositionsX)
        function shuffle(array) {
            array.sort(() => Math.random() - 0.5);
          }
        shuffle(startingPositionsX)
        console.log(startingPositionsX)
        let startX1 = startingPositionsX[0]
        let startX2 = startingPositionsX[1]
        let startX3 = startingPositionsX[2]

        this.add.image(700, 450, 'background');
        // this.add.text(700, 50, 'Number two is correct').setFontSize(35).setShadow(3, 3).setOrigin(0.5);
        const vehicle = this.add.image(700, 350, 'vehicle')



        // Place charatcer
        const char = this.add.spine(1200, 550, 'po')
        const charanims = char.getAnimationList()

        console.log(charanims)

        char.setInteractive().on('pointerdown', pointer =>
        {
            char.play(charanims[2], false);
        });


        //Place dock
        let dock = this.add.image(700, 900,'dock')


        // Place draggables           
        let object1 = this.add.image(startX1, startY1, 'item')
        let object2 = this.add.image(startX2, startY2, 'item')
        let object3 = this.add.image(startX3, startY3, 'item')
        object1.setInteractive({ draggable: true })
        object2.setInteractive({ draggable: true })
        object3.setInteractive({ draggable: true })

        // set different textures for different states: IDLE, ACTIVE, CORRECT, INCORRECT

        object1.objectstate = ['item','item','item','item']
        object2.objectstate = ['item','item','item','item']
        object3.objectstate = ['item','item','item','item']

        // Incorrect draggables to be sent back where they started
        // Correct draggables to click to their place in the drop zone
        object1.endX = startX1
        object1.endY = startY1
        object2.endX = 950
        object2.endY = 400
        object3.endX = startX2
        object3.endY = startY3
        object1.startX = startX1
        object1.startY = startY1
        object2.startX = startX2
        object2.startY = startY2
        object3.startX = startX3
        object3.startY = startY3

        // Choose the correct object
        object1.iscorrect = false
        object2.iscorrect = true
        object3.iscorrect = false

        //initialise the number correct
        let numcorrect = 0

        // number of possible correct draggables
        let totalnumobjects = 1

        // show the active objectstate of the draggable when dragged
        this.input.on('gameobjectover', (pointer, gameObject) =>
        {
            if(gameObject.objectState){
                gameObject.setTexture(gameObject.objectstate[1]);
            }
            

        });

        // Move the draggable with the pointer
        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });

        // Release the draggable
        this.input.on('dragend', (pointer, gameObject) => {

            // note where the draggable has been released
            const x = gameObject.x;
            const y = gameObject.y;

            // If the correct draggable is dropped in the drop zone...
            if ((gameObject.iscorrect) && (x < target1posX+marginX && x > target1posX-marginX) && (y < target1posY+marginY && y > target1posY-marginY))
            {
                this.sound.play('correct')
                gameObject.setTexture(gameObject.objectstate[2])
                gameObject.disableInteractive();
                gameObject.x = gameObject.endX
                gameObject.y = gameObject.endY
                if(gameObject.iscorrect) {numcorrect++}

                // End the round
                if(numcorrect == totalnumobjects){
                // Completion animation 
                    char.play(charanims[3], false)
                    vehicle.setTexture('vehicle-win');

                // Transition scene
                    this.timedEvent = this.time.delayedCall(2000, this.playTransition, [], this)
                }
            } 
            else {

                this.sound.play('incorrect')
                // Set draggable back to idle objectstate
                gameObject.setTexture(gameObject.objectstate[0]);
                this.tweens.add({
                    targets: gameObject,
                    props: {
                        x: { value: gameObject.startX, duration: 800 },
                        y: { value: gameObject.startY, duration: 800 },
                    },
                    ease: 'Sine.easeInOut',
                });
            }
            });
        }

        playTransition() {
            this.scene.start('intro-bonus')
        }

    update()
    {




}

}