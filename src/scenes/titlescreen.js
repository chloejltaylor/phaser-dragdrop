import Phaser from '../lib/phaser.js'
export default class Title extends Phaser.Scene

{
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

    this.add.image(700, 450, 'background');

    this.add.text(width * 0.5, height * 0.3, 'Drag and Drop', {
    fontSize: 48}).setOrigin(0.5)

    this.input.keyboard.once('keydown-SPACE', () => {this.scene.start('game')})

    const start = this.add.image(width * 0.5, height * 0.7, 'play').setScale(1.5).setInteractive()

    start.once('pointerdown', () => {this.scene.start('game')});

}

}