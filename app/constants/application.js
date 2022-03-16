let DOMAIN = 'http://localhost:3000/'
let constants = {
    HEADERS: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    URL: {
        SIGN_IN : DOMAIN + 'sign_in',
        SIGN_OUT: DOMAIN + 'sign_out',
        CREATE_USER: DOMAIN + 'users',
        GET_ALL_POSTS: DOMAIN + 'posts',
        GET_POST_TYPES: DOMAIN + 'post-types',
        CREATE_POST: DOMAIN + 'posts',
        GET_SPECIFIC_POST: DOMAIN + 'posts/',
        ADD_COMMENT: DOMAIN + 'posts/comments',
        ADD_LIKE: DOMAIN + 'posts/likes',
        REMOVE_LIKE: DOMAIN + 'posts/likes/',
        GET_CURRENT_USER: DOMAIN + 'current_user',
        GET_SPECIFIC_USER: DOMAIN + 'users/profile/',
        GET_USER_SPECIFIC_POSTS: DOMAIN + 'users/posts/',
        DELETE_POST: DOMAIN + 'posts/',
        EDIT_POST: DOMAIN + 'posts/'
    },
    ERRORMESSAGES: {
        email: 'Email is already taken or empty',
        password: 'Password must be strong and greater than 5 characters',
        name: 'User name must not be empty'
    },
    COOKIES: {
        USER: 'user',
        BACKEND_SESSION: '_blog-backend_session'
    },
    POST:'POST',
    GET:'GET',
    DELETE:'DELETE',
    PUT:'PUT'
}
export default constants;