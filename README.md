# iExec Command

## Deploy

`iexec app deploy --chain bellecour`

## Run

TODO: wechseln weil jetzt nicht mehr mit gramine
`iexec app run --tag tee,gramine --workerpool debug-v8-bellecour.main.pools.iexec.eth --watch --chain bellecour`

## Publish

`iexec app publish --chain bellecour`

This can be used to setup restrictions etc. To see options run:

`iexec app publish --help`

## Show a deal

`iexec deal show <dealid>`

`<dealid>` looks somewhat like this `0x0b32b28446e729059443add88294fb74fbf5d8446f8574964a79b8e2eedd0419`

## Download result

- `iexec task show <taskid> --download task-result --chain bellecour`
- `unzip task-result.zip -d task-result`
- `cat task-result/result.txt`

## Check orderbook

`iexec orderbook app <your app address> --chain bellecour`
