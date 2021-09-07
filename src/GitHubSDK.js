// import {
//     require
// } from "yargs";

// global.fetch = require("node-fetch");
// global.fetch = require("node-fetch").default;



class GitHubSDK {

    construktor(nick) {
        this.url = `https://api.github.com`;
        this.nick = nick;
        // this.secret = secret;

        // this.fetch = require("node-fetch")
    }
    // loadData() {
    //     return this._fetch()
    // }

    // sendInvitation(repo, user) {
    //     const options = {
    //         method: 'PUT',
    //         credentials: 'same-origin',
    //         redirect: 'follow',
    //         headers: {
    //             Accept: 'application/vnd.github.v3+json',
    //             Authorization: `token ${this.secret}`,
    //         },
    //         body: JSON.stringify({
    //             permission: 'pull'
    //         }),
    //     }
    //     return this._fetch(options, `/${repo}/collaborators/${user}`);
    // }
    getUser(user) {
        const secret = `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`;

        const options = {
            method: 'GET',
            headers: {
                Accept: 'application/vnd.github.v3+json',
                Authorization: `token ${secret}`,
            },
            body: JSON.stringify(),
        }
        return this._fetch(options, `/users/${user}`)
    }

    _fetch(options, additionalPath = '') {
        const url = this.url + additionalPath;
        return fetch(url, options)
            .then(resp => {
                if (resp.ok) {
                    return resp.json();
                }
                return Promise.reject(resp);
            });
    }
}

export default GitHubSDK;