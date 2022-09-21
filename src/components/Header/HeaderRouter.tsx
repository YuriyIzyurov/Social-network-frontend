import React, {useEffect} from 'react';
import {useLocation} from "react-router-dom";
import {Navigate} from "react-router";
import {getCurrentProfile, getId, getAuth} from "redux/Selectors";
import {useSelector} from "react-redux";
import {useAppDispatch} from "redux/reduxStore";
import {getUserStatusInProfile, setProfileOnPage, handlingSidebarUsers} from "redux/Reducers";

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
            return
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
            return
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
                dispatch(handlingSidebarUsers())
            }
        }
    }, [location.pathname])

    if (!isAuth && !location.pathname) return <Navigate to={'/login'} />

    return (
        <div></div>
    );
};

export default HeaderRouter;