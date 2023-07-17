import Phaser from '../lib/phaser.js'
import eventsCenter from './eventscentre.js'

export default class level1 extends Phaser.Scene
{
    timedEvent
    vehicles = ['vehicle-pm', 'vehicle-ff', 'vehicle-po']
    vehiclesWin = ['vehicle-pm-win', 'vehicle-ff-win', 'vehicle-po-win']
    characters = ['pm', 'ff', 'po']
    correctItems = ['item4', 'item3', 'item5']

    constructor() 
    {
    super('level1')
    }

    init (data)
    {
        this.vehicle = data.vehicle
        this.vehicleWin = data.vehicleWin
        this.char = data.char
        this.correctItem = data.correctItem
        this.levels= data.levels
        this.sublevel= data.sublevel

    }

    preload()
    {
        this.scene.run('level-tracker')
        this.scene.run('ui-scene')
    }

    create()
    {

        
        console.log("level 1")

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
        function shuffle(array) {
            array.sort(() => Math.random() - 0.5);
          }
        shuffle(startingPositionsX)
        let startX1 = startingPositionsX[0]
        let startX2 = startingPositionsX[1]
        let startX3 = startingPositionsX[2]

        this.add.image(700, 450, 'background')
        const vehicle = this.add.image(700, 350, this.vehicle)

        // Place charatcer
        const char = this.add.spine(1200, 550, this.char)
        const charanims = char.getAnimationList()


        char.setInteractive().on('pointerdown', pointer =>
        {
            char.play(charanims[2], false);
        });


        //Place dock
        let dock = this.add.image(700, 900,'dock')


        // Place draggables           
        let object1 = this.add.image(startX1, startY1, this.correctItem)
        let object2 = this.add.image(startX2, startY2, 'item')
        let object3 = this.add.image(startX3, startY3, 'item2')
        object1.setInteractive({ draggable: true })
        object2.setInteractive({ draggable: true })
        object3.setInteractive({ draggable: true })

        // set different textures for different states: IDLE, ACTIVE, CORRECT, INCORRECT

        object1.objectstate = [this.correctItem, this.correctItem,this.correctItem,this.correctItem]
        object2.objectstate = ['item2','item2','item2','item2']
        object3.objectstate = ['item3','item3','item3','item3']

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
                if(this.sublevel==0){
                    this.scene.start('level1',  {
                        char: this.characters[this.levels[1]], 
                        vehicle: this.vehicles[this.levels[1]],
                        vehicleWin: this.vehiclesWin[this.levels[1]],
                        correctItem: this.correctItems[this.levels[1]],
                        levels: this.levels,
                        sublevel: this.sublevel+1
                    }) 
                }
                else if(this.sublevel==1){
                    this.scene.start('level1',  {
                        char: this.characters[this.levels[2]], 
                        vehicle: this.vehicles[this.levels[2]],
                        vehicleWin: this.vehiclesWin[this.levels[2]],
                        correctItem: this.correctItems[this.levels[2]],
                        levels: this.levels,
                        sublevel: this.sublevel+1
                    }) 
                }
                else if(this.sublevel==2){
                    this.scene.start('level2',  {
                        char: this.characters[this.levels[0]], 
                        vehicle: this.vehicles[this.levels[0]],
                        vehicleWin: this.vehiclesWin[this.levels[0]],
                        correctItem: this.correctItems[this.levels[0]],
                        levels: this.levels,
                        sublevel: 0
                    }) 
                }
            })
        }

}

