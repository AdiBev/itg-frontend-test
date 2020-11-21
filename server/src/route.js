const express = require("express");
const router = express.Router();

router.get('/vehicle', (req, res) => {
    const vehicles = require('../server_api/vehicles');
    res.json(vehicles);
});

router.get('/vehicle/:id', (req, res) => {
    const vehicle = require(`../server_api/vehicle_${req.params.id}`);
    res.json(vehicle);
});

module.exports = router;

