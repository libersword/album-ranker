module.exports = function(sequalize, DataTypes){
  var Album = sequalize.define("Album", {
    artistName: DataTypes.STRING,
    albumName: DataTypes.STRING,
    overallRating: DataTypes.INTEGER,
    dynamicRating: DataTypes.INTEGER,
    uniqueRating: DataTypes.INTEGER,
    productionRating: DataTypes.INTEGER,
    musicianshipRating: DataTypes.INTEGER,
    dynamic: DataTypes.FLOAT,
    unique: DataTypes.FLOAT,
    production: DataTypes.FLOAT,
    musicianship: DataTypes.FLOAT,
    totalScore: DataTypes.INTEGER
  })
  return Album;
}
