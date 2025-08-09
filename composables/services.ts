import type {
    City,
    Club,
    ClubUsers,
    Follow,
    Post,
    Profile,
    User,
    Address,
    Chat,
    UserOnChat,
    Message
} from "~/types/models";

//gets ------------------------------------------------------------------------------------------------
export const getUsers = async (params:{})=>{
    const {result}= await useGet<User[]>(`/user`, {params});
    return result
}
export const getUser = async (id:string,params:{})=>{
    const {result}= await useGet<User>(`/user/${id}`, {params});
    return result
}
export const getProfiles = async (params:{})=>{
    const {result}= await useGet<Profile[]>(`/profile`, {params});
    return result
}
export const getCities = async (params:{})=>{
    const {result}= await useGet<City[]>(`/city`, {params});
    return result
}
export const getClubs = async (params:{})=>{
    const {result}= await useGet<Club[]>(`/club`, {params});
    return result
}
export const getClub = async (id:string,params:{})=>{
    const {result}= await useGet<Club>(`/club/${id}`, {params});
    return result
}
export const getAddresses = async (params:{})=>{
    const {result}= await useGet<Address[]>(`/address`, {params});
    return result
}
export const getPosts = async (params:{})=>{
    const {result}= await useGet<Post[]>(`/post`, {params});
    return result
}
export const getChats = async (params:{})=>{
    const {result}= await useGet<Chat[]>(`/chat`, {params});
    return result
}
export const getChat = async (id:string,params:{})=>{
    const {result}= await useGet<Chat>(`/chat/${id}`, {params});
    return result
}
export const getMessages = async (params:{})=>{
    const {result}= await useGet<Message[]>(`/message`, {params});
    return result
}
//posts ------------------------------------------------------------------------------------------------
export const postProfile = async (data: Partial<Profile>) => {
    const {result} = await usePost(`/profile`, data)
    return result
}
export const postClub = async (data: Partial<Club>) => {
    const {result} = await usePost(`/club`, data)
    return result
}
export const postClubUser = async (data: Partial<ClubUsers>) => {
    const {result} = await usePost(`/club-users`, data)
    return result
}
export const postFollow = async (data: Partial<Follow>) => {
    const {result} = await usePost(`/follow`, data)
    return result
}
export const postPost = async (data: Partial<Post>) => {
    const {result} = await usePost(`/post`, data)
    return result
}
export const postChat = async (data: Partial<Chat>) => {
    const {result} = await usePost(`/chat`, data)
    return result
}
export const postChatUsers = async (data: Partial<UserOnChat>) => {
    const {result} = await usePost(`/user-on-chat`, data)
    return result
}
export const postMessages = async (data: Partial<Message>) => {
    const {result} = await usePost(`/message`, data)
    return result
}


//puts ------------------------------------------------------------------------------------------------
export const putUser = async (data: Partial<User>, id: string) => {
    const {result} = await usePut(`/user/${id}`, data)
    return result
}

export const putProfile = async (data: Partial<Profile>, id: string) => {
    const {result} = await usePut(`/profile/${id}`, data)
    return result
}
export const putClubUser = async (data: Partial<ClubUsers>, id: string) => {
    const {result} = await usePut(`/club-users/${id}`, data)
    return result
}
export const putClub = async (data: Partial<Club>, id: string) => {
    const {result} = await usePut(`/club/${id}`, data)
    return result
}
