//  Called when a player changes their clothing through the UI
mp.events.add('server:setClothing', async (player, selectedItem, selectedComponent, selectedTexture, selectedPalette) => {
    try {
        player.setClothes(selectedItem, selectedComponent, selectedTexture, selectedPalette);
    } catch(e) { errorHandler(e) };  
});