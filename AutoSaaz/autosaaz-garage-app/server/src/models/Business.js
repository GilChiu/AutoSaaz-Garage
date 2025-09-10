const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Business extends Model {}

Business.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
    field: 'user_id'
  },
  companyName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'company_name'
  },
  tradeLicense: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'trade_license'
  },
  vatCertification: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'vat_certification'
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  zipCode: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'zip_code'
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  website: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'is_verified'
  }
}, {
  sequelize,
  modelName: 'Business',
  tableName: 'businesses',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Business;