const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');
class User extends Model {
    checkPassword(loginPw) {
      return bcrypt.compareSync(loginPw, this.password);
    }
  }

  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [6],
        },
      },
      name: {
        type: DataTypes.STRING,
      
      },
      address: {
        type: DataTypes.STRING,
      
      },
// for time managment reason i'm leaving this as string instead of date so I don't have to convert around 
      dob: {
        type: DataTypes.STRING,
      
      },
    
    },
    {
      hooks: {
        async beforeCreate(newUserData) {
          newUserData.password = await bcrypt.hash(newUserData.password, 10);
          return newUserData;
        },
      },
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'user',
    }
  );
  
  module.exports = User;