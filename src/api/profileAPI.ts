import {CurrentProfileType, PhotosType} from "../typings/types";
import {instance, ResponseAPIType} from "./api";



type UploadPhotoType = {
  photos: PhotosType
}
export const profileAPI = {
    getProfile(idFromURL: number) {
        return instance.get<CurrentProfileType>(`profile/${idFromURL}`).then(response => response.data)
    },
    getUserStatus(id: number) {
        return instance.get<string>(`profile/status/${id}`).then(response => response.data)
    },
    updateStatus(status: string) {
        return instance.put<ResponseAPIType<null>>('profile/status', {status: status}).then(response => response.data)
    },
    uploadPhoto(file: File) {
        const formData = new FormData()
        formData.append("image", file)
        return instance.put<ResponseAPIType<UploadPhotoType>>('profile/photo', formData).then(response => response.data)
    },
    updateProfileData(newData: any) {
        return instance.put<ResponseAPIType<null>>('profile', newData).then(response => response.data)
    }
}