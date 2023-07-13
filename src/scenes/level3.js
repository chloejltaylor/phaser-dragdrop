import Phaser from '../lib/phaser.js'
import eventsCenter from './eventscentre.js'

export default class level3 extends Phaser.Scene
{
    timedEvent
    vehicles = ['vehicle-pm', 'vehicle-ff', 'vehicle-po']
    vehiclesWin = ['vehicle-pm-win', 'vehicle-ff-win', 'vehicle-po-win']
    characters = ['pm', 'ff', 'po']
    correctItems = ['item4', 'item3', 'item5']

    constructor() 
    {
    super('level3')
    }

    init (data)
    {
        this.vehicle = data.vehicle
        this.vehicleWin = data.vehicleWin
        this.char = data.char
        this.correctItem = data.correctItem
        console.log(this.correctItem)

    }

    preload()
    {
        this.scene.run('level-tracker')
    }

    create()
    {

        console.log("level 3")

        // Coordinates of the drop zone
        let target1posX = 950
        let target1posY = 340

        // Space around drop zone that is accepted
        let marginX = 150
        let marginY = 300

        // Starting positions of the draggables

        let startY = 800

        let startingPositionsX = [300, 500, 700, 900, 1100]
        // console.log(startingPositionsX)
        function shuffle(array) {
            array.sort(() => Math.random() - 0.5);
          }
        shuffle(startingPositionsX)
        console.log(startingPositionsX)
        let startX1 = startingPositionsX[0]
        let startX2 = startingPositionsX[1]
        let startX3 = startingPositionsX[2]
        let startX4 = startingPositionsX[3]
        let startX5 = startingPositionsX[4]

        this.add.image(700, 450, 'background')
        const vehicle = this.add.image(700, 350, this.vehicle)

        // Place charatcer
        const char = this.add.spine(1200, 550, this.char)
        const charanims = char.getAnimationList()

        // console.log(charanims)

        char.setInteractive().on('pointerdown', pointer =>
        {
            char.play(charanims[2], false);
        });


        //Place dock
        let dock = this.add.image(700, 900,'dock3')


        // Place draggables           
        let object1 = this.add.image(startX1, startY, this.correctItem)
        let object2 = this.add.image(startX2, startY, 'decoy1')
        let object3 = this.add.image(startX3, startY, 'decoy2')
        let object4 = this.add.image(startX4, startY, 'decoy3')
        let object5 = this.add.image(startX5, startY, 'decoy4')
        object1.setInteractive({ draggable: true })
        object2.setInteractive({ draggable: true })
        object3.setInteractive({ draggable: true })
        object4.setInteractive({ draggable: true })
        object5.setInteractive({ draggable: true })

        // set different textures for different states: IDLE, ACTIVE, CORRECT, INCORRECT

        object1.objectstate = [this.correctItem, this.correctItem,this.correctItem,this.correctItem]
        object2.objectstate = ['decoy1','decoy1','decoy1','decoy1']
        object3.objectstate = ['decoy2','decoy2','decoy2','decoy2']
        object4.objectstate = ['decoy3','decoy3','decoy3','decoy3']
        object5.objectstate = ['decoy4','decoy4','decoy4','decoy4']

        // Incorrect draggables to be sent back where they started
        // Correct draggables to click to their place in the drop zone
        object1.endX = startX1
        object1.endY = startY
        object2.endX = 950
        object2.endY = startY
        object3.endX = startX3
        object3.endY = startY
        object4.endX = startX4
        object4.endY = startY
        object5.endX = startX5
        object5.endY = startY

        object1.startX = startX1
        object1.startY = startY
        object2.startX = startX2
        object2.startY = startY
        object3.startX = startX3
        object3.startY = startY
        object4.startX = startX4
        object4.startY = startY
        object5.startX = startX5
        object5.startY = startY

        // Choose the correct object
        object1.iscorrect = true
        object2.iscorrect = false
        object3.iscorrect = false
        object4.iscorrect = false
        object5.iscorrect = false

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
                    vehicle.setTexture(this.vehicleWin);

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

            let continueButton = this.add.image(700, 450, 'continue').setInteractive()
            continueButton.once('pointerdown', () => {
                this.scene.stop()
                this.scene.start('intro-bonus')
            }
                )

            // this.scene.start('intro-bonus')
        }





}
