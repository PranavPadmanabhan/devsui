
export type PostType = "Ordinary" | "Media" | "Work" | "Event";

export type WorkRoleType = "Frontend Developer" | "Backend Developer" | "Fullstack Developer" | "Flutter Developer" | "IOS Developer" | "ReactJS Developer" | "React Native Developer" | "AngularJS Developer" | "Angular Developer" | null

export interface AppUIState {
    postType: PostType
    setPostType: (postType: PostType) => void;
    isCreatePostModalVisible:boolean;
    setIsCreatePostModalVisible:(isCreatePostModalVisible:boolean) => void;
    selectedWorkRole:any;
    setselectedWorkRole:(selectedWorkRole:any) => void;
    user:Users;
    setUser:(user:Users) => void;
    reset: () => void
}

export type Role = "Designer" | "Developer" | "Both"

export type Users = {
    name:string | null;
    userName:string | null;
    walletAddress:string | null;
    email:string | null;
    role?:string | null;
    bio?:string | null;
    profileImage?:string | null;
    dob?:string | null;
    coverImage?:string | null
}

export type Post = {
    creatorName:string;
    userName:string;
    subject?:string;
    role:Role;
    content:string;
    image?:string;
    likes:number;
    comments:any[];
}

export type PostInteractionType = "Comment" | "Likes" | "Requests" | null

export type Comment = {
    isLiked?:boolean
    profileImage:string;
    name:string;
    commentedAt?:string;
    comment:string;
    likes:number;
    replies:ReplyComment[]
}

export type ReplyComment = {
    profileImage:string;
    name:string;
    commentedAt?:string;
    comment:string;
}

export type Message = {
    content:string,
    isSentByUser:boolean;
    timestamp:string|number
}