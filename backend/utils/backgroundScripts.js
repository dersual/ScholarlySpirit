const UserModel = require('../Model/userModel');
const SchoolModel = require('../Model/schoolModel');
const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000);
async function deleteUnverified() {
  await UserModel.deleteMany({
    emailVerified: false,
    createdAt: { $lt: fifteenMinutesAgo },
  }).exec();
}
async function getEmptySchools() {
  try {
    const idsOfEmptySchools = [];
    const schools = await SchoolModel.find({}).exec();
    for (const school of schools) {
      const checkForEmptySchool = await UserModel.find({
        schoolCode: school.schoolCode,
      }).exec();
      if (checkForEmptySchool.length === 0) {   
        console.log(checkForEmptySchool)
        console.log(school.schoolCode)
        idsOfEmptySchools.push(school.schoolCode);
      }
    }
    return idsOfEmptySchools;
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function deleteEmptySchools() {
  try {
    const idsOfEmptySchools = await getEmptySchools();
    for (const id of idsOfEmptySchools) {
      console.log(id);
    }
  } catch (error) {
    console.error(error);
  } 
}
module.exports = {
  runScript: async function () {
    await deleteUnverified(); 
    await deleteEmptySchools(); 
    const myPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 60 * 15 * 1000);
    }); 
    myPromise.then(deleteUnverified) 
    .then(deleteEmptySchools).catch(err => { 
      console.error(err);
    })
    
  },
};
