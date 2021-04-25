### Process before editing code
- git pull request from master
- git checkout -b ("new_branch_name_here")
### Process before trying to submit any code:
- npm run lint (on filename with full path from root directory you are editing)
- npm run format
- npm run test (on filename with full path from root directory you are editing)
- npm run test(check to see if nothing else is broken)
- git add .
- git commit -m "your message here with what you added/changed"
- git push origin "branch_name_here"

### Process after pushing branch
- Go into github a
