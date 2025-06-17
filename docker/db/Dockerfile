FROM postgres:17.5-alpine3.21
ENV PGLOG=/var/lib/postgresql/log
RUN mkdir -p "$PGLOG" && chown -R postgres:postgres "$PGLOG" && chmod 1777 "$PGLOG"
VOLUME /var/lib/postgresql/log