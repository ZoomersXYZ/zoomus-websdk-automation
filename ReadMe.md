Example command:
`https://github.com/inoicouldalwaysturn2u/zoomus-websdk-automation-library
NAV=GOHOME node server/run/initialstrap.js`

For now, have to manually place the src folder at https://github.com/inoicouldalwaysturn2u/zoomus-websdk-automation-library to /server/common. So src folder should be renamed common.

--

Running Chrome by command line. browserFunc.js (which is in the common folder/other repo) is where the related code connecting Puppeteer to Chrome is located.

_Running the base dev evangelic Zoom web sdk on port 80, even for testing. The original Zoom web sdk repo is at https://github.com/michaeldharrington/react-zoomus-websdk and the slightly modified version of Zoomers is at https://github.com/inoicouldalwaysturn2u/react-zoom-websdk-integration.

Command line example setting up a new temp user data directory. If you want the same one to be used, specify that in the last flag. Normally Google Chrome is used, but debugging on main comp and using Chrome for something else so using Chrome Beta. Can remove that from the command path.

/Applications/Google\ Chrome\ Beta.app/Contents/MacOS/Google\ Chrome\ Beta --remote-debugging-port=9222 --no-first-run --no-default-browser-check --user-data-dir=$(mktemp -d -t 'chrome-remote_data_dir') --window-size=1280,1080

/Applications/Google\ Chrome\ Beta.app/Contents/MacOS/Google\ Chrome\ Beta --remote-debugging-port=9222 --no-first-run --no-default-browser-check --user-data-dir=/Users/root/headless/puppeteer/chrome-remote_data_dir --window-size=1280,1080

--
Normal Chrome:

/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-port=9222 --no-first-run --no-default-browser-check --user-data-dir=$(mktemp -d -t 'chrome-remote_data_dir') --window-size=1280,1080

/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-port=9222 --no-first-run --no-default-browser-check --user-data-dir=/Users/root/headless/puppeteer/chrome-remote_data_dir --window-size=1280,1080
