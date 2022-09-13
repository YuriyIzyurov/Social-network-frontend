import {CurrentProfileType, PhotosType} from "typings/types";
import {instanceSocial, ResponseAPIType} from "./api";

type UploadPhotoType = {
  photos: PhotosType
}
export const profileAPI = {
    getProfile(idFromURL: number) {
        return instanceSocial.get<CurrentProfileType>(`profile/${idFromURL}`).then(response => response.data)
    },
    getUserStatus(id: number) {
        return instanceSocial.get<string>(`profile/status/${id}`).then(response => response.data)
    },
    updateStatus(status: string) {
        return instanceSocial.put<ResponseAPIType>('profile/status', {status: status}).then(response => response.data)
    },
    uploadPhoto(file: File) {
        const formData = new FormData()
        formData.append("image", file)
        return instanceSocial.put<ResponseAPIType<UploadPhotoType>>('profile/photo', formData).then(response => response.data)
    },
    updateProfileData(newData: any) {
        return instanceSocial.put<ResponseAPIType>('profile', newData).then(response => response.data)
    }
}