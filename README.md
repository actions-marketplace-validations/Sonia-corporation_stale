# Stale

> _A GitHub action to stale and close automatically your issues and pull requests._

**Quality:**  
![GitHub last commit](https://img.shields.io/github/last-commit/sonia-corporation/stale?style=flat-square)
[![Maintainability](https://api.codeclimate.com/v1/badges/cb424a8e5fc5fe80b750/maintainability?style=flat-square)](https://codeclimate.com/github/Sonia-corporation/stale/maintainability)
[![CodeFactor](https://www.codefactor.io/repository/github/sonia-corporation/stale/badge)](https://www.codefactor.io/repository/github/sonia-corporation/stale)
[![DeepScan grade](https://deepscan.io/api/teams/10568/projects/19009/branches/480513/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=10568&pid=19009&bid=480513)
[![Test Coverage](https://api.codeclimate.com/v1/badges/cb424a8e5fc5fe80b750/test_coverage?style=flat-square)](https://codeclimate.com/github/Sonia-corporation/stale/test_coverage)
[![codecov](https://codecov.io/gh/Sonia-corporation/stale/branch/develop/graph/badge.svg?token=S4MUQF1TIY)](https://codecov.io/gh/Sonia-corporation/stale)
![GitHub issues](https://img.shields.io/github/issues-raw/sonia-corporation/stale?style=flat-square)
![GitHub pull requests](https://img.shields.io/github/issues-pr-raw/sonia-corporation/stale?style=flat-square)
[![Build](https://github.com/Sonia-corporation/stale/actions/workflows/build.yml/badge.svg?branch=develop&style=flat-square)](https://github.com/Sonia-corporation/stale/actions/workflows/build.yml)
[![Release](https://github.com/Sonia-corporation/stale/actions/workflows/release.yml/badge.svg?branch=master&style=flat-square)](https://github.com/Sonia-corporation/stale/actions/workflows/release.yml)
[![Stale](https://github.com/Sonia-corporation/stale/actions/workflows/stale-tester.yml/badge.svg?branch=develop&style=flat-square)](https://github.com/Sonia-corporation/stale/actions/workflows/stale-tester.yml)
![Dependencies](https://img.shields.io/david/sonia-corporation/stale?style=flat-square)
![Dev Dependencies](https://img.shields.io/david/dev/sonia-corporation/stale?style=flat-square)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

**Community:**

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-5-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

[![commitizen](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)](http://commitizen.github.io/cz-cli/)
[![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)]()

**Statistics:**  
![GitHub release (latest by date)](https://img.shields.io/github/v/release/sonia-corporation/stale?style=flat-square)
![GitHub top language](https://img.shields.io/github/languages/top/sonia-corporation/stale?style=flat-square)
![GitHub repo size](https://img.shields.io/github/repo-size/sonia-corporation/stale?style=flat-square)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/sonia-corporation/stale?style=flat-square)
![GitHub](https://img.shields.io/github/license/sonia-corporation/stale?style=flat-square)
[![](https://tokei.rs/b1/github/sonia-corporation/stale?category=files&style=flat-square)](https://github.com/sonia-corporation/stale)
[![](https://tokei.rs/b1/github/sonia-corporation/stale?category=lines&style=flat-square)](https://github.com/sonia-corporation/stale)
[![](https://tokei.rs/b1/github/sonia-corporation/stale?category=code&style=flat-square)](https://github.com/sonia-corporation/stale)
[![](https://tokei.rs/b1/github/sonia-corporation/stale?category=comments&style=flat-square)](https://github.com/sonia-corporation/stale)
[![](https://tokei.rs/b1/github/sonia-corporation/stale?category=blanks&style=flat-square)](https://github.com/sonia-corporation/stale)
[![](https://img.shields.io/npm/v/@sonia-corporation/stale?style=flat-square)](https://www.npmjs.com/package/@sonia-corporation/stale)
[![](https://img.shields.io/npm/dm/@sonia-corporation/stale?color=blue&style=flat-square)](https://www.npmjs.com/package/@sonia-corporation/stale)

## Documentation

To have in-depth documentation and examples, see the [documentation website](https://sonia-corporation.github.io/stale/).

## Default configuration

### Issues

After 30 days (coming from `issue-days-before-stale`) without any update on the issue, add a label `stale` (coming from `issue-stale-label`) on the issue to indicate that it is stale.  
If an update occur after being stale, the `stale` label will be removed and the count will be reset back to 30 days.  
Removing the `stale` label manually will also do the trick.  
If the `stale` label on the issue is still here for more than 10 days (coming from `issue-days-before-close`), the issue will be closed.

### Pull requests

After 30 days (coming from `pull-request-days-before-stale`) without any update on the pull request, add a label `stale` (coming from `pull-request-stale-label`) on the pull request to indicate that it is stale.  
If an update occur after being stale, the `stale` label will be removed and the count will be reset back to 30 days.  
Removing the `stale` label manually will also do the trick.  
If the `stale` label on the pull request is still here for more than 10 days (coming from `pull-request-days-before-close`), the pull request will be closed.

## All the common inputs

All the inputs that are used both for issues and pull requests.

| Input                                                                              | Description                                                                                                                              | Default               |
| ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| [github-token](https://sonia-corporation.github.io/stale/docs/github-token-option) | A GitHub token used to perform the API calls to GitHub through `@actions/github`. Usually `${{ secrets.GITHUB_TOKEN }}`.                 | `${{ github.token }}` |
| [dry-run](https://sonia-corporation.github.io/stale/docs/dry-run-option)           | A mode where any Data Manipulation Language will be skipped. Useful to debug safely and without risking messing up with your repository. | `false`               |

## All the issues inputs

| Input                                                                                                                               | Description                                                                                                                                     | Default |
| ----------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| [issue-stale-label](https://sonia-corporation.github.io/stale/docs/issues/issue-stale-label-option)                                 | The label that will be added to the issue when it is stale.                                                                                     | `stale` |
| [issue-ignore-all-labels](https://sonia-corporation.github.io/stale/docs/issues/issue-ignore-all-labels-option)                     | Allow to ignore the processing of issues that contains any labels.                                                                              | `false` |
| [issue-ignore-any-labels](https://sonia-corporation.github.io/stale/docs/issues/issue-ignore-any-labels-option)                     | Allow to ignore the processing of issues that contains one of those labels (multiline).                                                         |         |
| [issue-ignore-all-assignees](https://sonia-corporation.github.io/stale/docs/issues/issue-ignore-all-assignees-option)               | Allow to ignore the processing of issues that contains any assignees.                                                                           | `false` |
| [issue-ignore-any-assignees](https://sonia-corporation.github.io/stale/docs/issues/issue-ignore-any-assignees-option)               | Allow to ignore the processing of issues that contains one of those assignees (multiline).                                                      |         |
| [issue-ignore-all-project-cards](https://sonia-corporation.github.io/stale/docs/issues/issue-ignore-all-project-cards-option)       | Allow to ignore the processing of issues that contains any project cards.                                                                       | `false` |
| [issue-ignore-before-creation-date](https://sonia-corporation.github.io/stale/docs/issues/issue-ignore-before-creation-date-option) | Allow to ignore the processing of issues that were created before this date ([ISO 8601](https://moment.github.io/luxon/#/parsing?id=iso-8601)). |         |
| [issue-days-before-stale](https://sonia-corporation.github.io/stale/docs/issues/issue-days-before-stale-option)                     | The number of days until the issue is considered as stale.                                                                                      | `30`    |
| [issue-stale-comment](https://sonia-corporation.github.io/stale/docs/issues/issue-stale-comment-option)                             | The comment that will be sent once the issue is stale (keep empty to not send a comment).                                                       |         |
| [issue-days-before-close](https://sonia-corporation.github.io/stale/docs/issues/issue-days-before-close-option)                     | The number of days until a stale issue is considered as closed.                                                                                 | `10`    |
| [issue-close-comment](https://sonia-corporation.github.io/stale/docs/issues/issue-close-comment-option)                             | The comment that will be sent once the issue is close (keep empty to not send a comment).                                                       |         |
| [issue-add-labels-after-stale](https://sonia-corporation.github.io/stale/docs/issues/issue-add-labels-after-stale-option)           | A list of labels added when the processing stale the issue (multiline).                                                                         |         |
| [issue-add-labels-after-close](https://sonia-corporation.github.io/stale/docs/issues/issue-add-labels-after-close-option)           | A list of labels added when the processing close the issue (multiline).                                                                         |         |
| [issue-processing](https://sonia-corporation.github.io/stale/docs/issues/issue-processing-option)                                   | Allow to process the issues.                                                                                                                    | `true`  |

## All the issues outputs

| Output                      | Description                                                                 |
| --------------------------- | --------------------------------------------------------------------------- |
| processed-issues-count      | The number of issues processed.                                             |
| ignored-issues-count        | The number of issues ignored.                                               |
| unaltered-issues-count      | The number of issues unaltered (either not good to stale or already stale). |
| stale-issues-count          | The number of issues stale.                                                 |
| already-stale-issues-count  | The number of issues processed which were already stale.                    |
| remove-stale-issues-count   | The number of issues from where the stale state was removed.                |
| close-issues-count          | The number of issues closed.                                                |
| added-issues-comments-count | The number of added issues comments.                                        |
| added-issues-labels-count   | The number of added issues labels.                                          |

## All the pull requests inputs

| Input                                    | Description                                                                                                                                            | Default |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| pull-request-stale-label                 | The label that will be added to the pull request when it is stale.                                                                                     | `stale` |
| pull-request-ignore-all-labels           | Allow to ignore the processing of pull requests that contains any labels.                                                                              | `false` |
| pull-request-ignore-any-labels           | Allow to ignore the processing of pull requests that contains one of those labels (multiline).                                                         |         |
| pull-request-ignore-all-assignees        | Allow to ignore the processing of pull requests that contains any assignees.                                                                           | `false` |
| pull-request-ignore-any-assignees        | Allow to ignore the processing of pull requests that contains one of those assignees (multiline).                                                      |         |
| pull-request-ignore-all-project-cards    | Allow to ignore the processing of pull requests that contains any project cards.                                                                       | `false` |
| pull-request-ignore-before-creation-date | Allow to ignore the processing of pull requests that were created before this date ([ISO 8601](https://moment.github.io/luxon/#/parsing?id=iso-8601)). |         |
| pull-request-ignore-draft                | Allow to ignore the processing of pull requests that are drafts.                                                                                       | `false` |
| pull-request-days-before-stale           | The number of days until the pull request is considered as stale.                                                                                      | `30`    |
| pull-request-stale-comment               | The comment that will be sent once the pull request is stale (keep empty to not send a comment).                                                       |         |
| pull-request-days-before-close           | The number of days until a stale pull request is considered as closed.                                                                                 | `10`    |
| pull-request-close-comment               | The comment that will be sent once the pull request is close (keep empty to not send a comment).                                                       |         |
| pull-request-delete-branch-after-close   | Delete the branch when the processing close the pull request.                                                                                          | `false` |
| pull-request-add-labels-after-stale      | A list of labels added when the processing stale the pull request (multiline).                                                                         |         |
| pull-request-add-labels-after-close      | A list of labels added when the processing close the pull request (multiline).                                                                         |         |
| pull-request-processing                  | Allow to process the pull requests.                                                                                                                    | `true`  |
| pull-request-to-draft-instead-of-stale   | Convert the pull request to a draft pull request instead of handling it as a stale candidate.                                                          | `false` |

## All the pull requests outputs

| Output                               | Description                                                                        |
| ------------------------------------ | ---------------------------------------------------------------------------------- |
| processed-pull-requests-count        | The number of pull requests processed.                                             |
| ignored-pull-requests-count          | The number of pull requests ignored.                                               |
| unaltered-pull-requests-count        | The number of pull requests unaltered (either not good to stale or already stale). |
| stale-pull-requests-count            | The number of pull requests stale.                                                 |
| already-stale-pull-requests-count    | The number of pull requests processed which were already stale.                    |
| remove-stale-pull-requests-count     | The number of pull requests from where the stale state was removed.                |
| close-pull-requests-count            | The number of pull requests closed.                                                |
| deleted-pull-requests-branches-count | The number of deleted pull requests branches closed.                               |
| added-pull-requests-comments-count   | The number of added pull requests comments.                                        |
| added-pull-requests-labels-count     | The number of added pull requests labels.                                          |
| draft-pull-requests-count            | The number of pull requests converted to draft.                                    |

## Examples

### All issues inputs example

```yml
name: Stale
on:
  workflow_dispatch:
  schedule:
    - cron: '0 12 * * *'
jobs:
  Stale:
    runs-on: ubuntu-latest
    name: Run stale
    steps:
      - name: Checkout
        id: checkout
        uses: actions/checkout@v2
      - name: Stale
        id: stale
        uses: sonia-corporation/stale@1
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          dry-run: false
          issue-ignore-all-assignees: false
          issue-ignore-any-assignees: |
            marco
            polo
          issue-ignore-all-labels: false
          issue-stale-label: stale
          issue-ignore-any-labels: |
            frozen
            help wanted
            dependency-fix
            dependencies
          issue-days-before-stale: 30
          issue-days-before-close: 10
          issue-ignore-before-creation-date: 2020-04
          issue-stale-comment: |
            This issue is now stale!
          issue-close-comment: |
            This issue is now closed!
          issue-ignore-all-project-cards: false
          issue-add-labels-after-stale: |
            wake up!
```

### All pull requests inputs example

```yml
name: Stale
on:
  workflow_dispatch:
  schedule:
    - cron: '0 12 * * *'
jobs:
  Stale:
    runs-on: ubuntu-latest
    name: Run stale
    steps:
      - name: Checkout
        id: checkout
        uses: actions/checkout@v2
      - name: Stale
        id: stale
        uses: sonia-corporation/stale@1
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          dry-run: false
          pull-request-ignore-all-assignees: false
          pull-request-ignore-any-assignees: |
            marco
            polo
          pull-request-ignore-all-labels: false
          pull-request-stale-label: stale
          pull-request-ignore-any-labels: |
            frozen
            help wanted
            dependency-fix
            dependencies
          pull-request-days-before-stale: 30
          pull-request-days-before-close: 10
          pull-request-ignore-before-creation-date: 2020-04
          pull-request-stale-comment: |
            This pull request is now stale!
          pull-request-close-comment: |
            This pull request is now closed!
          pull-request-ignore-all-project-cards: false
          pull-request-ignore-draft: false
          pull-request-delete-branch-after-close: false
          pull-request-add-labels-after-stale: |
            wake up!
```

## Debug the action

If you have an issue, you could help yourself to save some time by enabling the debug mode of the actions by adding the `ACTIONS_STEP_DEBUG` GitHub secret to `true` in your repository.  
Follow this [documentation](https://github.com/actions/toolkit/blob/main/docs/action-debugging.md#how-to-access-step-debug-logs) if you need more details.

## Contributing

Check out the [contributing](CONTRIBUTING.md) file before helping us.

## License

This project is licensed under the MIT License - see the [license](LICENSE) for details.

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://allcontributors.org"><img src="https://avatars1.githubusercontent.com/u/46410174?v=4?s=80" width="80px;" alt=""/><br /><sub><b>All Contributors</b></sub></a><br /><a href="https://github.com/Sonia-corporation/stale/commits?author=all-contributors" title="Documentation">📖</a> <a href="#tool-all-contributors" title="Tools">🔧</a></td>
    <td align="center"><a href="https://www.codefactor.io"><img src="https://avatars0.githubusercontent.com/u/13309880?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Automated code reviews</b></sub></a><br /><a href="https://github.com/Sonia-corporation/stale/pulls?q=is%3Apr+reviewed-by%3Acode-factor" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/Sonia-corporation/stale/issues?q=author%3Acode-factor" title="Bug reports">🐛</a></td>
    <td align="center"><a href="http://www.geoffreytestelin.com/"><img src="https://avatars2.githubusercontent.com/u/10194542?s=460&v=4?s=80" width="80px;" alt=""/><br /><sub><b>Geoffrey 'C0ZEN' Testelin</b></sub></a><br /><a href="https://github.com/Sonia-corporation/stale/commits?author=C0ZEN" title="Code">💻</a> <a href="#design-C0ZEN" title="Design">🎨</a> <a href="#infra-C0ZEN" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#ideas-C0ZEN" title="Ideas, Planning, & Feedback">🤔</a> <a href="#blog-C0ZEN" title="Blogposts">📝</a> <a href="https://github.com/Sonia-corporation/stale/commits?author=C0ZEN" title="Documentation">📖</a> <a href="#tool-C0ZEN" title="Tools">🔧</a> <a href="#security-C0ZEN" title="Security">🛡️</a> <a href="https://github.com/Sonia-corporation/stale/pulls?q=is%3Apr+reviewed-by%3AC0ZEN" title="Reviewed Pull Requests">👀</a> <a href="#question-C0ZEN" title="Answering Questions">💬</a> <a href="#maintenance-C0ZEN" title="Maintenance">🚧</a> <a href="https://github.com/Sonia-corporation/stale/issues?q=author%3AC0ZEN" title="Bug reports">🐛</a></td>
    <td align="center"><a href="http://semantic-release.org/"><img src="https://avatars1.githubusercontent.com/u/32174276?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Semantic Release Bot</b></sub></a><br /><a href="https://github.com/Sonia-corporation/stale/commits?author=semantic-release-bot" title="Documentation">📖</a> <a href="#tool-semantic-release-bot" title="Tools">🔧</a> <a href="#security-semantic-release-bot" title="Security">🛡️</a></td>
    <td align="center"><a href="https://renovate.whitesourcesoftware.com"><img src="https://avatars0.githubusercontent.com/u/25180681?v=4?s=80" width="80px;" alt=""/><br /><sub><b>WhiteSource Renovate</b></sub></a><br /><a href="#tool-renovate-bot" title="Tools">🔧</a> <a href="#security-renovate-bot" title="Security">🛡️</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification.  
Contributions of any kind are welcome!

## Related project

[Geoffrey 'C0ZEN' Testelin](https://github.com/C0ZEN) was originally a contributor of [@actions/stale](https://github.com/actions/stale) (see the [contributors](https://github.com/actions/stale/graphs/contributors)).  
Due to slower cadence and different opinions over how the project should go forward, he decided to start from scratch on his own.  
The main difference is that this project aims to provide the best stale action as possible based on consumers needs, even if it may be hard to provide such features. #noLimit - we do what we can to have an amazing stale action ;)
