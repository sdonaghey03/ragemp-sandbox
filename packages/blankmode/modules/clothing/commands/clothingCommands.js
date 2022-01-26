const VARIABLE_CLOTHING_MENU = 'CLOTHING_MENU';

//  Called when a player types the /clothing command
mp.events.addCommand("clothing", async (player) => {
    try {
        if (!player.getVariable(VARIABLE_CLOTHING_MENU)) {
            player.call('client:showClothingMenu');
            player.setVariable(VARIABLE_CLOTHING_MENU, true);
            sendAllCurrentClothingToClient(player);
        } else {
            player.call('client:hideClothingMenu');
            player.setVariable(VARIABLE_CLOTHING_MENU, false);
        }
    } catch (e) { errorHandler.handle(e) };
});

function sendAllCurrentClothingToClient(player) {
    setTimeout(() => {
        for (let i = 0; i < 12; i++) {
            let clothes = player.getClothes(i);
            player.call('client:setCurrentClothing', [i, clothes.drawable !== 65535 ? clothes.drawable : 0, clothes.texture, clothes.palette]);
        }
    }, 500);
}