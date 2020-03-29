const OngController = require("./controllers/OngController");
const IncidentController = require("./controllers/IncidentController");
const ProfileController = require("./controllers/ProfileController");
const SessionController = require("./controllers/SessionController");

module.exports = express => {
  const routes = express.Router();

  routes.get("/ongs", OngController.list);
  routes.post("/ongs", OngController.create);

  routes.get("/profile", ProfileController.list);

  routes.post("/sessions", SessionController.create);

  routes.get("/incidents", IncidentController.list);
  routes.post("/incidents", IncidentController.create);
  routes.delete("/incidents/:id", IncidentController.delete);

  return routes;
};
