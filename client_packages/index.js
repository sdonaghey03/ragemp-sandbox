require('./login.js');
require('./clothing.js');

mp.events.add('playerReady', () => {
    mp.events.call('client:showLoginScreen');
});

mp.keys.bind(0x71, true, function () {   // F2
    if (mp.gui.cursor.visible) {
        mp.gui.cursor.visible = false;
    } else {
        mp.gui.cursor.visible = true;
    }
});