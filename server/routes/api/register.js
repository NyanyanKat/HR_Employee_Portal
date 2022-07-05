const router = require("express").Router();
const User = require ("../../model/User");
const jwt = require('jsonwebtoken')
const { body, validationResult } = require("express-validator");


// Danling - Registration Token
router.get('/', async (req, resp) => {
    try {
        const hr_token = await jwt.sign({}, process.env.JWT_KEY,{expiresIn: '3h'})
        resp.status(200).send({ token: hr_token })
    } catch (error) {
        resp.status(500).send("Failed to generate token", error)
    }
})

// Jimmy - Registration 
router.post("/", body('email').isEmail(), async (req, resp) => {
   // console.log(req.body)
    const errors = validationResult(req);

    // username and email should be case insensitive when checking
    req.body.username = req.body.username.toLowerCase();
    req.body.email = req.body.email.toLowerCase();
    // username and email should be case insensitive when checking
    req.body.username = req.body.username.toLowerCase();
    req.body.email = req.body.email.toLowerCase();

    let errMsg = {}
    const { username, email, password } = req.body;
    const checkuser = await User.findOne({ username })
    const checkemail = await User.findOne({ email })
    if (checkemail) {
        errMsg.email = 'the email already exists'
        return resp.status(400).send(JSON.stringify(errMsg))
    }
    if (!username) {
        errMsg.username = 'username can not be empty.'
    }
    if (!password) {
        errMsg.password = 'password can not be empty'
    }
    if (checkuser) {
        errMsg.username = 'the username already exists'
    }
    try {
        if (Object.keys(errMsg).length != 0)
            throw new Error(JSON.stringify(errMsg))
        await User.create(req.body);
        resp.status(201).send('Successfully registered. Please log in.');
    }
    catch (e) {
        // console.log(e)
        resp.status(400).send(e.message);
    }
});

module.exports = router;
