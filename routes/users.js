var express = require('express');
const UserSchema = require('../models/userSchema');
var router = express.Router();
const client = require("../config/cache")

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get("/create" , (req,res) =>{
  res.render("createuser")
})

router.post("/create", async(req,res) =>{
  try {
    const newexpense = await new UserSchema(req.body)
    await newexpense.save();
    res.redirect("/")
} catch (error) {
    next(error)
}
})


router.get("/show", async (req, res, next) => {

  const isCachedData = await client.get("userData")
  let users = null;
  if(!isCachedData){
    users = await UserSchema.find();
    await client.set('userData',JSON.stringify(users),'EX',60);
}
res.render("show", { user: users || JSON.parse(isCachedData)  });
});

  

router.get("/delete/:id", async (req, res) => {
  try {
      await UserSchema.findByIdAndDelete(req.params.id);
      res.redirect("/");
  } catch (error) {
      res.status(500).send(error.message);
  }
});

router.get("/update/:id", async (req, res) => {
  try {
      const users = await UserSchema.findById(req.params.id);
      res.render("updateuser", { user: users });
  } catch (error) {
      res.status(500).send(error.message);
  }
});

router.post("/update/:id", async (req, res) => {
  try {
      await user.findByIdAndUpdate(req.params.id, req.body);
      res.redirect("/");
  } catch (error) {
      res.status(500).send(error.message);
  }
});



module.exports = router;
