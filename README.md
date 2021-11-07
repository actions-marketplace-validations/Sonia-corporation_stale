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

## All the common inputs

All the inputs that are used both for issues and Pull Requests.

| Input        | Description                                                                                                              | Default               |
| ------------ | ------------------------------------------------------------------------------------------------------------------------ | --------------------- |
| github-token | A GitHub token used to perform the API calls to GitHub through `@actions/github`. Usually `${{ secrets.GITHUB_TOKEN }}`. | `${{ github.token }}` |
| dry-run      | A mode where any Data Manipulation Language will be skipped. Useful to debug.                                            | `false`               |

## All the issues inputs

| Input | Description | Default |
| ----- | ----------- | ------- |

## All the Pull Requests inputs

| Input | Description | Default |
| ----- | ----------- | ------- |

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
The main difference is that this project aims to provide the best stale action as possible, the lack of skills is the limit. ;)
