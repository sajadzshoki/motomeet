export interface Motomeet {
    user?: User;
    profile?: Profile;
    motorBrand?: MotorBrand;
    motorModel?: MotorModel;
    userMotors?: UserMotors;
    city?: City;
    post?: Post;
    like?: Like;
    follow?: Follow;
    club?: Club;
    clubUsers?: ClubUsers;
    ride?: Ride;
    rideRiders?: RideRiders;
    address?: Address;
    accessLevel?: AccessLevel;
    comment?: Comment;
    notification?: Notification;
    role?: Role;
    chat?: Chat;
    userOnChat?: UserOnChat;
    message?: Message;
    otp?: Otp;
    transaction?: Transaction;
    gateway?: Gateway;
    coin?: Coin;
    coinGateway?: CoinGateway;
    wallet?: Wallet;
    withdrawRequest?: WithdrawRequest;
    file?: File;
    faq?: Faq;
    privacy?: Privacy;
    setting?: Setting;
}
export interface User {
    id?: string;
    email?: string | null;
    username?: string | null;
    phoneNumber?: string | null;
    password: string;
    inviteCode?: string | null;
    invitePercent?: number | {};
    lat?: number | {} | null;
    lng?: number | {} | null;
    online?: boolean | null;
    lastSeen?: string | null;
    rememberMeToken?: string | null;
    supervisorCode?: string | null;
    accessLevel?: AccessLevel | null;
    accessLevelName?: string | null;
    type?: "USER" | "ADMIN" | "SELLER" | null;
    authStatus?: "PENDING" | "AUTHORIZED" | "REJECTED" | null;
    createdAt?: string;
    updatedAt: string;
    OTP?: Otp[];
    wallets?: Wallet[];
    transactions?: Transaction[];
    invitedUsers?: User[];
    supervisor?: User | null;
    withdrawRequests?: WithdrawRequest[];
    profile?: Profile | null;
    role?: Role | null;
    roleId?: string | null;
    comments?: Comment[];
    myComments?: Comment[];
    messages?: Message[];
    userChats?: Chat[];
    userOnChats?: UserOnChat[];
    Notification?: Notification[];
    Post?: Post[];
    ClubUsers?: ClubUsers[];
    Club?: Club[];
    RideRiders?: RideRiders[];
    Like?: Like[];
    followers?: Follow[];
    followings?: Follow[];
    Ride?: Ride[];
}
export interface AccessLevel {
    id?: string;
    name: string;
    fee?: number | {} | null;
    priority: number | {};
    createdAt?: string | null;
    updatedAt?: string | null;
    users?: User[];
}
export interface Otp {
    id?: string;
    userId: string;
    type: "EMAIL" | "PHONE";
    value: string;
    createdAt?: string | null;
    updatedAt?: string | null;
    expiredAt: string;
    user?: User;
}
export interface Wallet {
    id?: string;
    balance?: number | {} | null;
    blocked?: number | {} | null;
    address?: string | null;
    userId: string;
    coinId: string;
    createdAt?: string | null;
    updatedAt?: string | null;
    user?: User;
    coin?: Coin;
    transactions?: Transaction[];
    withdrawRequests?: WithdrawRequest[];
}
export interface Coin {
    id?: string;
    name: string;
    unit?: string | null;
    icon?: string | null;
    color?: string | null;
    price?: number | {} | null;
    walletable?: boolean | null;
    active?: boolean | null;
    isFiat?: boolean | null;
    gateways?: CoinGateway[];
    wallets?: Wallet[];
}
export interface CoinGateway {
    id?: string;
    decimal?: number | {} | null;
    identity?: string | null;
    withdrawFee?: string | null;
    minWithdraw?: string | null;
    active?: boolean | null;
    gateway?: Gateway;
    coin?: Coin;
    gatewayId: string;
    coinId: string;
    transactions?: Transaction[];
    withdrawRequests?: WithdrawRequest[];
}
export interface Gateway {
    id?: string;
    name: string;
    label?: string | null;
    address?: string | null;
    icon?: string | null;
    color?: string | null;
    merchanId?: string | null;
    redirectUrl?: string | null;
    checkUrl?: string | null;
    payable?: boolean | null;
    active?: boolean | null;
    details?: number | string | boolean | {} | unknown[] | null;
    coins?: CoinGateway[];
}
export interface Transaction {
    id?: string;
    paymentId?: string | null;
    amount: number | {};
    type: "WITHDRAW" | "DEPOSIT" | "PAYMENT";
    status?: "PENDING" | "ACCEPTED" | "REJECTED" | "SUCCESS" | "FAILED" | null;
    txId?: string | null;
    title?: string | null;
    redirectUrl: string;
    gateway?: CoinGateway | null;
    user?: User;
    wallet?: Wallet | null;
    createdAt?: string | null;
    updatedAt?: string | null;
    walletId?: string | null;
    userId: string;
    gatewayId?: string | null;
    withdrawRequest?: WithdrawRequest | null;
    withdrawRequestId?: string | null;
}
export interface WithdrawRequest {
    id?: string;
    paymentId?: string | null;
    address: string;
    amount: number | {};
    status?: "PENDING" | "ACCEPTED" | "REJECTED" | "SUCCESS" | "FAILED" | null;
    createdAt?: string | null;
    updatedAt?: string | null;
    user?: User;
    wallet?: Wallet;
    gateway?: CoinGateway;
    transactions?: Transaction[];
    walletId: string;
    userId: string;
    coinGatewayId: string;
    transactionId?: string | null;
}
export interface Profile {
    id?: string;
    firstName: string;
    lastName: string;
    nickName?: string | null;
    birthday?: string | null;
    location?: Location | null;
    address?: Address[];
    avatar?: string | null;
    motors: string[];
    motorColor?: string | null;
    bio?: string | null;
    user?: User;
    createdAt?: string | null;
    updatedAt?: string | null;
    userId: string;
    city?: City | null;
    cityId?: string | null;
    UserMotors?: UserMotors[];
}
export interface Location {
    lat: number | {};
    lng: number | {};
    exact?: boolean | null;
}
export interface Address {
    id?: string;
    title?: string | null;
    info?: string | null;
    location?: Location | null;
    createdAt?: string | null;
    updatedAt?: string | null;
    rideFrom?: Ride[];
    rideTo?: Ride[];
    Profile?: Profile | null;
    profileId?: string | null;
}
export interface Ride {
    id?: string;
    fromAddress?: Address;
    toAddress?: Address;
    title?: string | null;
    image?: string | null;
    rules: string[];
    minEngine?: number | {} | null;
    date: string;
    hour: string;
    maxRiders?: string | null;
    description?: string | null;
    user?: User | null;
    userId?: string | null;
    riders?: RideRiders[];
    club?: Club;
    createdAt?: string | null;
    updatedAt?: string | null;
    clubId: string;
    fromAddressId: string;
    toAddressId: string;
}
export interface RideRiders {
    id?: string;
    user?: User;
    ride?: Ride;
    status?: "PENDING" | "ACCEPTED" | "REJECTED" | "SUCCESS" | "FAILED";
    createdAt?: string | null;
    updatedAt?: string | null;
    rideId: string;
    userId: string;
}
export interface Club {
    id?: string;
    name: string;
    logo: string;
    images?: string[];
    score?: number | {} | null;
    comments?: Comment[];
    private?: boolean;
    user?: User;
    createdAt?: string | null;
    updatedAt?: string | null;
    city?: City | null;
    cityId?: string | null;
    clubUsers?: ClubUsers[];
    rides?: Ride[];
    userId: string;
    chat?: Chat | null;
    chatId?: string | null;
}
export interface Comment {
    id?: string;
    content?: string | null;
    score?: number | {} | null;
    reply?: string | null;
    user?: User;
    toUser?: User | null;
    createdAt?: string | null;
    updatedAt?: string | null;
    userId: string;
    toUserId?: string | null;
    Post?: Post | null;
    postId?: string | null;
    Club?: Club | null;
    clubId?: string | null;
}
export interface Post {
    id?: string;
    images: string[];
    caption?: string | null;
    user?: User;
    createdAt?: string | null;
    updatedAt?: string | null;
    userId: string;
    comments?: Comment[];
    likes?: Like[];
}
export interface Like {
    id?: string;
    user?: User;
    post?: Post;
    createdAt?: string | null;
    updatedAt?: string | null;
    userId: string;
    postId: string;
}
export interface City {
    id?: string;
    name: string;
    clubs?: Club[];
    profiles?: Profile[];
}
export interface ClubUsers {
    id?: string;
    user?: User;
    club?: Club;
    status?: "PENDING" | "ACCEPTED" | "REJECTED" | "SUCCESS" | "FAILED";
    createdAt?: string | null;
    updatedAt?: string | null;
    userId: string;
    clubId: string;
}
export interface Chat {
    id?: string;
    title?: string | null;
    image?: string | null;
    isPrivate?: boolean | null;
    messages?: Message[];
    user?: User;
    status?: "PENDING" | "ACCEPTED" | "REJECTED" | "SUCCESS" | "FAILED";
    createdAt?: string | null;
    updatedAt?: string | null;
    userId: string;
    userOnChats?: UserOnChat[];
    Club?: Club[];
}
export interface Message {
    id?: string;
    text?: string | null;
    file?: string | null;
    user?: User;
    chat?: Chat | null;
    createdAt?: string | null;
    updatedAt?: string | null;
    userId: string;
    chatId?: string | null;
}
export interface UserOnChat {
    id?: string;
    userId: string;
    chatId: string;
    chat?: Chat;
    user?: User;
}
export interface UserMotors {
    id?: string;
    profile?: Profile;
    motorModel?: MotorModel;
    createdAt?: string | null;
    updatedAt?: string | null;
    profileId: string;
    motorModelId: string;
}
export interface MotorModel {
    id?: string;
    name: string;
    engineCapacity: number | {};
    brand?: MotorBrand;
    createdAt?: string | null;
    updatedAt?: string | null;
    brandId: string;
    UserMotors?: UserMotors[];
}
export interface MotorBrand {
    id?: string;
    name: string;
    createdAt?: string | null;
    updatedAt?: string | null;
    MotorModel?: MotorModel[];
}
export interface Role {
    id?: string;
    name: string;
    label?: string | null;
    color?: string | null;
    icon?: string | null;
    privileges?: Privilege[];
    users?: User[];
}
export interface Privilege {
    model: string;
    func: string;
    type?: "FULL" | "PARTIALLY" | "NONE" | null;
    condition?: Condition | null;
    details?: Condition[];
}
export interface Condition {
    key: string;
    type?: "eq" | "not_eq" | "in" | "not_in" | "gt" | "lt" | "gte" | "lte" | null;
    valueType?: string | null;
    string?: string | null;
    number?: number | {} | null;
    json?: number | string | boolean | {} | unknown[] | null;
}
export interface Notification {
    id?: string;
    title: string;
    text: string;
    user?: User | null;
    location?: Location | null;
    status?: "PENDING" | "ACCEPTED" | "REJECTED" | "SUCCESS" | "FAILED" | null;
    createdAt?: string | null;
    updatedAt?: string | null;
    userId?: string | null;
}
export interface Follow {
    id?: string;
    fromUser?: User;
    toUser?: User;
    fromId: string;
    toId: string;
    createdAt?: string | null;
    updatedAt?: string | null;
}
export interface File {
    id?: string;
    path: string;
    drive?: "S3" | "LOCAL" | "GCS" | null;
    url: string;
    baseUrl?: string | null;
    createdAt?: string | null;
    updatedAt?: string | null;
}
export interface Faq {
    id?: string;
    question: string;
    answer: string;
    isActive?: boolean;
    createdAt?: string | null;
    updatedAt?: string | null;
}
export interface Privacy {
    id?: string;
    title: string;
    contents?: Content[];
    isActive?: boolean;
    createdAt?: string | null;
    updatedAt?: string | null;
}
export interface Content {
    title: string;
    content: string;
}
export interface Setting {
    id?: string;
    bannerPricePerDay: number | {};
    reservePrice?: number | {} | null;
    createdAt?: string | null;
    updatedAt?: string | null;
}