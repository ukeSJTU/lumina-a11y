EXAMPLES_DIR := "examples"
DEFAULT_EXAMPLE := "icon-only-buttons"
DEFAULT_PORT := "5500"
PYTHON := "python3"
DEMO_DIR := "demo"
E2E_DIR := "tests/e2e"

default: help

help:
	@echo "Usage:"
	@echo "  just list-examples"
	@echo "  just server <example> [port]"
	@echo "  just server-all [port]"
	@echo ""
	@echo "Remotion Demo:"
	@echo "  just demo-dev"
	@echo "  just demo-render [composition] [output]"
	@echo "  just demo-bundle"
	@echo "  just demo-lint"
	@echo ""
	@echo "E2E Regression:"
	@echo "  just e2e"
	@echo "  just e2e-verbose"
	@echo ""
	@echo "Examples:"
	@echo "  just server {{DEFAULT_EXAMPLE}}"
	@echo "  just server unlabeled-form 5500"

list-examples:
	@ls -1 "{{EXAMPLES_DIR}}"

server example=DEFAULT_EXAMPLE port=DEFAULT_PORT:
	@{{PYTHON}} -m http.server {{port}} --directory "{{EXAMPLES_DIR}}/{{example}}"

server-all port=DEFAULT_PORT:
	@{{PYTHON}} -m http.server {{port}} --directory "{{EXAMPLES_DIR}}"
# Remotion demo commands
demo-dev:
	@cd {{DEMO_DIR}} && pnpm run dev

demo-render composition="HelloWorld" output="out/video.mp4":
	@cd {{DEMO_DIR}} && pnpm exec remotion render {{composition}} {{output}}

demo-bundle:
	@cd {{DEMO_DIR}} && pnpm run build

demo-lint:
	@cd {{DEMO_DIR}} && pnpm run lint

e2e:
	@cd {{E2E_DIR}} && node run.mjs

e2e-verbose:
	@cd {{E2E_DIR}} && node run.mjs --verbose
