# TODO

## MongoDB connection fix (bisocos-server)
1. Implement safer MongoDB connection behavior:
   - Do not `process.exit(1)` on startup failure. ✅
   - Add clearer logging specific to Atlas DNS/SRV reachability. ✅
   - Add retry connection a few times. ✅
2. Update server startup order if needed (so Express can still run).
3. Run `node index.js` and verify:
   - server starts even if Mongo temporarily fails
   - logs show actionable error
4. After that, user verifies connectivity:
   - Atlas IP whitelist / DNS / firewall settings


