# image base per build-stage
FROM node:16-bullseye as build-stage

# installa librerie richieste
RUN apt-get update && apt-get install -y libxkbfile-dev libsecret-1-dev

WORKDIR /home/theia

# copia file repository
COPY . .

# rimuove file non necessari per applicazione browser
# scarica plugins
# Usa yarn autoclean per rimuovere file non necessari
RUN yarn --pure-lockfile && \
    yarn build:extensions && \
    yarn download:plugins && \
    yarn browser build && \
    yarn --production && \
    yarn autoclean --init && \
    echo *.ts >> .yarnclean && \
    echo *.ts.map >> .yarnclean && \
    echo *.spec.* >> .yarnclean && \
    yarn autoclean --force && \
    yarn cache clean && \
    rm -rf .git applications/electron theia-extensions/theia-blueprint-launcher theia-extensions/theia-blueprint-updater node_modules

# image base per production-stage
FROM node:16-bullseye-slim as production-stage

# Crea theia user e directori
# applicazione copiata in /home/theia
# Default workspace localizzato in /home/project
RUN adduser --system --group theia
RUN chmod g+rw /home && \
    mkdir -p /home/project && \
    chown -R theia:theia /home/theia && \
    chown -R theia:theia /home/project;

# Installa i tools richiesti per l'application: Temurin JDK, JDK, SSH, Bash, Maven
# Node è già reperibile nella imagine base
RUN apt-get update && apt-get install -y wget apt-transport-https && \
    wget -O - https://packages.adoptium.net/artifactory/api/gpg/key/public | tee /usr/share/keyrings/adoptium.asc && \
    echo "deb [signed-by=/usr/share/keyrings/adoptium.asc] https://packages.adoptium.net/artifactory/deb $(awk -F= '/^VERSION_CODENAME/{print$2}' /etc/os-release) main" | tee /etc/apt/sources.list.d/adoptium.list && \
    apt-get update && apt-get install -y git openssh-client openssh-server bash libsecret-1-0 temurin-17-jdk maven && \
    apt-get purge -y wget && \
    apt-get clean

ENV HOME /home/theia
WORKDIR /home/theia

# copia applicazione da builder-stage
COPY --from=build-stage --chown=theia:theia /home/theia /home/theia

EXPOSE 3000

# specifica la shell di default per Theia e directori plugins 
ENV SHELL=/bin/bash \
    THEIA_DEFAULT_PLUGINS=local-dir:/home/theia/plugins

# Usa git 
ENV USE_LOCAL_GIT true

# Swtich a Theia user
USER theia
WORKDIR /home/theia/applications/browser

# avvia applicazione backend via node
ENTRYPOINT [ "node", "/home/theia/applications/browser/lib/backend/main.js" ]

# argomenti passati alla applicazione
CMD [ "/home/project", "--hostname=0.0.0.0" ]
