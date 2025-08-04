import type {City, Club, ClubUsers, Profile, User} from "~/types/models";

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
