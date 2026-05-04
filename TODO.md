# Task: Remove nested git folder from bisocos-client to fix submodule issue on GitHub

## Steps to complete:
- [x] Step 1: Remove bisocos-client/.git directory using Remove-Item -Recurse -Force (PowerShell)
- [x] Step 2: Verified bisocos-client no longer lists .git (confirmed via list_files), git status to check repo status
- [ ] Step 3: git add bisocos-client/, commit changes
- [ ] Step 4: git push to update GitHub repo
- [ ] Step 5: Confirm on GitHub that folder is now clickable without submodule behavior

Current progress: Step 2 - Checking git status; .git folder successfully removed

