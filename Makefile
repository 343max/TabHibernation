all:
	@ln -f lib/icon16.png Chrome/icon16.png
	@ln -f lib/icon16.png TabHibernation.safariextension/icon16.png

clean:
	@rm -rf Chrome/icon16.png
	@rm -rf TabHibernation.safariextension/icon16.png

.PHONY: all clean
