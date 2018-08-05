# Changelog
All notable changes to this project will be documented in this file as of 2018-08-03.

This format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/).  
The Trello board for all the upcoming things for ChatBot is [here](https://trello.com/b/xvsSdqai/chatbot).  
The versioning scheme for this project is as follows:
```
<Major>.<Minor>.<Patch> e.g 1.2.3
   ^        ^        ^
   |        |        |
   |        |        +--- Minor bugs, spelling mistakes, etc.
   |        +------------ Minor features, major bug fixes, etc.
   +--------------------- Major version, UX changes, file format changes, etc.
```



## [2.1.4] - 2018-08-05

### Changed
- Scripts for TravisCI
- Versioning to now include v in-front of version number

### Fixed
- TravisCI Build

### Other
- Linted Code


## [2.1.3] - 2018-08-04
### Added
- Error Catching system when running commands

### Fixed
- Level Elevation System


## [2.1.2] - 2018-08-03
### Added
- This changelog.md file
- Basis for new enmap per-server settings database
- Proper versioning scheme

### Changed
- maindefs to mainDefs to use camelCase instead of concatenating "main" and "defs"
- Improved readme.md

### Removed
- MongoDB File structure
- node_modules from the .gitignore file

### Fixed
- Caught up with the actual version of ChatBot
- Problem with command loader resetting command collection on every call of the loadModule() function

### Known Issues
- Level elevation system not detecting admin or moderator role

[2.1.2]: https://github.com/TolleyB-J/ChatBot/compare/v2.0.4...2.1.2
[2.1.3]: https://github.com/TolleyB-J/ChatBot/compare/2.1.2...2.1.3
[2.1.4]: https://github.com/TolleyB-J/ChatBot/compare/2.1.3...v2.1.4
