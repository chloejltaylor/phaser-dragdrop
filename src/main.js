import Phaser from './lib/phaser.js'
import Title from './scenes/titlescreen.js'

import level1 from './scenes/level1.js'
import level2 from './scenes/level2.js'
import level3 from './scenes/level3.js'

import introBonus from './scenes/introBonus.js'
import bonus from './scenes/bonus.js'
import congratulations from './scenes/congratulations.js'

import UIScene from './scenes/ui.js'
import backtomenu from './scenes/backtomenu.js'
import preloader from './scenes/preloader.js'
import music from './scenes/music.js'
import pause from './scenes/pause.js'

export default new Phaser.Game({
type: Phaser.AUTO,
width: 1400,
height: 900,
backgroundColor: "#552211",
scene: [
    Title, preloader, music,  
    level1, level2, level3,
    congratulations, introBonus, bonus, pause, UIScene, backtomenu],
physics: {
        default: 'arcade',
        arcade: {
            gravity: {
            y: 0
            },
            debug: false,
            
        }
    },
scale: {
        // mode: Phaser.Scale.FIT,
        mode: Phaser.Scale.RESIZE,
        mode: Phaser.Scale.CENTER_VERTICALLY
        // autoCenter: Phaser.Scale.CENTER_BOTH
},

plugins: {
    scene: [
        { key: 'SpinePlugin', plugin: window.SpinePlugin, mapping: 'spine' }
    ]
}




})