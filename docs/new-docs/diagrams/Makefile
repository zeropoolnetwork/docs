.PHONY: all

all: merkle-tree-illustration.svg

.SECONDARY:

%.svg: %/main.svg
	cp $^ $@

%/main.svg: %/main.pdf
	pdf2svg $^ $@

%/main.pdf: %/main.tex
	cd $$(dirname "$@") && latexmk
