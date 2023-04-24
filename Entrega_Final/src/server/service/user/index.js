import { UserService } from "./users_service.js";
import { USER_DAO } from "../../daos/persistence/factory.js";

export const USER_SERVICE = new UserService(USER_DAO);