module.exports = function(sequalize, DataTypes){
  var Album = sequalize.define("Album", {
    albumName: DataTypes.STRING,
    artistName: DataTypes.STRING,
    spotifyLink: DataTypes.STRING,
    overallRating: DataTypes.INTEGER,
    dynamic: DataTypes.FLOAT,
    unique: DataTypes.FLOAT,
    production: DataTypes.FLOAT,
    musicianship: DataTypes.FLOAT,
    totalScore: DataTypes.INTEGER
  })
  return Album;
}
