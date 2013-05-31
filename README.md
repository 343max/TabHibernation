## TabHibernate

TabHibernate will be a Chrome Extension that will send inactive Tabs into some kind of "Hibernate" mode – Mostly like [OneTab](https://chrome.google.com/webstore/detail/onetab/chphlpgkkbolifaimnlloiipkdnihall) but without removing the tabs from the tabbar.

You may download the extension for your browser in the [Chrome Web Store](https://chrome.google.com/webstore/detail/tab-hibernation/pbdpajcdgknpendpmecafmopknefafha/).

## Building the extension

Code (or other files) that can be used by both the Chrome and Safari extension are stored in `lib/`. Browser-specific code is stored in `Chrome/` for Chrome and in `TabHibernation.safariextension/` for Safari.

To make the files in `lib/` accessible from both extensions hard links need to be created. Just run `make` to create these links.

## Screenshot
![Screenshot](material/ScreenShot.png "Chrome screenshot")
