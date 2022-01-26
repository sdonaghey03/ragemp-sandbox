var clothingBrowser;

mp.events.add('client:setClothing', (selectedItem, selectedComponent, selectedTexture, selectedPalette) => {
    mp.events.callRemote("server:setClothing", selectedItem, selectedComponent, selectedTexture, selectedPalette);
})

mp.events.add('client:showClothingMenu', () => {
    clothingBrowser = mp.browsers.new('package://cef/clothing/index.html');
    setTimeout(() => { mp.gui.cursor.show(true, true); }, 500);
});

mp.events.add('client:hideClothingMenu', () => {
    clothingBrowser.destroy();
});

mp.events.add('client:setCurrentClothing', (item, component, texture, palette) => {
    clothingBrowser.execute(`receiveFromServer(${item}, ${component}, ${texture}, ${palette});`);
});