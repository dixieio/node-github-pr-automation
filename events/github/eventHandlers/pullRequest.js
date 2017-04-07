require('dotenv').config();
const axios = require('axios');
const moment = require('moment');
const Auth = require('../../../oauth/auths');

const getPullsUrl = (url, exsistingPr) => {
  if (exsistingPr) {
    return url.replace('{/number}', `/${exsistingPr.number}`);
  }
  return url.replace('{/number}', '')
};

const getPullRequestBody = (pr, exsistingPr) => {
  if (exsistingPr) {
    return `${exsistingPr.body}\r\n\r\n### Added branch: ${pr.title}, #${pr.number} - Merged to dev: ${moment(new Date()).format('Do MMMM YYYY')}, by ${pr.user.login}\r\n${pr.body}`
  }

  return `### Added branch: ${pr.title}, #${pr.number} - Merged to dev: ${moment(new Date()).format('Do MMMM YYYY')}, by ${pr.user.login}\r\n${pr.body}`
}

const handlePullRequest = (pr, exsistingPr) => {
  const github = Auth.getAuth('github');
  const method = exsistingPr ? 'patch' : 'post';

  const url = `${getPullsUrl(pr.base.repo.pulls_url, exsistingPr)}?client_secret=${process.env.GITHUB_CLIENT_SECRET}&client_id=${process.env.GITHUB_CLIENT_ID}`;

  '# Release of cool stuff\r\n\r\n#### Added branch: Branch name - Date, by Nopzen\r\n1. Branch\r\n2. Body'
  let prObject = {
    title: 'Release',
    body: getPullRequestBody(pr, exsistingPr)
  }

  if (method === 'post') {
    prObject = Object.assign(prObject, {
      head: process.env.GITHUB_DEVELOPMENT_BRANCH,
      base: process.env.GITHUB_PROD_BRANCH,
    });
  }

  axios[method](url, prObject, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `token ${github.accessToken}`
    }
  }).then(res => {
  }).catch(err => {
    throw err;
  });
}

module.exports = pullRequest => {
  if (
    pullRequest.base.ref === process.env.GITHUB_DEVELOPMENT_BRANCH
    && pullRequest.merged
  ) {
    const pullsUrl = getPullsUrl(pullRequest.base.repo.pulls_url);

    axios.get(pullsUrl)
      .then(res => {
        let exsistingPr = null;

        res.data.forEach(pull => {
          if (
            pull.base.ref === process.env.GITHUB_PROD_BRANCH
            && pull.head.ref === process.env.GITHUB_DEVELOPMENT_BRANCH
          ) {
            console.info(`
              Pullrequest from ${process.env.GITHUB_PROD_BRANCH} to ${process.env.GITHUB_DEVELOPMENT_BRANCH}
              found with number: ${pull.number}
            `);
            exsistingPr = pull;
          }
        });

        handlePullRequest(pullRequest, exsistingPr);
      })
      .catch(err => {
        throw err;
      });
  }
}
