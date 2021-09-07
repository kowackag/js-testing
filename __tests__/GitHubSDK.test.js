const {
    expect,
    it,
    describe
} = require("@jest/globals");

// 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

global.fetch = require("node-fetch");

import GitHubSDK from '../src/GitHubSDK';

// global.fetch = require("node-fetch");

it('should return user', async () => {

    const github = new GitHubSDK('kowackag');
    const result = await github.getUser('kowackag');
    expect(result).toBe('kowackag');
})