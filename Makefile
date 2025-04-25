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

# Supabaeのスキーマから肩を生成
.PHONY: codegen
codegen:
	bunx supabase login
	bunx supabase init
	bunx supabase gen types --lang=typescript --project-id "$PROJECT_REF" --schema public > database.types.ts
	bunx supabase gen types --lang=typescript --local > database.types.ts


