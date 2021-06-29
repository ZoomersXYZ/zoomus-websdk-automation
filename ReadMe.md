Running Chrome by command line. browserFunc.js is where the related code connecting Puppeteer to Chrome is located.

_Running the base dev evangelic Zoom web sdk on port 80, even for testing. The original Zoom web sdk repo is at {} and the slightly modified version of Zoomers is at {}_

Command line example setting up a new temp user data directory. If you want the same one to be used, specify that in the last flag. Normally Google Chrome is used, but debugging on main comp and using Chrome for something else so using Chrome Beta. Can remove that from the command path.

/Applications/Google\ Chrome\ Beta.app/Contents/MacOS/Google\ Chrome\ Beta --remote-debugging-port=9222 --no-first-run --no-default-browser-check --user-data-dir=$(mktemp -d -t 'chrome-remote_data_dir') --window-size=1280,1080

/Applications/Google\ Chrome\ Beta.app/Contents/MacOS/Google\ Chrome\ Beta --remote-debugging-port=9222 --no-first-run --no-default-browser-check --user-data-dir=/Users/root/headless/puppeteer/chrome-remote_data_dir --window-size=1280,1080