const {
    expect,
    it,
    describe
} = require("@jest/globals");

import nodeFetch from "node-fetch"; // pobieram paczkę
global.fetch = nodeFetch; // przypisuję do fetch pobraną paczkę, w Node.js global === window

import GitHubSDK from '../src/GitHubSDK';

describe('verifyUser:', () =>{
    it('should return when unauthorized access', async () => {
        expect.assertions(1);
        const github = new GitHubSDK('kowackag', 'ghp_1TnRwWvtT1XSiUakQQEP75PtYgTvG61tdau');
        return github.verifyUser().catch(err => {
            expect(err.message).toBe('Unauthorized access');
        })
    })
    
    it('should inform when access is OK', async () => {
        expect.assertions(1);
        const github = new GitHubSDK('kowackag', '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');
        return github.verifyUser().then(result => {
            expect(result).toBe(200);
        })
    })
})

describe('getUser:', () =>{
    it('should return user login', async () => {
        expect.assertions(1);
        const github = new GitHubSDK('kowackag', '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');
        const {
            login
        } = await github.getUser('kowackag');
         expect(login).toBe('kowackag');
    })
    
    it('should inform when user is not exist', async () => {
        expect.assertions(1);
        const github = new GitHubSDK('kowackag', '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');
        return github.getUser('devmentor-pol').catch(err => {
            expect(err.message).toBe('The user was not found');
        })
    })
})
describe('getRepo:', () =>{
    it('should inform about account of repositorium', async () => {
        expect.assertions(1);
        const github = new GitHubSDK('kowackag', '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');
        return github.getRepo('devmentor-pl').then(result => {
            expect(result.length).toBe(30);
        })
    })
    
    it('should inform about user was not found', async () => {
        expect.assertions(1);
        const github = new GitHubSDK('kowackag', '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');
        return github.getRepo('devmentor-pol').catch(err => {
            expect(err.message).toBe('Some Error. Check user name');
        })
    })
})

