# Contributing

## First step

### Install the dependencies

Run `npm i` to install the dependencies.  
It will also create the Git hooks with Husky if you Git version is recent enough.

Install the Git hooks to lint the code when creating commits.  
Run `npm run install-git-hooks`.

Run `npm run start` to start the local development server.

## Git

### Alias

This project uses an alias to push automatically with the upstream option set.  
The configuration of the alias is a [local one](.gitconfig).

This alias is used by the `cz` script to automatically push on the remote with a dynamic branch name.

**Troubleshooting:**

If the command `push-upstream` does not exists, you can link it to your git:  
Run `git config --local include.path ../.gitconfig`.

**_Note:_**

The error should be something like:

`git: 'push-upstream' is not a git command. See 'git --help'.`

## Commit Message Guidelines

We have very precise rules over how our git commit messages can be formatted.  
This leads to **more readable messages** that are easy to follow when looking through the **project history**.

### Commit Message Format

Each commit message consists of a **header**, a **body** and a **footer**.  
The header has a special
format that includes a **type**, a **scope** and a **subject**:

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

The **type** and the **subject** are mandatory.  
All the other stuff is optional.

Any line of the commit message cannot be longer 144 characters!  
This allows the message to be easier to read on GitHub as well as in various git tools.

### Revert

If the commit reverts a previous commit, it should begin with `revert: `, followed by the header of the reverted commit.  
In the body it should say: `This reverts commit <hash>.`, where the hash is the SHA of the commit being reverted.

### Type

Must be one of the following:

- **feat** : A new feature
- **fix** : A bug fix
- **style** : Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf** : A code change that improves performance
- **test** : Adding missing tests or correcting existing tests
- **build** : Changes that affect the build system, CI configuration or external dependencies
- **docs** : Changes that affect the documentation
- **chore** : Anything else

### Scope

The scope could be anything specifying place of the commit change.  
For example `datepicker`, `dialog`, `app`, etc.

### Subject

The subject contains succinct description of the change:

- use the imperative, present tense: "change" not "changed" nor "changes"
- don't capitalize first letter
- no dot (.) at the end

### Body

Just as in the **subject**, use the imperative, present tense: "change" not "changed" nor "changes".  
The body should include the motivation for the change and contrast this with previous behaviour.

### Footer

The footer should contain any information about **Breaking Changes**.

**Breaking Changes** should start with the word `BREAKING CHANGE:` with a space or two newlines.  
The rest of the commit message is then used for this.

## Stale

### Always build before committing

Everytime you alter the code base, the action may change.  
To trigger some possible mistakes as soon as possible, it's preferable to always build the action before creating a commit.  
You can do that by running `npm run build`.

Note that the CI build step will perform a difference check and will be considered as failing if one is found.  
Also, the local version of this stale action is tested also in the CI in every single branch in a dry-run mode.

### Website

It's very important for us to keep a documentation and a [website](https://sonia-stale-action.vercel.app/docs/introduction) up-to-date.  
So please, check everything before creating a pull request.  
You may also need to run the translations scripts (from the documentation package).  
You can do that by running `npm run write-translations` and `npm run write-translations:french`.

