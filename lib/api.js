import { API_URL } from './constants';

// unversal request function
// -------------------------

export const getAPIResponse = async (opt = {}) => {
    // defaults
    const {
        method = 'GET',
        endpoint = '',
        formData = null,
        token = false,
        simpleResponse = true
    } = opt;

    // set url
    const url = API_URL + endpoint;

    // set request options
    let requestOptions = { method: method };
    if (formData) {
        requestOptions['body'] = formData;
    }
    if (token) {
        requestOptions['headers'] = {
            Authorization: 'Token ' + token
        };
    }
    requestOptions['referrerPolicy'] = 'unsafe_url';

    console.log({
        'Connecting to host': process.env.BACKEND_SERVER_HOST,
        'Fetch URL': url,
        'Fetch Options': requestOptions
    });

    // try catch response
    try {
        const response = await fetch(url, requestOptions);
        const responseBody = await response.json();

        console.log({
            body: responseBody,
            status: response.status,
            statusText: response.statusText
        });

        if (simpleResponse) {
            return responseBody;
        } else {
            return {
                body: responseBody,
                status: response.status,
                statusText: response.statusText
            };
        }
    } catch (error) {
        console.error(error);
        return {
            error: `Connection to database host ${process.env.BACKEND_SERVER_HOST} failed.`
        };
    }
};

// STATIC PAGES
// ------------

export async function getHomePageAPI() {
    return await getAPIResponse({
        endpoint: 'home'
    });
}
export async function getAboutPageAPI() {
    return await getAPIResponse({
        endpoint: 'about'
    });
}
export async function getLoginPageAPI() {
    return await getAPIResponse({
        endpoint: 'login'
    });
}
export async function getRegisterPageAPI() {
    return await getAPIResponse({
        endpoint: 'register'
    });
}

// STATIC PAGE + AUTH
// ------------------

export async function getRecordPageAPI(token) {
    return await getAPIResponse({
        endpoint: 'posts/new',
        token: token,
        simpleResponse: false
    });
}

// POSTS
// -----

// list

export async function getPostsListAPI() {
    return await getAPIResponse({
        endpoint: 'posts/list'
    });
}

// create

export async function createPostAPI(token, formData) {
    return await getAPIResponse({
        endpoint: 'posts/new',
        method: 'POST',
        token: token,
        simpleResponse: false,
        formData: formData
    });
}

// posts delete

export async function deletePostAPI(token, id) {
    return await getAPIResponse({
        endpoint: 'posts/delete/' + id,
        method: 'DELETE',
        token: token,
        simpleResponse: false
    });
}

// USERS
// -----

// login

export async function loginUserAPI(formData) {
    return await getAPIResponse({
        endpoint: 'login',
        method: 'POST',
        formData: formData
    });
}

// register

export async function registerUserAPI(formData) {
    return await getAPIResponse({
        endpoint: 'register',
        method: 'POST',
        simpleResponse: false,
        formData: formData
    });
}
