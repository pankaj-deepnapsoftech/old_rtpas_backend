const {Router} = require("express");
const { isAuthenticated } = require("../middlewares/isAuthenticated");
const { ScrapMaterial } = require("../controllers/Scrap.controller");


const routes = Router();


routes.route("/create").post(ScrapMaterial.prototype.createScrapMaterial);
routes.route("/get").get(ScrapMaterial.prototype.getScrapMaterial);
routes.route("/delete/:id").get(ScrapMaterial.prototype.deleteScrapMaterial);
routes.route("/update/:id").put(ScrapMaterial.prototype.updateScrapMaterial);


module.exports = {ScrapRoutes:routes}