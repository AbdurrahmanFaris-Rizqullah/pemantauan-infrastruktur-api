const { Infrastructure } = require('../models');

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
      res.status(404).json({ err: 'Infrastructure not found' });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};
