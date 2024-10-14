'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Infrastructure extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Infrastructure.init({
    name: {
      type: DataTypes.STRING,
      allowNull : false,
      unique: true
    },
    type: {
      type: DataTypes.ENUM('jalan', 'trotoar', 'lampu jalan', 'jembatan', 'drainase'),
      allowNull : false,

    },
  latitude: {
      type: DataTypes.DECIMAL(9, 6),
      allowNull: false,
    },
    longitude: {
      type: DataTypes.DECIMAL(9, 6),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    status: {
      type: DataTypes.ENUM('baik', 'rusak', 'dalam perbaikan'), // ENUM untuk status
      allowNull: false,
    }
  }, {
    tableName: 'infrastructure',
    timestamps: true, // ini akan menambahkan kolom createdAt dan updatedAt
  });
}

  return Infrastructure;