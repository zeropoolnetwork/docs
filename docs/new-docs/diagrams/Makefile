.PHONY: all

all: merkle-tree-illustration.png

.SECONDARY:

%.png: %/main.png
	cp $^ $@

%/main.png: %/main.tex
	cd $$(dirname "$^") && lualatex --shell-escape main.tex
