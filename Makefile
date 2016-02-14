PATHS = "Chrome" "TabHibernation.safariextension"
FILES = "hibernationPage/index.html" "icon16.png"

all:
	@mkdir -p Chrome/lib/hibernationPage
	@mkdir -p TabHibernation.safariextension/lib/hibernationPage

	@$(foreach path, $(PATHS), \
		$(foreach file, $(FILES), \
			ln -f lib/$(file) $(path)/lib/$(file); \
		) \
	)

	@ln -f lib/underscore.js TabHibernation.safariextension/lib/underscore.js

clean:
	@rm -rf Chrome/lib/
	@rm -rf TabHibernation.safariextension/lib/

.PHONY: all clean
