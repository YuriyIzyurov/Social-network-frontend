import React, {useEffect} from 'react';
import {useLocation} from "react-router-dom";
import {Navigate} from "react-router";
import {getCurrentProfile, getId} from "../../redux/profile-selectors";
import {getAuth} from "../../redux/auth-selectors";
import {useSelector} from "react-redux";
import {useAppDispatch} from "../../redux/reduxStore";
import {getUserStatusInProfile, setProfileOnPage} from "../../redux/profileReducer";

const HeaderRouter = () => {

    const loggedUser = useSelector(getId)
    const isAuth = useSelector(getAuth)
    const currentProfile = useSelector(getCurrentProfile)
    const dispatch = useAppDispatch()


    let location = useLocation()
    useEffect(() => {
        if(location.pathname === '/') {
            if(loggedUser) {
                dispatch(setProfileOnPage(loggedUser))
                dispatch(getUserStatusInProfile(loggedUser))
                return
            }
        }
        const letters = location.pathname.match(/[a-z]/g)?.join('')
        if(letters !== 'profile') {
            if(loggedUser) {
                if(!currentProfile) {
                    dispatch(setProfileOnPage(loggedUser))
                    dispatch(getUserStatusInProfile(loggedUser))
                }
                return
            }
        }
        let idFromURL = location.pathname.replace(/\D/g,'')
        if(idFromURL){
            dispatch(setProfileOnPage(+idFromURL))
            dispatch(getUserStatusInProfile(+idFromURL))
            return
        } else {
            if(loggedUser) {
                dispatch(setProfileOnPage(loggedUser))
                dispatch(getUserStatusInProfile(loggedUser))
            }
        }
        /*if (!isShowMyProfile) {
            if (isAuth && +idFromURL === loggedUser) {
                setMyProfile(true)
            }
            if (isAuth && !idFromURL && loggedUser) {
                setMyProfile(true)
            }
        }*/
    }, [location.pathname])

    if (!isAuth && !location.pathname) return <Navigate to={'/login'} />

    return (
        <div style={{width:"100px", height:"100px", backgroundColor:"red"}}>
            HELLO
        </div>
    );
};

export default HeaderRouter;