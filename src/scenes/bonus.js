import Phaser from '../lib/phaser.js'


export default class Bonus extends Phaser.Scene
{
    timedEvent
    constructor() 
    {
    super('bonus')
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

        this.load.image('background', './src/assets/Game/grid-bg.png')
        this.load.image('platform', './src/assets/Environment/ground.png')

        this.load.audio('correct', './src/assets/Sounds/cartoonboing.mp3')
        this.load.audio('incorrect', './src/assets/Sounds/cartoonbubblepop.mp3')
        this.load.spine("pw","./src/assets/char/pw/char_pw.json","./src/assets/char/pw/char_pw.atlas")
        this.load.spine("rc","./src/assets/char/rc/char_rc.json","./src/assets/char/rc/char_rc.atlas")
        this.load.spine("vet","./src/assets/char/vet/char_vt.json","./src/assets/char/vet/char_vt.atlas")

    }

    create()
    {


        // Coordinates of the drop zone
        let target1posX = 700
        let target1posY = 350

        // Space around drop zone that is accepted
        let marginX = 150
        let marginY = 300

        // Starting positions of the draggables
        let startX1 = 300
        let startX2 = 700
        let startX3 = 1100
        let startY1 = 700
        let startY2 = 700
        let startY3 = 700

        this.add.image(700, 450, 'background');
        this.add.text(700, 50, 'Number one is correct').setFontSize(35).setShadow(3, 3).setOrigin(0.5);

        //  Create a 'drop zone'
        this.add.image(target1posX, target1posY, 'target')

        // Place draggables           
        let object1 = this.add.spine(startX1, startY1, 'pw')
        let object2 = this.add.spine(startX2, startY2, 'rc')
        let object3 = this.add.spine(startX3, startY3, 'vet')

        object1.setInteractive({ draggable: true })
        object2.setInteractive({ draggable: true })
        object3.setInteractive({ draggable: true })
        const object1anims = object1.getAnimationList()
        const object2anims = object2.getAnimationList()
        const object3anims = object3.getAnimationList()
        object1.play(object1anims[0], true)
        object2.play(object1anims[0], true)
        object3.play(object1anims[0], true)


        // object1.objectstate = ['idle_1','active_1','correct_1','incorrect_1']
        // object2.objectstate = ['idle_2','active_2','correct_2','incorrect_2']
        // object3.objectstate = ['idle_3','active_3','idle_3','incorrect_3']

        // Incorrect draggables to be sent back where they started
        // Correct draggables to click to their place in the drop zone
        object1.endX = 850
        object1.endY = 300
        object2.endX = startX2
        object2.endY = startY2
        object3.endX = startX3
        object3.endY = startY3
        object1.startX = startX1
        object1.startY = startY1
        object2.startX = startX2
        object2.startY = startY2
        object3.startX = startX3
        object3.startY = startY3

        // Choose the correct object
        object1.iscorrect = true
        object2.iscorrect = false
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
                object1.play(object1anims[3], false);
                // gameObject.setTexture(gameObject.objectstate[2])
                gameObject.disableInteractive();
                gameObject.x = gameObject.endX
                gameObject.y = gameObject.endY
                if(gameObject.iscorrect) {numcorrect++}

                // End the round
                if(numcorrect == totalnumobjects){

                    // Transition scene
                    this.timedEvent = this.time.delayedCall(2000, this.playTransition, [], this)
                }
            } 
            else {

                this.sound.play('incorrect')
                // Set draggable back to idle objectstate
                // gameObject.setTexture(gameObject.objectstate[0]);
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
            this.scene.start('congratulations')
        }

    update()
    {




}

}