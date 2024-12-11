const appConstants = {
    accessTokenKey: "accessToken",
    refreshTokenKey: "refreshToken",
    localStorageKeyIsSessionSave:"IsSessionSave",
    localStorageKeyFontSize: "fontSize",
    localStorageKeyCurrentUser:"currentUser",
    localStorageKeyIsDropdownOnHover:"isDropdownOnHover",
    localStorageKeyTheme:"theme",
    availableThemes:["light","dark"],
    googleClientId:process.env.REACT_APP_GOOGLE_AUTH_KEY,
    fontSizeMin:14,
    fontSizeMax:18,
    fontSizeStep:1,

}

export {appConstants}