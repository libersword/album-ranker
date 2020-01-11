module.exports = function(sequelize, DataTypes) {
  var Album = sequelize.define("Album", {
    artistName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    albumName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    albumArt: DataTypes.TEXT,
    overallRating: DataTypes.INTEGER,
    dynamicRating: DataTypes.INTEGER,
    uniqueRating: DataTypes.INTEGER,
    productionRating: DataTypes.INTEGER,
    musicianshipRating: DataTypes.INTEGER,
    dynamic: DataTypes.FLOAT,
    unique: DataTypes.FLOAT,
    production: DataTypes.FLOAT,
    musicianship: DataTypes.FLOAT,
    totalScore: DataTypes.INTEGER,
    notes: DataTypes.TEXT,
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  })

  return Album;
};
