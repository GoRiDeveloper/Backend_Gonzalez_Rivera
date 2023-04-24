import { OrderService } from "./orders_service.js";
import { ORDER_DAO } from "../../daos/persistence/factory.js";

export const ORDER_SERVICE = new OrderService(ORDER_DAO);