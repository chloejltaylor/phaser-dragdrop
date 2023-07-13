import Phaser from '../lib/phaser.js'


export default class Bonus extends Phaser.Scene
{
    timedEvent
    vehicles = ['vehicle-pm', 'vehicle-ff', 'vehicle-po']
    vehiclesWin = ['vehicle-pm-win', 'vehicle-ff-win', 'vehicle-po-win']
    characters = ['pm', 'ff', 'po']
    correctItems = ['item4', 'item3', 'item5']



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
        this.load.image('bonus-paramedic', './src/assets/temp/bonus_paramedic-1a.png')


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

        //  Create a 'drop zone'
        this.add.image(target1posX, target1posY, 'bonus-paramedic')

        // Place draggables           
        let object1 = this.add.spine(startX1, startY1, 'po')
        let object2 = this.add.spine(startX2, startY2, 'ff')
        let object3 = this.add.spine(startX3, startY3, 'pm')

        object1.setInteractive({ draggable: true })
        object2.setInteractive({ draggable: true })
        object3.setInteractive({ draggable: true })
        const object1anims = object1.getAnimationList()
        const object2anims = object2.getAnimationList()
        const object3anims = object3.getAnimationList()
        object1.play(object1anims[0], true)
        object2.play(object2anims[0], true)
        object3.play(object3anims[0], true)


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
        object1.iscorrect = false
        object2.iscorrect = false
        object3.iscorrect = true

        let correctObject = object3

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
                correctObject.play(object3anims[3], false);
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