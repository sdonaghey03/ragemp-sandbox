function getNearestVehicle(player, range) {
    let dist = range;
    let currentTarget = null;
    mp.vehicles.forEachInRange(player.position, range,
        (_vehicle) => {
            let _dist = _vehicle.dist(player.position);
            if (_dist < dist) {
                currentTarget = _vehicle;
                dist = _dist;
            }
        }
    );
    return currentTarget;
}

module.exports = {
    getNearestVehicle
}