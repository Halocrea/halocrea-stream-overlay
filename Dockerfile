FROM node:alpine

# Create app directory
WORKDIR /app

# Save that must be shared to the host
RUN mkdir -p /app/data
VOLUME /app/data

# Save that must be shared to the host
RUN mkdir -p /app/static
VOLUME /app/static

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN apk upgrade -U \
    && apk add ca-certificates ffmpeg libva-intel-driver \
    && rm -rf /var/cache/*

RUN apk add --no-cache tzdata
ENV TZ=Europe/Paris
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Bundle app source
COPY . .

RUN yarn
RUN yarn build

CMD [ "yarn", "start" ]