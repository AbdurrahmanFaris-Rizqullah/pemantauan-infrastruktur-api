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
const infrastructureController = {

  
  
  async createInfrastructure(req, res, next) {
    try {
      const { name, type, latitude, longitude, description, status } = req.body;

      

       // Cek jika req.body adalah object
       if (typeof req.body !== 'object' || Array.isArray(req.body)) {
        return next({ name: "invalid input format JSON" });
      }

      // Cek input yang kosong
      if (!name || !type || !latitude || !longitude || !status) {
        throw { name: "invalid input" };
      }

      // cek type yg berbeda penulisannya
      if (type !=  "jalan" && type != "trotoar" && type != "lampu jalan" && type != "jembatan" && type != "drainase"){
      throw {  name: "invalid input type" };
      }

      // cek status  yg berbeda penulisannya
      const validStatus = ["baik",  "rusak", "dalam perbaikan"];
      if ( !validStatus.includes(status) ){
      throw { name : "invalid input status"};
      }

      

      const newInfrastructure = await Infrastructure.create({
        name,
        type,
        latitude,
        longitude,
        description,
        status
      });
      
      res.status(201).json(newInfrastructure);
    } catch (err) {
      next(err); // Forward ke error handler middleware
    }
  },

  // Handler untuk mendapatkan semua infrastruktur
  async getAllInfrastructure(req, res, next) {
    try {
      const infrastructures = await Infrastructure.findAll();
      res.status(200).json(infrastructures);
    } catch (err) {
      next(err);
    }
  },

  // Handler untuk mencari infrastruktur berdasarkan nama
  async searchInfrastructureByName(req, res, next) {
    try {
      const { name } = req.query;

      //validasi input: Jika nama tidak diberikan
      if (!name) {
        throw { name: "invalid input name" };
      }

      const infrastructure = await Infrastructure.findAll(
        { where: { 
          name: {
            [Op.like]: `%${name}%`
          } 
        } 
      });

      if (!infrastructure) {
       throw { name : "infrastructure not found" };

      }
      
      if (infrastructure.length === 0) {
       throw { name : "infrastructure not found" };
      }


      res.status(200).json(infrastructure);
    } catch (err) {
      next(err);
    }
  },

  // Handler untuk update infrastruktur berdasarkan nama
  async updateInfrastructureByName(req, res, next) {
    try {
      const { name } = req.params;
      const { type, latitude, longitude, description, status } = req.body;

      // Cek input yang kosong
      if (!type || !latitude || !longitude || !status) {
        throw { name: "invalid input" };
      
      // cek type yg tidak sesuai penulisannya
      }else if (type !=  "jalan" && type != "trotoar" && type != "lampu jalan" && type != "jembatan" && type != "drainase"){
        throw {  name: "invalid input type" };
      }

      // cek status yg tidak sesuai penulisannya
      const validStatus = ["baik",  "rusak", "dalam perbaikan"];
      if ( !validStatus.includes(status) ){
      throw { name : "invalid input status"};
      }

      const updated = await Infrastructure.update(
        { type, latitude, longitude, description, status },
        { where: { name } }
      );

      if (updated[0] === 0) {
        throw { name: "infrastructure not found" };
      }

      res.status(200).json({ message: 'Infrastructure updated' });
    } catch (err) {
      console.log(err)
      next(err);
    }
  },

  // Handler untuk menghapus infrastruktur berdasarkan nama
  async deleteInfrastructureByName(req, res, next) {
    try {
      const { name } = req.params;
      const deleted = await Infrastructure.destroy({ where: { name } });

      if (!deleted) {
        throw {name : "infrastructure not found"};
      }

      res.status(200).json({ message: 'Infrastructure deleted' });
    } catch (err) {
      next(err);
    }
  },

  async getInfrastructureByPolygon(req, res, next) {
    try {
        const { coordinates } = req.body; // Array koordinat: [{latitude, longitude}, {latitude, longitude}, ...]
        console.log("Koordinat input:", coordinates);

        // Validasi input: minimal ada 3 koordinat untuk membentuk poligon
        if (!coordinates || coordinates.length < 3) {
            throw { name: "invalid input coordinate" };
        }

        for (const point of coordinates) {
            if (typeof point.latitude !== 'number' || typeof point.longitude !== 'number') {
                throw { name: "invalid input format" };
            }
        }

        // Dapatkan semua infrastruktur dari database
        const infrastructures = await Infrastructure.findAll({
            attributes: ['latitude', 'longitude'], // Hanya ambil field yang diperlukan
        });

        console.log("Infrastruktur dari database:", infrastructures);

        // Filter infrastruktur yang berada dalam poligon
        const infrastructuresInPolygon = infrastructures.filter(infrastructure => {
            const point = {
                latitude: parseFloat(infrastructure.latitude), // Pastikan data dari database dalam bentuk angka
                longitude: parseFloat(infrastructure.longitude)
            };

            // Cek apakah titik infrastruktur berada di dalam poligon
            return isPointInPolygon(point, coordinates);
        });

        console.log("Infrastruktur dalam poligon:", infrastructuresInPolygon);

        // Jika tidak ada infrastruktur yang ditemukan di dalam poligon
        if (infrastructuresInPolygon.length === 0) {
            throw { name: "infrastructure not found" };
        }

        res.status(200).json(infrastructuresInPolygon);
    } catch (err) {
        console.error(err);
        next(err);
    }
}
}



/**
 * @swagger
 * /infrastructure:
 *   get:
 *     summary: Mendapatkan semua infrastruktur
 *     tags: [Infrastructure]
 *     responses:
 *       200:
 *         description: Berhasil mengambil semua infrastruktur
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   type:
 *                     type: string
 *                   latitude:
 *                     type: string
 *                   longitude:
 *                     type: string
 *                   description:
 *                     type: string
 *                   status:
 *                     type: string
 */



module.exports = infrastructureController;