Note that the CI build step will perform a difference check and will be considered as failing if one is found.  
Note that we also have a [blog](https://sonia-stale-action.vercel.app/blog) so don't hesitate to suggest a new entry, or create a new [ticket](https://github.com/Sonia-corporation/stale/issues/new?assignees=C0ZEN&labels=blog-request+%3Anewspaper%3A&template=blog_article.md&title=%5BBLOG%5D+).

### GitHub API

This action is using GraphQL to perform the GitHub API calls.  
Refer to the [explorer playground](https://docs.github.com/en/graphql/overview/explorer) to test your queries before.

## Implementation

To help us have a clear vision over the workflow and also for you if you are just curious.

### Initialization

- Reach and parse the inputs from the job
- Authenticate to GitHub API by using the `github-token`

### Issues

- Check if the issues processing is enabled and stop the processing if this is the case (coming from the `issue-processing` input)
- Fetch all the open issues per batch of 20, sorted by update date from the oldest first
- Check if the issue can be processed
  - If the issues API queries calls performed are below the limit (coming from the `issue-limit-api-queries-count`), stop the processing
  - If the issues API mutations calls performed are below the limit (coming from the `issue-limit-api-mutations-count`), stop the processing
- Check if the issue is locked and stop the processing if this is the case
- Check if the issue has a label (except the stale one) and stop the processing if this is the case (coming from the `issue-ignore-all-labels` input)
- Check if the issue has any of the ignored labels and stop the processing if this is the case (coming from the `issue-ignore-any-labels` input)
- Check if the issue has an assignee and stop the processing if this is the case (coming from the `issue-ignore-all-assignees` input)
- Check if the issue has any of the ignored assignees and stop the processing if this is the case (coming from the `issue-ignore-any-assignees` input)
- Check if the issue has a project card and stop the processing if this is the case (coming from the `issue-ignore-all-project-cards` input)
- Check if the issue has any of the ignored project cards and stop the processing if this is the case (coming from the `issue-ignore-any-project-cards` input)
- Check if the issue has any of the ignored milestones and stop the processing if this is the case (coming from the `issue-ignore-any-milestones` input)
- Check if the issue has a milestone and stop the processing if this is the case (coming from the `issue-ignore-all-milestones` input)
- Check if the issue creation date is before x date and stop the processing if this is the case (coming from the `issue-ignore-before-creation-date` input)
- Check if the input `issue-only-any-project-cards` contains some project cards. If this is the case and the issue has at least one project card matching linked to it, the processing will continue, else the processing will stop.
- Check if the input `issue-only-any-milestones` contains some milestones. If this is the case and the issue has at least one milestone matching linked to it, the processing will continue, else the processing will stop.
- Check if the input `issue-only-any-assignees` contains some assignees. If this is the case and the issue has at least one assignee matching linked to it, the processing will continue, else the processing will stop.
- Check if the input `issue-only-with-assignees` contains some assignees. If this is the case and the issue has at least one assignee linked to it, the processing will continue, else the processing will stop.
- Check if the input `issue-only-with-milestones` contains some milestones. If this is the case and the issue has at least one milestone linked to it, the processing will continue, else the processing will stop.
- Check if the input `issue-only-with-project-cards` contains some project cards. If this is the case and the issue has at least one project card linked to it, the processing will continue, else the processing will stop.
- Check if the issue has already a stale state (stale label)
  - If the issue has a stale label, check if it was updated after the addition of the stale label
    - If it was updated, remove the stale state (stale label) and stop the processing
    - Else, check if issue last update is older than X days (coming from `issue-days-before-close`)
      - If it is old, close the issue (using the close reason coming from `issue-close-reason`)
      - Check if the action should also add a comment (coming from the `issue-close-comment` input)
        - When the input value is not empty, add a comment
      - Check if the action should also add extra labels (coming from the `issue-add-labels-after-close` input)
        - When the input value is filled list, add the listed labels
      - Check if the action should also remove extra labels (coming from the `issue-remove-labels-after-close` input)
        - When the input value is filled list, remove the listed labels
- Check if the issue last update is older than X days (coming from the `issue-days-before-stale`)
- If the issue last update is older than X days (coming from the `issue-days-before-stale`)
  - Check if the action should also add a comment (coming from the `issue-stale-comment` input)
    - When the input value is not empty, add a comment
  - Check if the action should also add extra labels (coming from the `issue-add-labels-after-stale` input)
    - When the input value is filled list, add the listed labels
  - Check if the action should also remove extra labels (coming from the `issue-remove-labels-after-stale` input)
    - When the input value is filled list, remove the listed labels
  - Add a label to stale (coming from the `issue-stale-label` input, ignored in `dry-run` mode)
- When the batch was processed, go to the next one and proceed again

### Pull requests

- Check if the pull requests processing is enabled and stop the processing if this is the case (coming from the `pull-request-processing` input)
- Fetch all the open pull requests per batch of 20, sorted by update date from the oldest first
- Check if the pull request can be processed
  - If the pull requests API queries calls performed are below the limit (coming from the `pull-request-limit-api-queries-count`), stop the processing
  - If the pull requests API mutations calls performed are below the limit (coming from the `pull-request-limit-api-mutations-count`), stop the processing
- Check if the pull request is locked and stop the processing if this is the case
- Check if the pull request has a label (except the stale one) and stop the processing if this is the case (coming from the `pull-request-ignore-all-labels` input)
- Check if the pull request has any of the ignored labels and stop the processing if this is the case (coming from the `pull-request-ignore-any-labels` input)
- Check if the pull request has an assignee and stop the processing if this is the case (coming from the `pull-request-ignore-all-assignees` input)
- Check if the pull request has any of the ignored assignees and stop the processing if this is the case (coming from the `pull-request-ignore-any-assignees` input)
- Check if the pull request has a project card and stop the processing if this is the case (coming from the `pull-request-ignore-all-project-cards` input)
- Check if the pull request has any of the ignored project cards and stop the processing if this is the case (coming from the `pull-request-ignore-any-project-cards` input)
- Check if the pull request has any of the ignored milestones and stop the processing if this is the case (coming from the `pull-request-ignore-any-milestones` input)
- Check if the pull request has a milestone and stop the processing if this is the case (coming from the `pull request-ignore-all-milestones` input)
- Check if the pull request creation date is before x date and stop the processing if this is the case (coming from the `pull-request-ignore-before-creation-date` input)
- Check if the pull request is a draft and stop the processing if this is the case (coming from the `pull-request-ignore-draft` input)
- Check if the input `pull-request-only-any-project-cards` contains some project cards. If this is the case and the pull request has at least one project card matching linked to it, the processing will continue, else the processing will stop.
- Check if the input `pull-request-only-any-milestones` contains some milestones. If this is the case and the pull request has at least one milestone matching linked to it, the processing will continue, else the processing will stop.
- Check if the input `pull-request-only-any-assignees` contains some assignees. If this is the case and the pull request has at least one assignee matching linked to it, the processing will continue, else the processing will stop.
- Check if the input `pull-request-only-with-assignees` contains some assignees. If this is the case and the pull request has at least one assignee linked to it, the processing will continue, else the processing will stop.
- Check if the input `pull-request-only-with-milestones` contains some milestones. If this is the case and the pull request has at least one milestone linked to it, the processing will continue, else the processing will stop.
- Check if the input `pull-request-only-with-project-cards` contains some project cards. If this is the case and the pull request has at least one project card linked to it, the processing will continue, else the processing will stop.
- Check if the pull request has already a stale state (stale label)
  - If the pull request has a stale label, check if it was updated after the addition of the stale label
    - If it was updated, remove the stale state (stale label) and stop the processing
    - Else, check if pull request last update is older than X days (coming from `pull-request-days-before-close`)
      - If it is old, close the pull request
      - Check if the action should also add a comment (coming from the `pull-request-close-comment` input)
        - When the input value is not empty, add a comment
      - Check if the action should also add extra labels (coming from the `pull-request-add-labels-after-close` input)
        - When the input value is filled list, add the listed labels
      - Check if the action should also remove extra labels (coming from the `pull-request-remove-labels-after-close` input)
        - When the input value is filled list, remove the listed labels
      - Check if the action should also delete the branch (coming from the `pull-request-delete-branch-after-close` input)
        - When the input value is true, delete the branch
- Check if the pull request last update is older than X days (coming from the `pull-request-days-before-stale`)
- If the pull request last update is older than X days (coming from the `pull-request-days-before-stale`)
  - Check if the action should convert to draft or stale (coming from the `pull-request-to-draft-instead-of-stale`)
    - If the draft mode is enabled
      - Convert to draft and stop the processing
    - If the draft mode is disabled
      - Check if the action should also add a comment (coming from the `pull-request-stale-comment` input)
        - When the input value is not empty, add a comment
      - Check if the action should also add extra labels (coming from the `pull-request-add-labels-after-stale` input)
        - When the input value is filled list, add the listed labels
      - Check if the action should also remove extra labels (coming from the `pull-request-remove-labels-after-stale` input)
        - When the input value is filled list, remove the listed labels
      - Add a label to stale (coming from the `pull-request-stale-label` input, ignored in `dry-run` mode)
- When the batch was processed, go to the next one and proceed again

### Error handling

- Any error will be caught globally, logged as error and will force the action to stop and fail

## Code style

### $$ suffix

If you came across some methods or properties suffixed by $$, it's to highlight the fact that the code is public, but is an internal code.  
It's a way to facilitate the tests with a lot of public code instead of private and in the meantime still say: don't touch that!
