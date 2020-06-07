import { Member } from './member';
import { Submission } from '../interfaces/submission';

export class Contest {
    winner:Member;
    calendar:Date;
    sub_count:number;
    winning_description:string;
    winning_content_url:string;
    winning_content_type:string;
    content_type:string;

}
