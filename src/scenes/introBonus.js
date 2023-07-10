import Phaser from '../lib/phaser.js'
export default class introBonus extends Phaser.Scene

{
constructor()
{
super('intro-bonus')
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

    this.add.text(width * 0.5, height * 0.3, 'Now for a bonus round!', {
    fontSize: 48}).setOrigin(0.5)

    this.input.keyboard.once('keydown-SPACE', () => {this.scene.start('bonus')})

    const play = this.add.image(width * 0.5, height * 0.7, 'play').setInteractive()

    play.once('pointerdown', () => {this.scene.start('bonus')});

}

}