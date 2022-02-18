

export const isAuth = () =>{
    if(sessionStorage.getItem("isUserLogged"))
        return true;
    else
        return false;
}