import {
    AllMessageType,
    CurrentProfileType,
    DialogType,
    PhotosType,
    PostType,
    SelfPrivateMessageType, UserType,
    ChatMessageAPIType,FilterType, SpamDataType, StatusType
} from "typings";



export const authActions = {
    setUserAuth: (email:string,id:number,login:string, photos: PhotosType) => ({type : "SET_USER_AUTH", data : {email,id,login, photos}} as const),
    logoutUser: () => ({type : "LOGOUT_USER"} as const),
    setCaptchaImage: (imageURL:string) => ({type : "SET_CAPTCHA", imageURL} as const),
    deleteCaptcha: () => ({type : "DEL_CAPTCHA"} as const),
    incorrectData: (message: string) => ({type : "ERROR_MESSAGE", message} as const),
    deleteIncorrectData: () => ({type : "DEL_ERROR"} as const),
    dataIsFetching: (isFetching:boolean) => ({type: "AUTH_FETCHING", isFetching} as const),
}
export const blogAuthActions = {
    setBlogUserAuth: (payload: any) => ({type:"BLOG_LOGIN_USER", payload} as const),
    logoutBlogUserAuth: () => ({type:"BLOG_LOGOUT"} as const),
    setAvatar: (avatarUrl: string) => ({type:"SET_BLOG_AVATAR", avatarUrl} as const),
    incorrectData: (message: string) => ({type : "ERROR_MESSAGE_BLOG", message} as const),
}
export const appActions = {
    setInitialize: () => ({type : "SET_INIT"} as const),
    setRedirectToLogin: (isRedirect: boolean) => ({type : "REDIRECT_TO_LOGIN", isRedirect} as const)
}
export const chatActions = {
    setNewMessages: (messages: ChatMessageAPIType[]) => ({type : "SET_NEW_MESSAGES", payload : {messages}} as const),
    changedStatus: (status: StatusType) => ({type : "STATUS_CHANGED", payload : {status}} as const),
    deleteMessages: () => ({type : "DELETE_MESSAGES"} as const)
}
export const dialogActions = {
    sendNewMessage: (messageData: SelfPrivateMessageType) => ({type : "SEND_MESSAGE", payload : messageData} as const),
    setDialogs: (dialogs: Array<DialogType>) => ({type: "SET_DIALOGS", dialogs} as const),
    setMessages: (messages: Array<AllMessageType>) => ({type: "SET_MESSAGES", messages} as const),
    dialogListIsFetching: (isFetching:boolean) => ({type: "IS_FETCHING", isFetching} as const),
    clearDialogList: () => ({type: "CLEAR_DIALOG_LIST"} as const),
    setDialogID: (id:number | null) => ({type: "SET_DIALOG_ID", id} as const),
    mutateMessageList: (messageId:string, message?:string | undefined, reason?: Delete | Spam) => ({type: "MUTATE_MESSAGE_LIST", messageId,message,reason} as const),
    markMessageIdAsDeleted: (payload:SpamDataType) => ({type: "MARK_MESSAGE_ID_AS_DELETED", payload}as const),
    deleteMark: (messageId:string) => ({type: "REMOVE_MARK_OF_DELETE", messageId}as const),
    setRedirectToDialogPage: (status:boolean) => ({type: "SET_REDIRECT_TO_DIALOG_PAGE", status} as const),
    setNumberOfNewMessages: (number:number) => ({type: "SET_NUMBER_OF_NEW_MESSAGES", number} as const),
}


export const postActions = {
    setAllPosts: (posts: PostType[]) => ({type: 'SET_ALL_POSTS', payload: posts} as const),
    setFetching: (isFetching: boolean) => ({type: 'POSTS_FETCHING', isFetching} as const),
    setCreatedPostId: (id: string) => ({type: 'SET_POST_ID', id} as const),
    deleteCreatedPostId: () => ({type: 'DELETE_POST_ID'} as const),
    deletePostFromState: (id: string) => ({type: 'SORT_POSTS', id} as const),
    setTotalPosts: (count: number | null) => ({type: 'SET_POSTS_COUNT', count} as const),
    setActivePostPage: (page: number) => ({type: 'SET_ACTIVE_POST_PAGE', page} as const),
    addPosts: (posts: PostType[]) => ({type: 'ADD_POSTS', payload:posts} as const),
    loadMyPosts: (posts: PostType[],count: number) => ({type: 'LOAD_POSTS', payload: {posts, count}} as const),
    addSearchFilter: (filter: string | null) => ({type: 'ADD_POST_SEARCH_FILTER', filter} as const),
    pickAuthorTab: (status:boolean) => ({type: 'PICK_AUTHOR_POSTS_TAB', status} as const),
    setCurrentAuthorId: (id:string) => ({type: 'SET_CURRENT_AUTHOR_ID', id} as const),
    setScrollToTop: (isScrollTop:boolean) => ({type: 'SET_SCROLL_TO_TOP', isScrollTop} as const)
}
export const profileActions = {
    setCurrentProfile: (profile:CurrentProfileType) => ({type: "SET_CURRENT_PROFILE", profile} as const),
    setStatusOnProfile: (status: string) => ({type: "SET_STATUS", status} as const),
    setPhotoOnProfile: (photo: PhotosType) => ({type: "SET_PHOTO", photo} as const),
    setMainColors: (colors: string[]) => ({type: "SET_COLORS", colors} as const),
    setRedirect: (id:number) => ({type: "SET_REDIRECT_TO_DIALOG",id} as const),
    setEditMode: (status:boolean) => ({type: "SET_PROFILE_EDIT_MODE",status} as const),
}
export const userActions = {
    followToggle: (userID:number) => ({type : "FOLLOW", userID} as const),
    setUsers: (users: Array<UserType>) => ({type: "SET_USERS", users} as const),
    addUsers: (users: Array<UserType>) => ({type: "ADD_USERS", users} as const),
    setActivePage: (activePage:number) => ({type: "SET_ACTIVE_PAGE", activePage} as const),
    setTotalUsers: (totalUsers:number)=> ({type: "SET_TOTAL_USERS", totalUsers} as const),
    dataIsFetching: (isFetching:boolean) => ({type: "FETCHING", isFetching} as const),
    followActionInProcess: (isFetching:boolean, userID:number)=>({type:"FOLLOW_IN_PROCESS", isFetching, userID} as const),
    filterSettings: (searchFilter: FilterType)=>({type:"FILTERED_USERS", payload:searchFilter} as const),
    setFriends: (friends: Array<UserType>)=>({type:"SET_FRIENDS", friends} as const),
    setTotalFriends: (totalFriends:number)=>({type:"SET_TOTAL_FRIENDS", totalFriends} as const),
    deleteFriendsFromSidebar: ()=>({type:"DELETE_FRIENDS"} as const),
}
type Delete = "delete"
type Spam = "spam"