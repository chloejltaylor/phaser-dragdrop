import Phaser from '../lib/phaser.js'
export default class GameOver extends Phaser.Scene

{
constructor()
{
super('congratulations')
}


preload()
{
    this.scene.run('ui-scene')
    this.load.image('playagain', './src/assets/Buttons/playagain.png')
    this.load.image('background', './src/assets/Game/grid-bg.png')
}

create()
{
    const width = this.scale.width
    const height = this.scale.height

    this.games = ['level1pm', 'level1ff', 'level1po']
    this.level1games = ['level1pm', 'level1ff', 'level1po']
    this.level2games = ['level2pm', 'level2ff', 'level2po']
    this.level3games = ['level3pm', 'level3ff', 'level3po']
    this.bonusLevels = ['bonus', 'bonus', 'bonus']
    this.levels = [0,1,2]
    function shuffle(array) {
        array.sort(() => Math.random() - 0.5);
      }
    shuffle(this.levels)
    console.log("level order: "+ this.levels)


    this.add.image(700, 450, 'background');

    this.add.text(width * 0.5, height * 0.3, 'You Win!!', {
    fontSize: 48}).setOrigin(0.5)

    this.input.keyboard.once('keydown-SPACE', () => {this.scene.start('level1ff')})

    const playagain = this.add.image(width * 0.5, height * 0.7, 'playagain').setInteractive()

    playagain.once('pointerdown', () => {


        this.scene.stop()

        this.scene.start('level1',  {
            levels: this.levels,
            currentSublevel: 0
        })
    
    
    
    });

}

}