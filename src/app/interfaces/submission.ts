import { Member } from '../models/member';

export interface Submission {
    description:string;
	member:Member;
	content_url:string;
	content_extension:string;
	content_type:string;
	id?:number
}
