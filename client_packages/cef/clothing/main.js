const items = [
    { key: 1, value: 'Masks' },
    { key: 2, value: 'Hair Styles' },
    { key: 3, value: 'Torsos' },
    { key: 4, value: 'Legs' },
    { key: 5, value: 'Bags and Parachutes' },
    { key: 6, value: 'Shoes' },
    { key: 7, value: 'Accessories' },
    { key: 8, value: 'Undershirts' },
    { key: 9, value: 'Body Armors' },
    { key: 10, value: 'Decals' },
    { key: 11, value: 'Tops' }
]

let selectedClothing = [
    {
        itemId: 0,
        values: {
            component: 0,
            texture: 0,
            palette: 0
        }
    },
    {
        itemId: 1,
        values: {
            component: 0,
            texture: 0,
            palette: 0
        }
    },
    {
        itemId: 2,
        values: {
            component: 0,
            texture: 0,
            palette: 0
        }
    },
    {
        itemId: 3,
        values: {
            component: 0,
            texture: 0,
            palette: 0
        }
    },
    {
        itemId: 4,
        values: {
            component: 0,
            texture: 0,
            palette: 0
        }
    },
    {
        itemId: 5,
        values: {
            component: 0,
            texture: 0,
            palette: 0
        }
    },
    {
        itemId: 6,
        values: {
            component: 0,
            texture: 0,
            palette: 0
        }
    },
    {
        itemId: 7,
        values: {
            component: 0,
            texture: 0,
            palette: 0
        }
    },
    {
        itemId: 8,
        values: {
            component: 0,
            texture: 0,
            palette: 0
        }
    },
    {
        itemId: 9,
        values: {
            component: 0,
            texture: 0,
            palette: 0
        }
    },
    {
        itemId: 10,
        values: {
            component: 0,
            texture: 0,
            palette: 0
        }
    },
    {
        itemId: 11,
        values: {
            component: 0,
            texture: 0,
            palette: 0
        }
    }
]

var selectedItem = 1;
var currentSelectedIndex = 0;

function selectItems() {
    removeButtonClasses();
    $('#itemBtn').addClass('btn-primary');
    $('#componentBtn').addClass('btn-secondary');
    $('#textureBtn').addClass('btn-secondary');
    $('#paletteBtn').addClass('btn-secondary');
    currentSelectedIndex = 0;
}

function selectComponents() {
    removeButtonClasses();
    $('#itemBtn').addClass('btn-secondary');
    $('#componentBtn').addClass('btn-primary');
    $('#textureBtn').addClass('btn-secondary');
    $('#paletteBtn').addClass('btn-secondary');
    currentSelectedIndex = 1;
}

function selectTextures() {
    removeButtonClasses();
    $('#itemBtn').addClass('btn-secondary');
    $('#componentBtn').addClass('btn-secondary');
    $('#textureBtn').addClass('btn-primary');
    $('#paletteBtn').addClass('btn-secondary');
    currentSelectedIndex = 2;
}

function selectPalettes() {
    removeButtonClasses();
    $('#itemBtn').addClass('btn-secondary');
    $('#componentBtn').addClass('btn-secondary');
    $('#textureBtn').addClass('btn-secondary');
    $('#paletteBtn').addClass('btn-primary');
    currentSelectedIndex = 3;
}

function removeButtonClasses() {
    $('#itemBtn').removeClass('btn-secondary');
    $('#itemBtn').removeClass('btn-primary');
    $('#componentBtn').removeClass('btn-secondary');
    $('#componentBtn').removeClass('btn-primary');
    $('#textureBtn').removeClass('btn-secondary');
    $('#textureBtn').removeClass('btn-primary');
    $('#paletteBtn').removeClass('btn-secondary');
    $('#paletteBtn').removeClass('btn-primary');
}

function next() {
    switch (currentSelectedIndex) {
        case 0: // Items
            if (selectedItem < 11) {
                selectedItem++;
            }
            break;
        case 1: // 
            selectedClothing.filter(clothing => clothing.itemId === selectedItem)[0].values.component++;
            break;
        case 2: // 
            selectedClothing.filter(clothing => clothing.itemId === selectedItem)[0].values.texture++;
            break;
        case 3: // 
            selectedClothing.filter(clothing => clothing.itemId === selectedItem)[0].values.palette++;
            break;
        default:
            break;
    }
    let currentItem = selectedClothing.filter(clothing => clothing.itemId === selectedItem)[0];
    updateUIValues(currentItem);
    mp.events.call('client:setClothing', selectedItem, currentItem.values.component, currentItem.values.texture, currentItem.values.palette);
}

function previous() {
    switch (currentSelectedIndex) {
        case 0: // Items
            if (selectedItem > 1) {
                selectedItem--;
            }
            break;
        case 1: // 
            if (selectedClothing.filter(clothing => clothing.itemId === selectedItem)[0].values.component > 0) {
                selectedClothing.filter(clothing => clothing.itemId === selectedItem)[0].values.component--;
            }
            break;
        case 2: // 
            if (selectedClothing.filter(clothing => clothing.itemId === selectedItem)[0].values.texture > 0) {
                selectedClothing.filter(clothing => clothing.itemId === selectedItem)[0].values.texture--;
            }
            break;
        case 3: // 
            if (selectedClothing.filter(clothing => clothing.itemId === selectedItem)[0].values.palette > 0) {
                selectedClothing.filter(clothing => clothing.itemId === selectedItem)[0].values.palette--;
            }
            break;
        default:
            break;
    }
    let currentItem = selectedClothing.filter(clothing => clothing.itemId === selectedItem)[0];
    updateUIValues(currentItem);
    mp.events.call('client:setClothing', selectedItem, currentItem.values.component, currentItem.values.texture, currentItem.values.palette);
}

function updateUIValues(currentItem) {
    $('#current-item').text(items.filter(item => item.key === selectedItem)[0].value);
    $('#current-component').text(currentItem.values.component);
    $('#current-texture').text(currentItem.values.texture);
    $('#current-palette').text(currentItem.values.palette);
}

function receiveFromServer(item, component, texture, palette) {
    let itemToUpdate = selectedClothing.filter(clothing => clothing.itemId === item)[0];
    itemToUpdate.values.component = component;
    itemToUpdate.values.texture = texture;
    itemToUpdate.values.palette = palette;
    let currentItem = selectedClothing.filter(clothing => clothing.itemId === selectedItem)[0];
    updateUIValues(currentItem);
}

document.addEventListener('keydown', function (event) {
    switch (event.key) {
        case "ArrowLeft":
            previous();
            break;
        case "ArrowRight":
            next();
            break;
    }
});