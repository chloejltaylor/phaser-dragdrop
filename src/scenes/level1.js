import Phaser from '../lib/phaser.js'
import eventsCenter from './eventscentre.js'

export default class level1 extends Phaser.Scene
{
    timedEvent
    onboardingTimer
    vehicles = ['vehicle-pm', 'vehicle-ff', 'vehicle-po']
    vehiclesWin = ['vehicle-pm-win', 'vehicle-ff-win', 'vehicle-po-win']
    vehiclesInteractive = ['vehicle-pm-interactive', 'vehicle-ff-interactive', 'vehicle-po-interactive']
    characters = ['pm', 'ff', 'po']
    correctItems = ['item4', 'item3', 'item5']
    sirens = ['siren-pm', 'siren-ff', 'siren-po']

    constructor() 
    {
    super('level1')
    }

    init (data)
    {
        this.vehicle = data.vehicle
        this.vehicleWin = data.vehicleWin
        this.vehicleInteractive = data.vehicleInteractive
        this.char = data.char
        this.correctItem = data.correctItem
        this.levels= data.levels
        this.sublevel= data.sublevel
        this.firstLevel = data.firstLevel
        this.siren = data.siren

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
        let target1posX = 800
        let target1posY = 350



        // Space around drop zone that is accepted
        let marginX = 150
        let marginY = 300

        // Starting positions of the draggables

        let startY1 = 780
        let startY2 = 780
        let startY3 = 780

        let startingPositionsX = [400, 700, 1000]
        function shuffle(array) {
            array.sort(() => Math.random() - 0.5);
          }
        shuffle(startingPositionsX)
        let startX1 = startingPositionsX[0]
        let startX2 = startingPositionsX[1]
        let startX3 = startingPositionsX[2]

        this.add.image(700, 450, 'background')
        this.vehicleObject = this.add.image(600, 350, this.vehicle).setScale(0.7)

        // this.add.image(target1posX, target1posY, 'target').setScale(0.8)

        //set interactive vehicle feature
        this.vehicleObject.setInteractive().on('pointerdown', pointer =>
        {
            this.vehicleObject.setTexture(this.vehicleInteractive)
            console.log(this.siren)
            this.sound.play(this.siren)
            this.time.delayedCall(1000,  changeback, [], this)
        })
        function changeback(){
            this.vehicleObject.setTexture(this.vehicle)
        }
        

        // Place charatcer
        this.charObject = this.add.spine(1100, 600, this.char).setScale(2)
        const charanims = this.charObject.getAnimationList()


        this.charObject.setInteractive().on('pointerdown', pointer =>
        {
            this.charObject.play(charanims[2], false);

        });


        //Place dock
        let dock = this.add.image(700, 850,'dock')


        // Place draggables           
        this.object1 = this.add.image(startX1, startY1, this.correctItem)
        this.object2 = this.add.image(startX2, startY2, 'decoy2')
        this.object3 = this.add.image(startX3, startY3, 'decoy3')
        this.object1.setInteractive({ draggable: true })
        this.object2.setInteractive({ draggable: true })
        this.object3.setInteractive({ draggable: true })

        // Onboarding
        if(this.firstLevel){
            this.object1.disableInteractive()
            this.object2.disableInteractive()
            this.object3.disableInteractive()
            this.time.delayedCall(2000, this.makeInteractive, [], this)
            this.handHelper = this.add.image(400, startY1, 'handHelper')
            this.hand = this.add.spine(400, startY1, 'hand')
            this.handanims = this.hand.getAnimationList()
            this.hand.setAlpha(0)
            this.handHelper.setAlpha(0)
            this.onboardingTimer = this.time.delayedCall(800, this.onboardingAnim, [], this)
        }



        // set different textures for different states: IDLE, ACTIVE, CORRECT, INCORRECT

        this.object1.objectstate = [this.correctItem, this.correctItem,this.correctItem,this.correctItem]
        this.object2.objectstate = ['decoy1','decoy1','decoy1','decoy1']
        this.object3.objectstate = ['decoy2','decoy2','decoy2','decoy2']

        // Incorrect draggables to be sent back where they started
        // Correct draggables to click to their place in the drop zone
        this.object1.endX = startX1
        this.object1.endY = startY1
        this.object2.endX = 950
        this.object2.endY = 400
        this.object3.endX = startX2
        this.object3.endY = startY3
        this.object1.startX = startX1
        this.object1.startY = startY1
        this.object2.startX = startX2
        this.object2.startY = startY2
        this.object3.startX = startX3
        this.object3.startY = startY3

        // Choose the correct object
        this.object1.iscorrect = true
        this.object2.iscorrect = false
        this.object3.iscorrect = false

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
                gameObject.disableInteractive()
                gameObject.x = gameObject.endX
                gameObject.y = gameObject.endY
                if(gameObject.iscorrect) {numcorrect++}

                // End the round
                if(numcorrect == totalnumobjects){
                // Completion animation 
                    
                    this.charObject.play(charanims[3], false)
                    this.vehicleObject.setTexture(this.vehicleWin)
                    this.tweens.add({
                        targets: this.vehicleObject,
                        props: {
                            x: { value: -1000, duration: 2500 },
                        },
                        ease: 'Sine.easeInOut',
                    })

                //prevent player from interacting
                this.removeInteractiveElements()

                // Transition scene
                    this.timedEvent = this.time.delayedCall(2000, this.playTransition, [], this)
                }
            } 
            else {

                this.sound.play('incorrect')
                // Set draggable back to idle objectstate
                gameObject.setTexture(gameObject.objectstate[0])
                this.tweens.add({
                    targets: gameObject,
                    props: {
                        x: { value: gameObject.startX, duration: 800 },
                        y: { value: gameObject.startY, duration: 800 },
                    },
                    ease: 'Sine.easeInOut',
                })
            }
            })
        }

        onboardingAnim() {
            this.hand.play(this.handanims[1], false)
            this.tweens.chain({
                targets: this.hand,
                tweens: [
                    {
                        x: 400,
                        alpha: 1,
                        ease: 'Sine.easeInOut',
                        duration: 200
                    },
                    {
                        x: 400,
                        y: 800,
                        ease: 'Sine.easeInOut',
                        duration: 500
                    },
                    {
                        x: 900,
                        y: 400,
                        ease: 'Sine.easeInOut',
                        duration: 2000
                    },
                    {
                        alpha: 0,
                        ease: 'Sine.easeInOut',
                        duration: 200
                    },

                ]
            })

        }

        removeInteractiveElements(){
            this.vehicleObject.disableInteractive()
            this.charObject.disableInteractive()
            this.object1.disableInteractive()
            this.object2.disableInteractive()
            this.object3.disableInteractive()
        }

        makeInteractive(){
            this.object1.setInteractive()
            this.object2.setInteractive()
            this.object3.setInteractive() 
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
                        vehicleInteractive: this.vehiclesInteractive[this.levels[1]],
                        siren: this.sirens[this.levels[1]],
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
                        vehicleInteractive: this.vehiclesInteractive[this.levels[2]],
                        siren: this.sirens[this.levels[2]],
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
                        vehicleInteractive: this.vehiclesInteractive[this.levels[0]],
                        siren: this.sirens[this.levels[0]],
                        correctItem: this.correctItems[this.levels[0]],
                        levels: this.levels,
                        sublevel: 0
                    }) 
                }
                
            })
        }
        

}

