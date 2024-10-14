// infrastructureController.js

const { Infrastructure } = require('../models');
const { Op } = require('sequelize');

// Fungsi untuk mengecek apakah titik ada di dalam poligon
function isPointInPolygon(point, polygon) {
    const { latitude, longitude } = point;
    let inside = false;

    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const xi = polygon[i].latitude, yi = polygon[i].longitude;
        const xj = polygon[j].latitude, yj = polygon[j].longitude;

        const intersect = ((yi > longitude) !== (yj > longitude)) &&
            (latitude < (xj - xi) * (longitude - yi) / (yj - yi) + xi);

        if (intersect) inside = !inside;
    }

    return inside;
}

// Controller untuk mendapatkan infrastruktur dalam area poligon
const getInfrastructureByPolygon = async (req, res, next) => {
    try {
        const { polygon } = req.body; // Poligon dikirim sebagai array dari titik [latitude, longitude]

        if (!polygon || polygon.length < 3) {
            return res.status(400).json({ message: "Poligon harus memiliki minimal 3 titik" });
        }

        // Ambil semua data infrastruktur
        const infrastructures = await Infrastructure.findAll();

        // Filter data infrastruktur yang berada di dalam poligon menggunakan isPointInPolygon
        const infrastructuresInPolygon = infrastructures.filter(infra => 
            isPointInPolygon({ latitude: infra.latitude, longitude: infra.longitude }, polygon)
        );

        if (infrastructuresInPolygon.length === 0) {
            return res.status(404).json({ message: "Tidak ada infrastruktur dalam area poligon" });
        }

        res.status(200).json(infrastructuresInPolygon);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getInfrastructureByPolygon,
};


// Menambahkan Infrastruktur Baru (POST)
exports.createInfrastructure = async (req, res, next) => {
    try {
        const newInfrastructure = await Infrastructure.create(req.body);
        res.status(201).json(newInfrastructure);
    } catch (err) {
        console.log(err);
        next(err);
    }
};

// Mengambil Semua Infrastruktur (GET)
exports.getAllInfrastructure = async (req, res, next) => {
  try {
    const infrastructures = await Infrastructure.findAll();
    res.status(200).json(infrastructures);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

// Mengambil Infrastruktur Berdasarkan Nama (GET)
exports.searchInfrastructureByName = async (req, res, next) => {
  try {
    const { name } = req.query;
    const infrastructures = await Infrastructure.findAll({ where: { name } });
    res.status(200).json(infrastructures);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

// Memperbarui Infrastruktur Berdasarkan Nama (PUT)
exports.updateInfrastructureByName = async (req, res, next) => {
  try {
    const { name } = req.params;
    const [updated] = await Infrastructure.update(req.body, { where: { name } });
    if (updated) {
      const updatedInfrastructure = await Infrastructure.findOne({ where: { name } });
      res.status(200).json(updatedInfrastructure);
    } else {
      res.status(404).json({ err: 'Infrastructure not found' });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};

// Menghapus Infrastruktur Berdasarkan Nama (DELETE)
exports.deleteInfrastructureByName = async (req, res, next) => {
  try {
    const { name } = req.params;
    const deleted = await Infrastructure.destroy({ where: { name } });
    if (deleted) {
      res.status(200).json({ message: `Infrastructure ${name} deleted successfully` });
    } else {
        throw {name: "NotFoundinfrastructure  "};
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};


module.exports = infrastructureController;
