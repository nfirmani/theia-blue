ARG VERSION=3.8
#immagine base
FROM alpine:$VERSION

LABEL maintainer="nfirmani@tinn.it"

ARG VERSION

# modalità bash
RUN echo $VERSION

# modalità exec
RUN ["echo", "$VERSION" ]

# comando eseguito all'avvio di un container a partire da questa immagine
CMD [ "/bin/sh"]