FROM ubuntu:22.04

ENV TZ=Europe/Warsaw
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone 

RUN apt-get update && apt-get install -y \
  python3 \
  python3-pip \
  openjdk-8-jdk \
  curl \
  zip \
  unzip

RUN curl -s "https://get.sdkman.io" | bash
RUN /bin/bash -c "source /root/.sdkman/bin/sdkman-init.sh && sdk install kotlin"

RUN /bin/bash -c "source /root/.sdkman/bin/sdkman-init.sh && sdk install gradle"

COPY build.gradle /root/project/build.gradle