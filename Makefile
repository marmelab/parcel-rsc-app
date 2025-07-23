.PHONY: build help

help:
	@grep -E '^[a-zA-Z0-9_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

install: package.json ## install dependencies
	@bun install

run: ## run the app
	@bunx supabase start
	@bun run dev

stop: ## stop the app
	@bunx supabase stop

build: ## build the app
	@bun run build

preview: ## preview the app
	@bun run preview