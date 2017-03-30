require('dotenv').config();

module.exports = pullRequest => {
  if (
    pullRequest.base.ref === process.env.GITHUB_DEVELOPMENT_BRANCH
  ) {
    /**
      ADD: && pullRequest.merged
      If the branch was merged, start the lookup for
      merges going to master.
    */
  }
}
