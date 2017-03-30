/**
  WEBHOOK IDENTIFYER
  For github this is defined in the headers
  of the post request, and determins
  the event hook event
*/

const GITHUB_EVENT_HEADER = 'x-github-event';

/**
 GITHUB HOOK EVENTS
 found in the headers of post requests.
*/

const GITHUB_EVENT_PULL_REQUEST = 'pull_request';

/**
  APPROVED GITHUB EVENTS:
  pull_request
*/

const APPROVED_EVENTS = [
  GITHUB_EVENT_PULL_REQUEST
];

const approvedEvent = name => {
  return APPROVED_EVENTS.findIndex(event => event === name) > -1;
}

module.exports = (req, res) => {
  if(
    !req.headers[GITHUB_EVENT_HEADER]
    || !approvedEvent(req.headers[GITHUB_EVENT_HEADER])
  ) {
    return res.sendStatus(400);
  } else if (req.headers[GITHUB_EVENT_HEADER] === GITHUB_EVENT_PULL_REQUEST) {
    console.log('Handle Pull Request.');
  }

  res.status(200);
}
