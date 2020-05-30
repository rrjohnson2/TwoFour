export class Member {
    username: string;
    email: string;
    phone: string;
    verified: boolean;
    post_count: number;
    facebook: string;
    instagram: string;
    twitter: string;
    newsletter:boolean;
    messageMedium:string;
    notify:boolean
    password:string


    constructor(
                username:string,
                email:string,
                phone:string,
                verified:boolean,
                post_count:number,
                facebook: string,
                instagram:string,
                twitter:string,
                newsletter:boolean,
                messageMedium:string,
                notify:boolean
             )
            {
                this.username = username;
                this.email = email;
                this.phone = phone;
                this.verified = verified;
                this.post_count = post_count;
                this.facebook = facebook;
                this.instagram = instagram;
                this.twitter = twitter;
                this.newsletter = newsletter;
                this.messageMedium = messageMedium;
                this. notify = notify
            }
}

