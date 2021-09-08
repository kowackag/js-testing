class GitHubSDK {

    constructor(nick, secret) {
        this.url = `https://api.github.com`;
        this.nick = nick;
        this.secret = secret;
    }
    loadData() {
        return this._fetch()
    }

    verifyUser() {
        const url = this.url + '/user'
        const options = {
            headers: {
                Accept: 'application/vnd.github.v3+json',
                Authorization: `token ${this.secret}`,
            },
            body: JSON.stringify(),
        }

        return fetch(url, options).then(resp => {
            if (resp.ok) {
                return resp.status;
            } else if (resp.status === 401) {
                throw new Error('Unauthorized access')
            }
            return new Promise.reject(resp);
        })
    }

    getUser(user) {
        const options = {
            headers: {
                Accept: 'application/vnd.github.v3+json',
                // Authorization: `token ${this.secret}`,
            },
            body: JSON.stringify(),
        }
        return this._fetch(options, `/users/${user}`)
    }

    getRepo(user) {
        const options = {
            headers: {
                Accept: 'application/vnd.github.v3+json',
                // Authorization: `token ${this.secret}`,
            },
            body: JSON.stringify(),
        }
        return this._fetch(options, `/users/${user}/repos`)
    }

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