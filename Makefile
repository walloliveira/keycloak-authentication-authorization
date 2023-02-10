install:
	docker compose -f docker-compose.yml up -d --remove-orphans
	yarn --cwd ./frontend-vue-ts/ install
	yarn --cwd ./frontend-react-ts/ install
	./backend-spring-boot/gradlew -p ./backend-spring-boot/ build
dev:
	docker compose -f docker-compose.yml up -d --remove-orphans
	./backend-spring-boot/gradlew -p ./backend-spring-boot/ bootRun &
	yarn --cwd ./frontend-vue-ts/ dev &
	yarn --cwd ./frontend-react-ts/ dev &
stop:
	kill -9 $$(lsof -t -i :8080)
	kill -9 $$(lsof -t -i :8081)
	kill -9 $$(lsof -t -i :9090)
	docker compose -f docker-compose.yml down
