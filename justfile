EXAMPLES_DIR := "examples"
DEFAULT_EXAMPLE := "icon-only-buttons"
DEFAULT_PORT := "5500"
PYTHON := "python3"

default: help

help:
	@echo "Usage:"
	@echo "  just list-examples"
	@echo "  just server <example> [port]"
	@echo "  just server-all [port]"
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
