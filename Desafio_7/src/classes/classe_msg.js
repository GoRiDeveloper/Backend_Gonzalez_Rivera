import { mySqlConfig } from "../../db/db_config.js";

class Messages {

    constructor (client, table) {

        this.client = client;
        this.table = table;

    };

    async getMsg() {

        const DATA = await this.client(this.table).select();

        if (DATA && DATA.length > 0) {

            return DATA;
            
        } else {

            return null;
            
        };

    };

    async postMsg (msg) {

        await this.client(this.table).insert(msg);

        const DATA = await this.getMsg();

        if (DATA) {

            const MSG = DATA.find(msgs => msgs.id === msg.id);

            if (MSG) {

                return MSG;
                
            } else {

                return null;
                
            };
            
        } else {

            return DATA;
            
        };

    };

    async deleteMsg (id) {

        let DATA = await this.getMsg();

        if (DATA) {

            const MSG = DATA.find(msgs => msgs.id === id);

            if (MSG) {

                await this.client(this.table).where("id", id).del();

                DATA = await this.getMsg();

                if (DATA) {

                    const CONFIRMATION = DATA.some(msgs => msgs.id === id);

                    if (CONFIRMATION) {

                        return null;
                        
                    } else {

                        return MSG;
                        
                    };
                    
                } else {

                    return DATA;

                };
                
            } else {

                return null;
                
            };
            
        } else {

            return DATA;
            
        };

    };

};

export const msg = new Messages(mySqlConfig, "Messages");