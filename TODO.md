# TODO (Auth evolution)

## Step 1: Backup
- [x] Create backup folder `.backup_pre_auth` (best-effort) and copy `bisocos-client` into it.

## Step 2: Refactor
- [ ] Update `bisocos-client/src/contexts/UserContext.jsx` to include registration/login-capable records and localStorage persistence (including credentials needed for matching).

## Step 3: UsersPage
- [ ] Update `bisocos-client/src/DashBoardPages/UserPage.jsx`:
  - [ ] Rename dialog to “Sign Up”
  - [ ] Use `isUsernameTaken` validation
  - [ ] On submit, save the new user into `UserContext`
  - [ ] Keep existing user table behavior.

## Step 4: Roadmap for LoginPage
- [ ] Provide a simple API/approach for `LoginPage` to verify username/password.

