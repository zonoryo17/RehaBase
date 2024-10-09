.PHONY: start
start:
	bun dev

# ESLintチェック
.PHONY: lint
lint:
	bunx eslint --ext .ts,.tsx,.json,.js,.jsx src/

# 型チェック
.PHONY: tsc
tsc:
	bunx tsc --noEmit

# 開発モードでStorybook起動
.PHONY: start-sb
start-sb:
	bun storybook

# componentsのテンプレートを作成
.PHONY: component
component:
	bunx hygen component new
