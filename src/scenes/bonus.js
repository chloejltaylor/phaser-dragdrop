import Phaser from '../lib/phaser.js'


export default class Bonus extends Phaser.Scene
{
    timedEvent
    scenarios = ['vehicle-pm', 'vehicle-ff', 'vehicle-po']
    // vehiclesWin = ['vehicle-pm-win', 'vehicle-ff-win', 'vehicle-po-win']
    // vehiclesInteractive = ['vehicle-pm-interactive', 'vehicle-ff-interactive', 'vehicle-po-interactive']
    // sirens = ['siren-pm', 'siren-ff', 'siren-po']
    characters = ['pm', 'ff', 'po']
    indexNos = [0,1,2]


    constructor() 
    {
    super('bonus')
    }

    preload()
    {
        this.scene.run('ui-scene')        

    }

    create()
    {


        function shuffle(array) {
            for (let i = array.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              const temp = array[i];
              array[i] = array[j];
              array[j] = temp;
            }
          }
          

        shuffle(this.indexNos)
        console.log(this.indexNos)

        // Coordinates of the drop zone
        let target1posX = 1000
        let target1posY = 350

        // Space around drop zone that is accepted
        let marginX = 150
        let marginY = 300

        // Starting positions of the draggables
        let startX1 = 500
        let startX2 = 700
        let startX3 = 900
        let startingPositionsX = [startX1, startX2, startX3]
        let startY = 825

        //End position of the correct character
        let charEndX = 1000
        let charEndY = 580

        //Position images
        this.add.image(700, 450, 'background');
        this.add.image(700, 750,'dock-bonus')

        //  Create a 'drop zone'
        this.add.image(target1posX, target1posY, 'charHitZone')

        //image to show who we are trying to match
        this.add.image(500, 400, this.scenarios[this.indexNos[0]])
        

        // Place draggables           
        let object1 = this.add.spine(startingPositionsX[this.indexNos[0]], startY, this.characters[0])
        let object2 = this.add.spine(startingPositionsX[this.indexNos[1]], startY, this.characters[1])
        let object3 = this.add.spine(startingPositionsX[this.indexNos[2]], startY, this.characters[2])

        object1.setInteractive({ draggable: true })
        object2.setInteractive({ draggable: true })
        object3.setInteractive({ draggable: true })
        const object1anims = object1.getAnimationList()
        const object2anims = object2.getAnimationList()
        const object3anims = object3.getAnimationList()



        // Incorrect draggables to be sent back where they started
        object1.startX = startingPositionsX[this.indexNos[0]]
        object1.startY = startY
        object2.startX = startingPositionsX[this.indexNos[1]]
        object2.startY = startY
        object3.startX = startingPositionsX[this.indexNos[2]]
        object3.startY = startY

        // Choose the correct object
        if(this.indexNos[0] == 0) {
            object1.iscorrect = true
            this.correctObject = object1
        }
        if(this.indexNos[0] == 1) {
            object2.iscorrect = true
            this.correctObject = object2
        }
        if(this.indexNos[0] == 2) {
            object3.iscorrect = true
            this.correctObject = object3
        }

        

        //initialise the number correct
        let numcorrect = 0

        // number of possible correct draggables
        let totalnumobjects = 1

        // show the active objectstate of the draggable when dragged
        // this.input.on('gameobjectover', (pointer, gameObject) =>
        // {
        //     if(gameObject.objectState){
        //         gameObject.setTexture(gameObject.objectstate[1]);
        //     }
            

        // });

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
                this.correctObject.setScale(2)
                this.correctObject.play(object3anims[3], false);
                // gameObject.setTexture(gameObject.objectstate[2])
                gameObject.disableInteractive();
                gameObject.x = charEndX
                gameObject.y = charEndY
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