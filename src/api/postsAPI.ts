import {instanceBlog} from "./api"
import {AddPostType, CommentsType, PostType, PostUserType} from "typings/types";

type BlogResponseType<D = {}|[]> = {
    data: D
    resultCode: number
    message:string
}
type PostResponse = {
    posts: PostType[]
    totalCount: number
}
type PatchResponse = {
    message: string
    _id: string
}
type TopPostsType = {
    totalCount: number
    topPosts:PostType[]
}
type MyPostsType = {
    totalCount: number
    myPosts:PostType[]
}
type TopType = {
    top:TopUserType[]
}
type TopUserType = {
    avatarUrl: string
    fullName: string
    id: string
    viewsCount: number
}


export const postsAPI = {
    getPosts(searchFilter:string | null = null, viewed:boolean = false, page:number = 1, limit:number = 5) {
        return instanceBlog.get<BlogResponseType<PostResponse>>(`posts?page=${page}&limit=${limit}`
            + (searchFilter === null ? '':`&searchFilter=${searchFilter}`)
            + (!viewed ? '' : `&viewed=${viewed}`)
        ).then(response => {
           return response.data
        })
    },
    writePost(post: AddPostType) {
      return instanceBlog.post<BlogResponseType<PostType>>(`posts`, post).then(response =>  response.data)
    },
    uploadPreview(file: File) {
        const formData = new FormData()
        formData.append("preview", file)
      return instanceBlog.post<BlogResponseType<{url:string}>>(`upload`, formData).then(response => response.data)
    },
    getPostById(id:string | undefined) {
        return instanceBlog.get<BlogResponseType<PostType>>(`posts/${id}`).then(response => response.data)
    },
    updatePost(post: AddPostType, id:string) {
        return instanceBlog.patch<BlogResponseType<PatchResponse>>(`posts/${id}`, post).then(response => response.data)
    },
    deletePost(id:string) {
        return instanceBlog.delete<BlogResponseType<{message:string}>>(`posts/${id}`).then(response => response.data)
    },
    getTags() {
        return instanceBlog.get<BlogResponseType<string[]>>(`tags`).then(response => response.data)
    },
    getTopPosts() {
        return instanceBlog.get<BlogResponseType<TopPostsType>>(`top`).then(response => response.data)
    },
    getMyPosts() {
        return instanceBlog.get<BlogResponseType<MyPostsType>>(`myPosts`).then(response => response.data)
    },
    getTagMatch(tag:string) {
        return instanceBlog.get<BlogResponseType<PostType[]>>(`tags/${tag}`).then(response => response.data)
    },
    getTopWriters() {
        return instanceBlog.get<BlogResponseType<TopType>>(`views`).then(response => response.data)
    },
    getPostsByAuthor(userId:string) {
        return instanceBlog.get<BlogResponseType<PostType[]>>(`author/${userId}`,).then(response => response.data)
    }
}
export  const commentsAPI = {
    getAll() {
      return instanceBlog.get<BlogResponseType<CommentsType[]>>(`/comments`).then(response => response.data)
    },
    writeComment(id:string, text:string){
        return instanceBlog.post<BlogResponseType<CommentsType>>(`comments/${id}`, {text}).then(response => response.data)
    },
    getAllCommentsOfPost(id:string | undefined){
        return instanceBlog.get<BlogResponseType<CommentsType[]>>(`comments/${id}`).then(response => response.data)
    },
    deleteComment(id:string) {
        return instanceBlog.delete<BlogResponseType<{message: string}>>(`comments/${id}`).then(response => response.data)
    },
    updateComment(text: string, id:string) {
        return instanceBlog.patch<BlogResponseType<{message: string}>>(`comments/${id}`, {text}).then(response => response.data)
    }
}
export const authBlogAPI = {
    submitAuth(email: string, password: string) {
        return instanceBlog.post<BlogResponseType<PostUserType & {token:string}>>('login', {email, password}).then(response => response.data)
    },
    getMe() {
      return instanceBlog.get<BlogResponseType<PostUserType & {message:string}>>('auth/me').then(response => response.data)
    },
    uploadAvatar(file: File) {
        const formData = new FormData()
        formData.append("avatar", file)
        return  instanceBlog.post<BlogResponseType<{messages: string,avatarUrl: string}>>('user/avatar',formData).then(response => response.data)
    }
}

