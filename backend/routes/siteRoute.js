const { Router } = require("express");
const { getSiteController, updateSiteController } = require("../controller/siteController");

const router = Router();

router.get("/site", getSiteController);
router.put("/site", updateSiteController);

module.exports = router;
