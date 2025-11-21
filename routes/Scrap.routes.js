const {Router} = require("express");
const { isAuthenticated } = require("../middlewares/isAuthenticated");
const { ScrapMaterial } = require("../controllers/Scrap.controller");


const routes = Router();


routes.route("/create").post(ScrapMaterial.prototype.createScrapMaterial)


module.exports = {ScrapRoutes:routes}