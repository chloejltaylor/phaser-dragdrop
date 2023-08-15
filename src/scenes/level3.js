import Phaser from '../lib/phaser.js'

export default class level3 extends Phaser.Scene
{
    timedEvent
    vehicles = ['vehicle_ambulance.png', 'vehicle_fire_appliance.png', 'vehicle_police_car.png']
    vehiclesWin = ['vehicle_ambulance.png', 'vehicle_fire_appliance.png', 'vehicle_police_car.png']
    vehiclesInteractive = ['vehicle_ambulance.png', 'vehicle_fire_appliance.png', 'vehicle_police_car.png']
    sirens = ['siren-pm', 'siren-ff', 'siren-po']
    characters = ['pm', 'ff', 'po']
    correctItems = ['paramedic_icon_03.png', 'firefighter_icon_03.png', 'police_icon_03.png']
    incorrectItem1s = [['police_icon_01.png', 'firefighter_icon_01.png'],['police_icon_01.png', 'paramedic_icon_01.png'], ['paramedic_icon_01.png', 'firefighter_icon_01.png']]
    incorrectItem2s = [['police_icon_02.png', 'firefighter_icon_02.png'],['police_icon_02.png', 'paramedic_icon_02.png'], ['paramedic_icon_02.png', 'firefighter_icon_02.png']]
    incorrectItem3s = ['police_icon_03.png', 'police_icon_03.png', 'firefighter_icon_03.png']
    incorrectItem4s = ['firefighter_icon_03.png', 'paramedic_icon_03.png', 'paramedic_icon_03.png']
    
    docks = ['dock_5_paramedic.png', 'dock_5_firefighter.png', 'dock_5_police.png']
    siren
    levels
    currentSublevel
    firstLevel
    vehicle
    vehicleWin
    vehicleInteractive
    char
    correctItem
    incorrectItem1
    incorrectItem2
    incorrectItem3
    incorrectItem4
    vehicleObject
    charanims
    charObject
    object1
    object2
    object3
    object4
    object5

    constructor() 
    {
    super('level3')
    }

    init (data)
    {
        this.levels= data.levels
        this.currentSublevel = data.currentSublevel
    }

    preload()
    {
    }

    create()
    {

        this.vehicle = this.vehicles[this.levels[this.currentSublevel]]
        this.vehicleWin = this.vehiclesWin[this.levels[this.currentSublevel]]
        this.vehicleInteractive = this.vehiclesInteractive[this.levels[this.currentSublevel]]
        this.char = this.characters[this.levels[this.currentSublevel]]
        this.correctItem = this.correctItems[this.levels[this.currentSublevel]]
        this.incorrectItem1 = this.incorrectItem1s[this.levels[this.currentSublevel]][Phaser.Math.Between(0, 1)]
        this.incorrectItem2 = this.incorrectItem2s[this.levels[this.currentSublevel]][Phaser.Math.Between(0, 1)]
        this.incorrectItem3 = this.incorrectItem3s[this.levels[this.currentSublevel]]
        this.incorrectItem4 = this.incorrectItem4s[this.levels[this.currentSublevel]]
        this.siren = this.sirens[this.levels[this.currentSublevel]]

        console.log("level 3")
        console.log(this.currentSublevel)
        console.log(this.correctItem)
        console.log(this.incorrectItem1)
        console.log(this.incorrectItem2)
        console.log(this.incorrectItem3)
        console.log(this.incorrectItem4)

        // Coordinates of the drop zone
        let target1posX = 800
        let target1posY = 350

        // Space around drop zone that is accepted
        let marginX = 150
        let marginY = 300

        // Starting positions of the draggables

        let startY = 748

        let startingPositionsX = [300, 500, 700, 900, 1100]
        // console.log(startingPositionsX)
        function shuffle(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                const temp = array[i];
                array[i] = array[j];
                array[j] = temp;
              }
          }
        shuffle(startingPositionsX)
        console.log(startingPositionsX)
        let startX1 = startingPositionsX[0]
        let startX2 = startingPositionsX[1]
        let startX3 = startingPositionsX[2]
        let startX4 = startingPositionsX[3]
        let startX5 = startingPositionsX[4]

        this.add.image(700, 450, 'background')
        this.vehicleObject = this.add.image(600, 400, 'spritesheet', this.vehicle)

                //set interactive vehicle feature
                this.vehicleObject.setInteractive().on('pointerdown', pointer =>
                {
                    this.vehicleObject.setTexture('spritesheet', this.vehicleInteractive)
                    this.sound.play(this.siren)
                    this.time.delayedCall(1000,  changeback, [], this)
                })
                function changeback(){
                    this.vehicleObject.setTexture('spritesheet', this.vehicle)
                }

