import { API_URL } from "./constants";

// general request function
// ------------

async function apiRequest(url) {
    let results = null;

    const res = await fetch(url)
        .then((response) => {
            results = response.json();
        })
        .catch((error) => {
            console.error(error);
        });

    return results;
}

// applications: LISTS
// ------------

export async function getAllPostsData(category_id = null) {
    const endpoint = "posts";

    const params = category_id
        ? "?_fields=id,slug,title,featured_media,categories&categories=" + category_id
        : "?_fields=id,slug,title,featured_media,categories";
    return await apiRequest(API_URL + endpoint + params);
}

export async function getAllCategoriesData() {
    const endpoint = "categories";
    const params = "?_fields=id,name,slug,acf";
    return await apiRequest(API_URL + endpoint + params);
}

export async function getAllMediaData() {
    const endpoint = "media";
    // const params = "?_fields=id,guid,alt_text,description&per_page=100";
    const params = "?_fields=id,guid,alt_text&per_page=100";
    return await apiRequest(API_URL + endpoint + params);
}

export async function getFeaturedPostsData() {
    const endpoint = "posts";
    const params =
        "?sticky=true&per_page=2&_fields=id,slug,title,featured_media,categories";
    return await apiRequest(API_URL + endpoint + params);
}

// applications: SINGLES
// ------------

export async function getMediaData(id) {
    const endpoint = "media/" + id;
    const params = "?_fields=id,guid,alt_text&per_page=100";
    return await apiRequest(API_URL + endpoint + params);
}

export async function getPostData(slug) {
    // search for post
    const endpoint = "posts";
    const params =
        "?slug=" +
        slug +
        "&_fields=title,featured_media,categories,content.rendered,date,yoast_head";
    const results = await apiRequest(API_URL + endpoint + params);
    const post = results[0];

    // get post featured image
    const media_id = post.featured_media;
    const media_obj = await getMediaData(media_id);

    // get post categories
    const category_array = [];

    for await (const catId of post.categories) {
        const category = await getCategoryDataById(catId);
        category_array.push(category);
    }

    return {
        post: post,
        media: media_obj,
        categories: category_array,
    };
}

export async function getCategoryDataById(id) {
    const endpoint = "categories/" + id;
    const params = "?_fields=id,name,slug";
    return await apiRequest(API_URL + endpoint + params);
}

// const res = await fetch( url,
//     {
//         chache: "no-store",
//     }
// );
// const res = await fetch( url,
//     {
//         next: { revalidate: 60 }
//     }
// );
