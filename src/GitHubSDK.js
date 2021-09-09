class GitHubSDK {

    constructor(nick, secret) {
        this.url = `https://api.github.com`;
        this.nick = nick;
        this.secret = secret;
    }
  
    verifyUser() {
        const url = this.url + '/user'
        const options = {   // powtarza się czy mnie powinnam przeniesc do constructor? 
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
        const url = this.url + `/users/${user}`
        const options = {
            headers: {
                Accept: 'application/vnd.github.v3+json',
                Authorization: `token ${this.secret}`,
            },
            body: JSON.stringify(),
        }
        return fetch(url, options).then(resp => {
            if (resp.ok) {
                return resp.json();
            } else if (resp.status === 404) {
                throw new Error('The user was not found')
            }
            return new Promise.reject(resp);
        })
    }

    getRepo(user) {
        const url = this.url + `/users/${user}/repos`
        const options = {
            headers: {
                Accept: 'application/vnd.github.v3+json',
                Authorization: `token ${this.secret}`,
            },
            body: JSON.stringify(),
        }

        return fetch(url, options).then(resp => {
            if (resp.ok) {
                return resp.json();
            } else if (!resp.ok) {
                throw new Error('Some Error. Check user name')
            }
            return new Promise.reject(resp);
        })
    }

    sendInvitation(repo, user) {
        const url = this.url + `/repos/${this.nick}/${repo}/collaborators/${user}`
        const options = {
            method: 'PUT',
            credentials: 'same-origin',
            redirect: 'follow',
            headers: {
                Accept: 'application/vnd.github.v3+json',
                Authorization: `token ${this.secret}`,
            },
            body: JSON.stringify({
                permission: 'pull'
            }),
        }
        return fetch(url, options).then(resp => {
            if (resp.ok) {
                if (resp.status === 204) {
                    throw new Error('person is already a collaborator')
                }
                return resp.status;
            } else if (!resp.ok) {
                throw new Error('Some error. Check data')
            }
            return new Promise.reject(resp);
        })
    }
}

export default GitHubSDK;