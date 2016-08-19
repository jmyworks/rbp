FROM node:argon
MAINTAINER koumuu

ENV APPDIR /opt/book
RUN mkdir -p ${APPDIR}

# speed up npm install
WORKDIR /tmp
ADD package.json /tmp/
RUN npm config set registry https://registry.npmjs.org/
RUN npm install
RUN cp -a /tmp/node_modules ${APPDIR}

WORKDIR ${APPDIR}
COPY . ./

RUN npm install -g gulp pm2
RUN gulp release

EXPOSE 3000 8000 9000

CMD ["pm2", "start", "process.json", "--no-daemon"]
