const UserModel = require("../Model/userModel");
const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000);
function deleteUnverified() {
  UserModel.deleteMany({
    emailVerified: false,
    createdAt: { $lt: fifteenMinutesAgo },
  }).exec();
}
module.exports = {
  runScript: function () {
    deleteUnverified();
    setInterval(deleteUnverified, 15 * 60 * 1000);
  },
};
