import Phaser from './lib/phaser.js'
import Title from './scenes/titlescreen.js'
import Game from './scenes/game.js'
import Level1pm from './scenes/level1pm.js'
import Level1ff from './scenes/level1ff.js'
import Level1po from './scenes/level1po.js'
import introBonus from './scenes/introBonus.js'
import bonus from './scenes/bonus.js'
import congratulations from './scenes/congratulations.js'

export default new Phaser.Game({
type: Phaser.AUTO,
width: 1400,
height: 900,
scene: [Title, Game, Level1pm, Level1ff, Level1po, congratulations, introBonus, bonus],
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