const vehicleHashes = require('../../data/vehicles');
const vehicleUtil = require('../../utils/vehicles');

const CUSTOM_PROPERTY_FACTION_VEHICLE = 'isFactionVehicle';

async function spawnVehicle(player, vehicleName, color1, color2) {
    try {
        const vehicle = mp.vehicles.new(mp.joaat(vehicleName), player.position,
            {
                heading: player.heading,
                locked: false,
                engine: true
            }
        );
        if (vehicle) {
            vehicle.spawn(player.position, player.heading);
            vehicle.setColor(parseInt(color1), parseInt(color2));

            player.putIntoVehicle(vehicle, 0);
            return vehicle;
        } else {
            return undefined;
        }
    } catch (e) { errorHandler.handle(e) }
}

async function colorVehicle(vehicle, color1, color2) {
    try {
        vehicle.setColor(parseInt(color1), parseInt(color2));
        return true;
    } catch (e) { errorHandler.handle(e) }
}

async function getVehicleNameFromModel(model) {
    Object.filter = (vehicleHashes, predicate) =>
        Object.keys(vehicleHashes)
            .filter(key => predicate(vehicleHashes[key]))
            .reduce((res, key) => (res[key] = vehicleHashes[key], res), {});

    const result = Object.filter(vehicleHashes, hash => hash === model);
    return Object.keys(result)[0];
}

async function assignAsFactionVehicle(vehicle) {
    return setVehicleCustomProperty(vehicle, CUSTOM_PROPERTY_FACTION_VEHICLE, true);
}

async function isVehicleNearby(player) {
    return vehicleUtil.getNearestVehicle(player, 10.0) !== null;
}

async function getNearestVehicle(player) {
    return vehicleUtil.getNearestVehicle(player, 10.0);
}

async function isVehicleAFactionVehicle(vehicle) {
    return getVehicleCustomProperty(vehicle, CUSTOM_PROPERTY_FACTION_VEHICLE);
}

function getVehicleCustomProperty(vehicle, propertyKey) {
    return vehicle.getVariable(propertyKey);
}

function setVehicleCustomProperty(vehicle, propertyKey, value) {
    return vehicle.setVariable(propertyKey, value);
}

module.exports = {
    spawnVehicle,
    colorVehicle,
    assignAsFactionVehicle,
    isVehicleAFactionVehicle,
    isVehicleNearby,
    getNearestVehicle,
    getVehicleNameFromModel
}