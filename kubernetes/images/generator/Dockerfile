FROM node:boron

ARG COMMIT_HASH
ARG BRANCH
ARG REPOSITORY

ENV COMMIT_HASH ${COMMIT_HASH:-null}
ENV BRANCH ${BRANCH:-mastet}
ENV REPOSITORY ${REPOSITORY:-https://github.com/fossasia/susi_alexa_skill.git}
ENV INSTALL_PATH /alexa

RUN mkdir -p $INSTALL_PATH

WORKDIR $INSTALL_PATH

COPY . .

RUN bash setup.sh

WORKDIR $INSTALL_PATH/susi_alexa_skill

CMD [ "npm", "start" ]
