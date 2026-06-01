FROM jenkins/jenkins:lts

USER root

RUN apt-get update && \
    apt-get install -y curl gnupg

RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash -

RUN apt-get install -y nodejs

USER jenkins