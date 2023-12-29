const user_controller = require('../controller/user_controller');
const router = require("express").Router();

router.post('/signup', user_controller.signup);
router.post('/login', user_controller.login);

module.exports = router;