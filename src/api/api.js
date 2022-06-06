import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {
        "API-KEY": "fd4ca5d8-d6c6-4455-a6f0-9223d3ba2b4d"
    }
})


export const usersAPI =  {
    getUsers (activePage, usersOnPage) {
        return instance.get(`users?page=${activePage}&count=${usersOnPage}`).then(response => response.data)
    },
    followUser(id) {
        return instance.post(`follow/${id}`,{}).then(response => response.data)
    },
    unFollowUser(id) {
        return instance.delete(`follow/${id}`).then(response => response.data)
    }
}

export const profileAPI = {
    getProfile(idFromURL){
        return instance.get(`profile/${idFromURL}`).then(response => response.data)
    },
    getUserStatus(id){
        return instance.get(`profile/status/${id}`).then(response => response.data)
    },
    updateStatus(status){
        return instance.put('profile/status',{status:status}).then(response => response.data)
    },
    uploadPhoto(file){
        const formData = new FormData()
        formData.append("image", file)
        return instance.put('profile/photo',formData).then(response => response.data)
    },
    updateProfileData(newData, userID){
       /* let resultData = {
            AboutMe: newData.AboutMe,
            userId: userID,
            lookingForAJob: true,
            lookingForAJobDescription: newData.lookingForAJobDescription,
            fullName: newData.fullName,
            contacts: {
                github: newData.github,
                vk: newData.vk,
                facebook: newData.facebook,
                instagram: newData.instagram,
                twitter: newData.twitter,
                website: newData.website,
                youtube: newData.youtube,
                mainLink: newData.mainLink}
        }*/
        return instance.put('profile',newData).then(response => response.data)
    }
}
export const authAPI =  {
    getAuth () {
        return instance.get(`auth/me`).then(response => response.data)
    },
    submitAuth (email, password, rememberMe) {
        return instance.post("auth/login",{email: email, password: password, rememberMe: rememberMe}).then(response => response.data)
    },
    logout () {
        return instance.delete("auth/login").then(response => response.data)
    }

}
