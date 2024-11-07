const { Router } = require('express');
const User = require('../models/user');
const router = Router();
//get route for the signup
router.get('/signup', (req, res) => {
   return res.render('signup');
});
//get route for the signin
router.get('/signin', (req, res) => {
    return res.render('signin');
 });
//post route for the signin
router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    try {
        const token = await User.authenticate(email, password);
        return res.cookie("token", token).redirect('/');
    } catch (error) {
        return res.render('signin', { error: "Incorect Email or Password" });
    }
});
//get route for the logout
router.get('/logout', (req, res) => {
    return res.clearCookie("token").redirect('/');
});
//post route for the signup
router.post('/signup', async (req, res) => {
    const { fullName, email, password } = req.body;
    await User.create({ fullName, email, password});
    return res.redirect('/');
});
//exporting the router
module.exports = router;