        // Place charatcer
        this.charObject = this.add.spine(1135, 600, this.char).setScale(2)
        const charanims = this.charObject.getAnimationList()

        // console.log(charanims)

        this.charObject.setInteractive().on('pointerdown', pointer =>
        {
            this.charObject.play(charanims[2], false);
        });


        //Place dock
        let dock = this.add.image(700, 750, 'spritesheet', this.docks[this.currentSublevel])


        // Place draggables           
        this.object1 = this.add.image(startX1, startY, 'spritesheet', this.correctItem)
        this.object2 = this.add.image(startX2, startY, 'spritesheet', this.incorrectItem1)
        this.object3 = this.add.image(startX3, startY, 'spritesheet', this.incorrectItem2)
        this.object4 = this.add.image(startX4, startY, 'spritesheet', this.incorrectItem3)
        this.object5 = this.add.image(startX5, startY, 'spritesheet',this.incorrectItem4)
        this.object1.setInteractive({ draggable: true })
        this.object2.setInteractive({ draggable: true })
        this.object3.setInteractive({ draggable: true })
        this.object4.setInteractive({ draggable: true })
        this.object5.setInteractive({ draggable: true })

        // set different textures for different states: IDLE, ACTIVE, CORRECT, INCORRECT

        this.object1.objectstate = [this.correctItem, this.correctItem,this.correctItem,this.correctItem]
        this.object2.objectstate = [this.incorrectItem1, this.incorrectItem1, this.incorrectItem1, this.incorrectItem1]
        this.object3.objectstate = [this.incorrectItem2, this.incorrectItem2, this.incorrectItem2, this.incorrectItem2]
        this.object4.objectstate = [this.incorrectItem3, this.incorrectItem3, this.incorrectItem3, this.incorrectItem3]
        this.object5.objectstate = [this.incorrectItem4, this.incorrectItem4, this.incorrectItem4, this.incorrectItem4]
        // Incorrect draggables to be sent back where they started
        // Correct draggables to click to their place in the drop zone
        this.object1.endX = startX1
        this.object1.endY = startY
        this.object2.endX = 950
        this.object2.endY = startY
        this.object3.endX = startX3
        this.object3.endY = startY
        this.object4.endX = startX4
        this.object4.endY = startY
        this.object5.endX = startX5
        this.object5.endY = startY

        this.object1.startX = startX1
        this.object1.startY = startY
        this.object2.startX = startX2
        this.object2.startY = startY
        this.object3.startX = startX3
        this.object3.startY = startY
        this.object4.startX = startX4
        this.object4.startY = startY
        this.object5.startX = startX5
        this.object5.startY = startY

        // Choose the correct object
        this.object1.iscorrect = true
        this.object2.iscorrect = false
        this.object3.iscorrect = false
        this.object4.iscorrect = false
        this.object5.iscorrect = false

        //initialise the number correct
        let numcorrect = 0

        // number of possible correct draggables
        let totalnumobjects = 1

        // show the active objectstate of the draggable when dragged
        this.input.on('gameobjectover', (pointer, gameObject) =>
        {
            if(gameObject.objectState){
                gameObject.setTexture('spritesheet', gameObject.objectstate[1]);
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
                // gameObject.setTexture('spritesheet', gameObject.objectstate[2])
                gameObject.setAlpha(0)
                gameObject.disableInteractive();
                gameObject.x = gameObject.endX
                gameObject.y = gameObject.endY
                if(gameObject.iscorrect) {numcorrect++}

                // End the round
                if(numcorrect == totalnumobjects){
                // Completion animation 
                    this.charObject.play(charanims[3], false)
                    this.vehicleObject.setTexture('spritesheet', this.vehicleWin)

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
                gameObject.setTexture('spritesheet', gameObject.objectstate[0]);
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

        removeInteractiveElements(){
            this.vehicleObject.disableInteractive()
            this.charObject.disableInteractive()
            this.object1.disableInteractive()
            this.object2.disableInteractive()
            this.object3.disableInteractive()
            this.object4.disableInteractive()
            this.object5.disableInteractive()
        }


        playTransition() {

            let continueButton = this.add.image(700, 450,'spritesheet', 'continue.png').setInteractive()

            
                if(this.currentSublevel==0){
                    this.scene.start('level3',  {
                        levels: this.levels,
                        currentSublevel: this.currentSublevel+1
                    }) 
                }
                else if(this.currentSublevel==1){
                    this.scene.start('level3',  {
                        levels: this.levels,
                        currentSublevel: this.currentSublevel+1
                    }) 
                }
                else if(this.currentSublevel==2){
                    continueButton.once('pointerdown', () => {
                   
                        this.scene.start('intro-bonus', {sublevel: 0})
                    
                })
            }
        }



}

