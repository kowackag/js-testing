class GitHubSDK {
    construktor(nick, secret) {
        this.url = `https://api.github.com`;
        this.nick = nick;
        this.secret = secret;
    }
    loadData() {
        return this._fetch()
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