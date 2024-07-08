#! /bin/sh

start_dev() {
  docker compose watch
}

is_app_running() {
  docker compose ps | grep "acme-hbm-plus" | grep "Up"
}

start_logging() {
  has_started=0

  while [ $has_started -eq 0 ];
  do
    is_app_running && has_started=1;
  done

  while is_app_running;
  do
    docker compose logs -f;
  done
}

stop_dev() {
  docker compose stop

  docker compose down -v

  trap - SIGINT
}

(trap 'stop_dev && kill 0' SIGINT; start_dev & start_logging)
