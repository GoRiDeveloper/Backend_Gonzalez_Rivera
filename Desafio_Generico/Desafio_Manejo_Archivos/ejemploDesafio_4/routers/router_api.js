const express = require("express"),
{

    controllerGetThings,
    controllerGetIdThings,
    controllerPostThings,
    controllerPutIdThings,
    controllerPatchIdThings,
    controllerDeleteIdThings

} = require("../controllers/controllers_api");

const routerApi = express.Router();
routerApi.get("/", controllerGetThings);
routerApi.get("/:id", controllerGetIdThings);

routerApi.post("/", controllerPostThings);
routerApi.put("/:id", controllerPutIdThings);
routerApi.patch("/:id", controllerPatchIdThings);
routerApi.delete("/:id", controllerDeleteIdThings);

exports.routerApi = routerApi;