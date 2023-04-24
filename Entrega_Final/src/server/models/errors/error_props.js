export default class ErrorProps extends Error {

    constructor (props) {

        super(`Not found by properties : ${JSON.stringify(props, null, "\t") || ""}.`);
        this.type = "NOT_FOUND_BY_PROPERTIES";

    };

};