import queryString from 'query-string';
import config from 'config/config'
import { getCookie } from './Cookies';

export default class KushyApi {
    constructor() {
        this.domain = config.kushyApiUrl
        this.headers = { Accept: "application/json", "Content-Type": "application/json" };
        this.fetch = this.fetch.bind(this)
        this.getState = this.getState.bind(this)
        this.getShopsByLocation = this.getShopsByLocation.bind(this)
        this.getAll = this.getAll.bind(this)
    }

    /**
     * Grabs token from cookies and applies to token
     * 
     * @param {object} ctx 
     */
    getToken(ctx = null) {
        this.setToken(getCookie("kushyFToken", ctx));
    }

    /**
     * Adds the token to fetch auth headers
     * 
     * @param {string} token - JWT token
     */
    setToken(token) {
        this.headers["Authorization"] = "Bearer " + token;
    }

    getState(state) {
        return this.fetch(`${this.domain}/states/${state}`, {
            method: 'GET'
        }).then(res => {
            return Promise.resolve(res)
        })
    }

    getAll(section, params = null)
    {
        const url = params ? `${this.domain}/${section}/${params}` : `${this.domain}/${section}/`
        return this.fetch(url, {
            method: 'GET'
        }).then(res => {
            return Promise.resolve(res)
        })
    }

    getShopsByLocation(lat, lng)
    {
        return this.fetch(`${this.domain}/location/${lat}/${lng}`, {
            method: 'GET'
        }).then(res => {
            return Promise.resolve(res)
        })
    }

    getPostsByCategory(section, category, page = 1)
    {
        let params = {}
        params.page = page

        const filter = queryString.stringify(params);

        const url = `${this.domain}/${section}/category/${category}/?${filter}`
        return this.fetch(url, {
            method: 'GET'
        }).then(res => {
            return Promise.resolve(res)
        })
    }

    search(field, search)
    {
        const url = `${this.domain}/search/posts/?filter[${field}]=${search}`
        return this.fetch(url, {
            method: 'GET'
        }).then(res => {
            return Promise.resolve(res)
        })
    }

    getProfile(section, slug) {
        const url = `${this.domain}/${section}/slug/${slug}`
        return this.fetch(url, {
            method: 'GET'
        }).then(res => {
            return Promise.resolve(res)
        })
    }

    getInventory(slug) {
        const url = `${this.domain}/inventory/menu/${slug}`
        return this.fetch(url, {
            method: 'GET'
        }).then(res => {
            return Promise.resolve(res)
        })
    }

    /**
     * Gets the reviews from a specific post by ID
     * 
     * @param {string - UUID} id 
     */
    getReviews(id) {
        const url = `${this.domain}/reviews/post/${id}`
        return this.fetch(url, {
            method: 'GET'
        }).then(res => {
            return Promise.resolve(res)
        })
    }

    postReview(formData) {
        const url = `${this.domain}/reviews/`
        return this.fetch(url, {
          method: "POST",
          body: JSON.stringify(formData)
        }).then(res => {
            console.log(res)
          return Promise.resolve(res);
        });
    }

    /**
     * Grabs photos from specific post
     * 
     * @param {string} UUID of post 
     * @returns {Promise} Resolved promise of JSONifed results
     */
    getPhotos(id) {
        const url = `${this.domain}/photos/post/${id}`
        return this.fetch(url, {
            method: 'GET'
        }).then(res => {
            return Promise.resolve(res)
        })
    }

    /**
     * Gets user profile data 
     * (requires a JWT token set)
     * 
     * @returns {Promise} Resolved promise of JSONifed results
     */
    getUser() {
        const url = `${this.domain}/user/`
        return this.fetch(url, {
            method: 'GET'
        }).then(res => {
            return Promise.resolve(res)
        })
    }

    /**
     * Gets user profile data 
     * (requires a JWT token set)
     * 
     * @returns {Promise} Resolved promise of JSONifed results
     */
    getUserActivity(page = 1, include = 'bookmarks,reviews,post') {
        const url = `${this.domain}/activity/?page=${page}&include=${include}`;
        return this.fetch(url, {
            method: 'GET'
        }).then(res => {
            return Promise.resolve(res)
        })
    }

    /**
     * Gets user profile data 
     * (requires a JWT token set)
     * 
     * @returns {Promise} Resolved promise of JSONifed results
     */
    getUserReviews(page = 1, include = 'post') {
        const url = `${this.domain}/reviews/user/?page=${page}&include=${include}`;
        return this.fetch(url, {
            method: 'GET'
        }).then(res => {
            return Promise.resolve(res)
        })
    }

    async fetch(url, options) {
        // performs api calls sending the required authentication headers
        const headers = this.headers
        return await fetch(url, {
                headers,
                ...options
            })
            // .then(this.auth._checkStatus)
            .then(response => response.json())
    }
}