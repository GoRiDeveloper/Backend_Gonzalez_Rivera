import ErrProps from "../../errors/error_props.js";
import ErrThereIsNoData from "../../errors/error_there_is_no_data.js";
import UsersDTO from "../users/dtos/UsersDTO.js";

export default class Users {

    #users;

    constructor (users) {

        if (!users) throw new ErrProps(users);
        if (users.length === 0) throw new ErrThereIsNoData();

        this.#users = users;

    };

    data () {

        return new UsersDTO({ users: this.#users });

    };

};