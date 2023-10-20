module.exports = (sequelize, DataTypes) => {
    const ImgTest = sequelize.define("testImg", {
        imgname: {
            type: DataTypes.STRING(100),
        }
    }, { timestamps: false })
    return ImgTest
}