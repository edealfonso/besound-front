import { API_URL } from './constants';

// general request function
// ------------

async function APIGETRequest(endpoint) {
    const url = API_URL + endpoint;

    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}

// STATIC
// ------------
export async function getHomePageAPI() {
    return await APIGETRequest('home');
}
export async function getRecordPageAPI() {
    return await APIGETRequest('posts/new');
}
export async function getAboutPageAPI() {
    return await APIGETRequest('about');
}
export async function getLoginPageAPI() {
    return await APIGETRequest('login');
}
export async function getRegisterPageAPI() {
    return await APIGETRequest('register');
}

// POSTS
// ------------

// posts list

export async function getPostsListAPI() {
    return await APIGETRequest('posts/list');
}

// posts create

export async function createPostAPI(formData) {
    const url = API_URL + 'posts/new';
    const method = 'POST';
    let headers = {
        // "Content-Type": "multipart/form-data",
        // "Content-Type": "application/x-www-form-urlencoded",
        // "Content-Type": "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW",
        Authorization: 'Token c165e25a1761920231e4e13597793530280990bb'
    };

    try {
        // // Get CSRF token + Add CSRF token to headers
        // const responseToken = await fetch(apiURL + 'csrf_token/', {
        //     headers,
        //     credentials: "include",  // Include credentials (cookies) in the request
        //     ...options,
        // });
        // const data = await responseToken.json();
        // headers['X-CSRFToken'] = data.csrf_token;

        // Make POST request
        const response = await fetch(url, {
            method: method,
            headers: headers,
            // data: formData,
            body: formData
        });
        const responseBody = await response.json();

        return {
            data: responseBody,
            status: response.status,
            statusText: response.statusText
        };
    } catch (error) {
        console.error(error);
        return null;
    }
}

// posts delete

export async function deletePostAPI(id) {
    const url = API_URL + 'posts/delete/' + id;
    const method = 'DELETE';
    let headers = {
        Authorization: 'Token c165e25a1761920231e4e13597793530280990bb'
    };

    try {
        const response = await fetch(url, {
            method: method,
            headers: headers
        });
        const responseBody = await response.json();

        return {
            data: responseBody,
            status: response.status,
            statusText: response.statusText
        };
    } catch (error) {
        console.error(error);
        return null;
    }
}

// USERS
// ------------

export async function loginUserAPI() {
    return await APIGETRequest('login');
}
export async function registerUserAPI() {
    return await APIGETRequest('register');
}
