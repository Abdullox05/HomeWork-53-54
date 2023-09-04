const {Router} = require("express");

const {sign_up,sign_in} = require("../controllers/authorization_controller");

const router = Router();

router.post("/authorization/sign_up", sign_up);

router.post("/authorization/sign_in", sign_in);

module.exports = router;
