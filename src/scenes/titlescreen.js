import Phaser from '../lib/phaser.js'
export default class Title extends Phaser.Scene

{

test = 'test'

constructor()
{
super('title')
}


preload()
{
    this.load.image('play', './src/assets/Buttons/play_big_idle.png')
    this.load.image('background', './src/assets/Game/grid-bg.png')
}

create()
{
    const width = this.scale.width
    const height = this.scale.height

    console.log(this.test)

    this.add.image(700, 450, 'background');

    this.add.text(width * 0.5, height * 0.3, 'Drag and Drop', {
    fontSize: 48}).setOrigin(0.5)

    this.input.keyboard.once('keydown-SPACE', () => {this.scene.start('level1ff')})

    const start = this.add.image(width * 0.5, height * 0.7, 'play').setScale(1.5).setInteractive()

    let games = ['level1pm', 'level1ff', 'level1po']
    

    function shuffle(array) {
        array.sort(() => Math.random() - 0.5);
      }
    shuffle(games)
    console.log(games)
    start.once('pointerdown', () => {this.scene.start(games[0])});

}

}