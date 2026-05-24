# TODO - Fix MongoDB TLS connection

- [ ] Inspect `bisocos-server/config/db.js` (done)
- [x] Update `bisocos-server/config/db.js` to connect with Mongoose only and force TLS options
- [x] Remove MongoClient dual-connection to avoid TLS mismatch
- [ ] Restart server and confirm MongoDB connection succeeds (after Atlas IP whitelist fix)


