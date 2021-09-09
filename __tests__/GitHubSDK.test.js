const {
    expect,
    it,
    describe
} = require("@jest/globals");

import nodeFetch from "node-fetch"; // pobieram paczkę
global.fetch = nodeFetch; // przypisuję do fetch pobraną paczkę, w Node.js global === window

import GitHubSDK from '../src/GitHubSDK';

describe('verifyUser:', () => {
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

describe('getUser:', () => {
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
describe('getRepo:', () => {
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

describe('sendInvitation:', () => {
    it('should inform when invitation was created', async () => {
        expect.assertions(1);
        const github = new GitHubSDK('kowackag', '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');
        return github.sendInvitation('Four-card-feature-section', 'devmentor-pl').then(result => {
            expect(result).toBe(201);
        })
    })

    it('should inform when person is already a collaborator', async () => {
        expect.assertions(1);
        const github = new GitHubSDK('kowackag', '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');
        return github.sendInvitation('task-js-testing', 'devmentor-pl').catch(err => {
            expect(err.message).toBe('person is already a collaborator');
        })
    })
    
    it('should inform about some error', async () => {
        expect.assertions(1);
        const github = new GitHubSDK('kowackag', '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');
        return github.sendInvitation('task-js-testing', 'devmentor-pol').catch(err => {
            expect(err.message).toBe('Some error. Check data');
        })
    })
})