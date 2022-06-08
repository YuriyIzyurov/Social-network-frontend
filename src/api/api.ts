import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {
        "API-KEY": "fd4ca5d8-d6c6-4455-a6f0-9223d3ba2b4d"
    }
})


export const usersAPI =  {
    getUsers (activePage:number, usersOnPage:number) {
        return instance.get(`users?page=${activePage}&count=${usersOnPage}`).then(response => response.data)
    },
    followUser(id:number) {
        return instance.post(`follow/${id}`,{}).then(response => response.data)
    },
    unFollowUser(id:number) {
        return instance.delete(`follow/${id}`).then(response => response.data)
    }
}

export const profileAPI = {
    getProfile(idFromURL:number){
        return instance.get(`profile/${idFromURL}`).then(response => response.data)
    },
    getUserStatus(id:number){
        return instance.get(`profile/status/${id}`).then(response => response.data)
    },
    updateStatus(status:string){
        return instance.put('profile/status',{status:status}).then(response => response.data)
    },
    uploadPhoto(file:any){
        const formData = new FormData()
        formData.append("image", file)
        return instance.put('profile/photo',formData).then(response => response.data)
    },
    updateProfileData(newData:any){
        return instance.put('profile',newData).then(response => response.data)
    }
}
export const authAPI =  {
    getAuth () {
        return instance.get(`auth/me`).then(response => response.data)
    },
    submitAuth (email:string, password:string, rememberMe:boolean, captcha:string) {
        return instance.post("auth/login",{email, password, rememberMe, captcha}).then(response => response.data)
    },
    logout () {
        return instance.delete("auth/login").then(response => response.data)
    },
    getCaptcha() {
        return instance.get("security/get-captcha-url").then(response => response.data)
    }

}
