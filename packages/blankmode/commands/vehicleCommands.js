const errorHandler = require('../utils/errorHandler');
const vehicleManager = require('../managers/vehicles/manage');

//  Called when a player types the /vspawn command
mp.events.addCommand("vspawn", async (player, args, vehicleName, color1, color2) => {
    await spawnVehicleCommand(player, vehicleName, color1, color2);
});

//  Called when a player types the /vs command
mp.events.addCommand("vs", async (player, args, vehicleName, color1, color2) => {
    await spawnVehicleCommand(player, vehicleName, color1, color2);
});

//  Called when a player types the /vcolor command
mp.events.addCommand("vcolour", async (player, args, color1, color2) => {
    await colourCommand(player, color1, color2);
});

//  Called when a player types the /vc command
mp.events.addCommand("vc", async (player, args, color1, color2) => {
    await colourCommand(player, color1, color2);
});

//  Called when a player types the /assignfactionvehicle command
mp.events.addCommand("assignfactionvehicle", async (player) => {
    await assignFactionVehicleCommand(player);
});

//  Called when a player types the /fl command
mp.events.addCommand("fl", async (player) => {
    await openFactionMenu(player);
});

async function spawnVehicleCommand(player, vehicleName, color1, color2) {
    try {
        if (!vehicleName || vehicleName.length >= 3) {
            const vehicle = await vehicleManager.spawnVehicle(player, vehicleName, color1, color2);
            if (vehicle !== undefined) {
                console.log(`Model hash: ${vehicle.model}`);
                const vehicleName = await vehicleManager.getVehicleNameFromModel(vehicle.model);
                console.log(`${player.name} has spawned a new vehicle: ${vehicleName}, Color 1: ${color1}, Color 2: ${color2}.`);
                player.notify(`You have successfully spawned a new vehicle: ${vehicleName}, Color 1: ${color1}, Color 2: ${color2}.`);
            } else {
                player.outputChatBox(`Vehicle not found.`);
            }
        } else {
            player.outputChatBox(`Vehicle name must be greater than 3 characters in length.`);
        }
    } catch (e) { errorHandler.handle(e) };
}

async function colourCommand(player, color1, color2) {
    try {
        const vehicle = player.vehicle;
        if (!vehicle) {
            player.outputChatBox(`You must be in a vehicle to use this command.`);
            return;
        }

        const res = await vehicleManager.colorVehicle(vehicle, color1, color2);
        if (res) {
            const vehicleName = await vehicleManager.getVehicleNameFromModel(vehicle.model);

            console.log(`${player.name} has coloured their vehicle: ${vehicleName}, Color 1: ${color1}, Color 2: ${color2}.`);
            player.notify(`You have successfully coloured your ${vehicleName}: Color 1: ${color1}, Color 2: ${color2}.`);
        } else {
            player.outputChatBox(`Please specify a correct primary and secondary colour.`);
        }
    } catch (e) { errorHandler.handle(e) };
}

async function assignFactionVehicleCommand(player) {
    try {
        const vehicle = player.vehicle;
        if (!vehicle) {
            player.outputChatBox(`You must be in a vehicle to use this command.`);
            return;
        }

        await vehicleManager.assignAsFactionVehicle(vehicle);
        const vehicleName = await vehicleManager.getVehicleNameFromModel(vehicle.model);
        console.log(`${player.name} has made their ${vehicleName} a faction vehicle.`);
        player.notify(`You have successfully made your ${vehicleName} a faction vehicle.`);
    } catch (e) { errorHandler.handle(e) };
}

async function openFactionMenu(player) {
    try {
        const isVehicleNearby = await vehicleManager.isVehicleNearby(player);
        if (!isVehicleNearby) {
            player.outputChatBox(`You must be close to a faction locker or vehicle.`);
            return;
        }

        const nearestVehicle = await vehicleManager.getNearestVehicle(player);
        const isFactionVehicle = await vehicleManager.isVehicleAFactionVehicle(nearestVehicle);
        if (isFactionVehicle) {
            const vehicleName = await vehicleManager.getVehicleNameFromModel(nearestVehicle.model);
            console.log(`${player.name} has opened their faction locker from their personal ${vehicleName}.`);
            player.notify(`You can successfully open your faction locker from your personal ${vehicleName}.`);
        } else {
            player.outputChatBox(`You must be close to a faction locker or vehicle.`);
        }
    } catch (e) { errorHandler.handle(e) };
}