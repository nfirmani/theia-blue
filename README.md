Applicazione localizzata in `applications/electron/dist`.

### Create a Preview Electron Electron Application (without packaging it)

```sh
yarn electron package:preview
```

### Running Browser app

```sh
yarn browser start
```

connect to <http://localhost:3000/>


### Docker Build

```sh
docker build -t theia-blueprint -f browser.Dockerfile .
```

run with

```sh
docker run -p=3000:3000 --rm theia-blueprint
```

connect to <http://localhost:3000/>
