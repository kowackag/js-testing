const {
    expect,
    it,
    describe
} = require("@jest/globals");

// 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

import nodeFetch from "node-fetch"; // pobieram paczkę
global.fetch = nodeFetch; // przypisuję do fetch pobraną paczkę, w Node.js global === window

import GitHubSDK from '../src/GitHubSDK';

it('should return when unauthorized access', async () => {
    expect.assertions(1);
    const github = new GitHubSDK('kowackag', 'ghp_1TnRwWvtT1XSiUakQQEP75PtYgTvG61tdau');
    return github.verifyUser().catch(err => {
        expect(err.message).toBe('Unauthorized access');
    })
})

it('should inform when access is OK', async () => {
    const github = new GitHubSDK('kowackag', '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');
    return github.verifyUser().then(result => {
        expect(result).toBe(200);
    })
})

it('should return user', async () => {
    expect.assertions(1);
    const github = new GitHubSDK('kowackag', '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');
    const {
        login
    } = await github.getUser('devmentor-pl');
    expect(login).toBe('devmentor-pl');
})

// it('should inform when user is not exist', async () => {
//     const github = new GitHubSDK();
//     return github.getUser('devmentor-pl').catch(err => {
//         expect(err.statusText).toBe('Not Found');
//     })
// })

it('should inform account of repositorium', async () => {
    expect.assertions(1);
    const github = new GitHubSDK('kowackag', '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');
    // await github.getUser('kowackag');
    return github.getRepo('devmentor-pl').then(result => {
        expect(result.length).toBe(23);
    })
})

