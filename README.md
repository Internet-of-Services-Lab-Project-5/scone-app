# Scone app

This is the TEE app that will get the dataset from the environment and check if the requested passengers are included in the dataset.

## How to deploy this app

1. In `iexec.json`, `sconify.sh` and `package.json` repleace `samchamani` with your docker user name. Make sure you docker daemon is running.
2. Run `npm run scone`.
3. Get the checksum of `iosl-pupd:1.0.0-debug` and the `fingerprint` from the output of step 2, and insert them in the `iexec.json` as values for `checksum` and `fingerprint`
4. Run `npm run deploy`.
