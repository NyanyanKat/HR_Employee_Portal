const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require ("../model/User");

const {body, validationResult} = require("express-validator");

// TODO: HR token
// TODO: auth_session with register and login route??


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
            console.log("Successfully registered. Please log in.");
            resp.status(201);
            resp.redirect("/login");
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