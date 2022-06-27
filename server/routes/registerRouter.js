const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require ("../model/User");
const jwt = require('jsonwebtoken')


const {body, validationResult} = require("express-validator");

// Danling - Registration Token
router.get('/register', async(req,resp)=>{
    try {
        const hr_token = await jwt.sign({}, process.env.JWT_KEY)
        resp.status(200).send({token:hr_token})        
    } catch (error) {
        resp.status(500).send("Failed to generate token",error)
    }
})

// Jimmy - Registration 
router.post("/register", body('email').isEmail(), async (req, resp) => {
    const errors = validationResult(req);

   // username and email should be case insensitive when checking
   req.body.username = req.body.username.toLowerCase();
   req.body.email = req.body.email.toLowerCase();

    try {
        const {username, email, password} = req.body;
        const checkuser = await User.findOne({username}) 
        const checkemail = await User.findOne({email}) 
        if (!username || !password || !email) {
            resp.send("Missing one field");
        }  
        else if (!errors.isEmpty() && errors.errors[0].param === 'email') {
            resp.send('Invalid email format. Please try again.');
        }
        else if (checkuser || checkemail) {
            resp.send("User already exists");
        }
        else {
            await User.create(req.body);
            resp.status(201).send('Successfully registered. Please log in.');
        }
    } catch(e) {
        console.log(e);
        resp.status(400).send(e);
    }
});


// router.get("/delete", async (req, resp) => {
//     await User.deleteMany();
//     resp.send("Database deleted");
// })


module.exports = router;