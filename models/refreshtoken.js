/* eslint-disable import/no-dynamic-require */
const config = require(`${__dirname}/../config/auth.config`);
const { v4: uuidv4 } = require('uuid');

const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class RefreshToken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      RefreshToken.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id' });
    }
  }
  RefreshToken.init({
    refreshToken: DataTypes.STRING,
    expiryDate: DataTypes.DATE,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'RefreshToken',
  });

  RefreshToken.createToken = async function (user) {
    const expiredAt = new Date();

    expiredAt.setSeconds(expiredAt.getSeconds() + config.jwtRefreshExpiration);

    // eslint-disable-next-line no-underscore-dangle
    const _token = uuidv4();

    const refreshToken = await this.create({
      refreshToken: _token,
      userId: user.id,
      expiryDate: expiredAt.getTime(),
    });

    return refreshToken.refreshToken;
  };

  RefreshToken.verifyExpiration = (token) => token.expiryDate.getTime() < new Date().getTime();

  return RefreshToken;
};
