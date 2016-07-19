all:
	@ln -f lib/icon16.png Chrome/icon16.png
	@ln -f lib/icon16.png TabHibernation.safariextension/icon16.png
	@ln -f lib/icon48.png Chrome/icon48.png
	@ln -f lib/icon48.png TabHibernation.safariextension/Icon-48.png

clean:
	@rm -rf Chrome/icon16.png
	@rm -rf TabHibernation.safariextension/icon16.png
	@rm -rf Chrome/icon48.png
	@rm -rf TabHibernation.safariextension/Icon-48.png

.PHONY: all clean
