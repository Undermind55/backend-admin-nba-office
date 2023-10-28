var jwt = require("jsonwebtoken");
var Checkin = require("../models/checkin.model");
// var bcrypt = require("bcrypt");
module.exports.Getcheckin = async (req, res) => {
  
    try {
      const permission = ["owner", "admin", "manager", "employee"];
  
      if (!permission.includes(req.user.level)) {
        return res.status(403).send({message: "Permission denied"});
      }
  
      const checkin = await Checkin.find();
      this.mockup_data = checkin;
    //   const checkin = [1,2,3,4,5,6,7];
      return res.status(200).send({message: "Get user successfully", data: checkin});
    } catch (error) {
      console.error(error);
      return res.status(500).send({message: "Internal Server Error"});
    }
  };

module.exports.Create = async (req, res) => {
    try {
        const permission = ["owner", "admin", "manager"];

        if (!permission.includes(req.user.level)) {
            return res.status(403).send({message: "Permission denied"});
          }
          // const now = new Date()
          // const currentUser = await User.findById(req.user.user_id);
          // const chk_chk = await Checkin.find({userId:"1"});
          // console.log(chk_chk);
          // console.log("This ID >>>",req.user.iat);
          // const data_time = req.user.iat;
          // console.log("Name :",Checkin.timeChackin);
          console.log(req.get.checkin);
        // save checkin
        
        let checkinData = {
            // name: req.body.name,
            // status: req.body.status,
            // timeCheckin: req.body.timeCheckin,
            // createAt: req.body.timeCheckin,
            // updateAt: "-"
            
            name: req.body.name,
            status: req.body.status == 1 ? "เข้างาน" : "ยังไม่เข้างาน",
            timeChackin: Date.now(),
            createdAt: Date.now(),
            updatedAt: Date.now(),
            userId: req.body.userId,
        };
        console.log(checkinData)

        const tcheckin = new Checkin(checkinData);
        const new_tcheckin = await tcheckin.save();

        return res.status(200).send({message: "Checkin saved successfully", data: {new_tcheckin}})
    }catch (error){
        console.error(error);
        return res.status(500).send({message: "Internal server error", error: error.message});
    }
};


// Update Data Checkin //
module.exports.Update = async (req, res) => {
  try{
    const permission = ["owner", "admin", "manager"];

    if (!permission.includes(req.user.level)) {
        return res.status(403).send({message: "Permission denied"});
      }
      const checkin = await Checkin.findById();
      if (!checkin) {
        return res.status(400).send({message: "User not found"});
      }
      
      const updateData = {
        name: req.body.name ? req.body.name : user.name,
        status: req.body.status ? req.body.status : checkin.status,
        timeChackin: req.body.timeChackin ? "-" : " ",
        createAt: req.body.createAt ? req.body.createAt : " ",
        updateAt: req.body.updateAt ? req.body.updateAt: checkin.update
      };



      const result = await Checkin.findByIdAndUpdate(checkin._id, updateData, {
        returnDocument: "after",
      });

      return res.status(200).send({message: "Updated successfully", data: result});
  }catch(error){
    console.log.error(error);
    return res
    .status(500)
    .send({message: "Internal server error", error: error.message})
  }
};

// Delete Checkin Data
module.exports.Delete = async (req, res) => {
  try {
    const permission = ["owner", "admin", "manager"];

    if (!permission.includes(req.user.level)) {
      return res.status(403).send({message: "Permission denied"});
    }

    const result = await Checkin.deleteOne(req.params.id);
    return res.status(200).send(result);
    }catch(error){
    return res.status(500).send({message: "Internal server error", error: error.message})
    }
}





// var test =  req.body.name != "" ? req.body.name : "Not";

// if(req.body.name != ""){
//   test = req.body.name
// }else{
//   test = "Not"
// }