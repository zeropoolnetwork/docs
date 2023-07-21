.PHONY: all

all: \
	zeropool-keys.png \
	merkle-tree-illustration.png \
	transaction-acting-on-a-list.png

.SECONDARY:

%.png: %/main.png
	cp $^ $@

%/main.png: %/main.tex
	cd $$(dirname "$^") && lualatex --shell-escape main.tex
