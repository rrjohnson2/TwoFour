import { Actions } from '../constants/app.constant';


export interface AlertTicket {
    msg:string,
    type:string,
    action_attempted:Actions
}
