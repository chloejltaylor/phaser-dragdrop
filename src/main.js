// import Phaser from './lib/phaser.js'
import Phaser from './lib/phaser.js'
import Title from './scenes/titlescreen.js'
import Game from './scenes/game.js'
import GameOver from './scenes/gameOver.js'
// import * as SpinePlugin from './plugin/spineplugin.js'

export default new Phaser.Game({
type: Phaser.AUTO,
width: 1400,
height: 900,
scene: [Title, Game, GameOver],
physics: {
        default: 'arcade',
        arcade: {
            gravity: {
            y: 200
            },
            debug: false
        }
    },
scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
},

plugins: {
    scene: [
        { key: 'SpinePlugin', plugin: window.SpinePlugin, mapping: 'spine' }
    ]
}

})