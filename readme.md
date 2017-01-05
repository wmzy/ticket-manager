# ticket-manager

A ticket manager system.


### Features
* merge ticket
* public and private ticket

### Quick Start

```bash

git clone https://github.com/wmzy/ticket-manager.git
cd ticket-manager
npm install

gulp serve

```

Note: The application needs at least Node 7+ installed.

Open it in your browser [http://localhost:9000](http://localhost:9000) and start use it!

### Testing

```bash

gulp test

```

Runs tests with [Karma](https://karma-runner.github.io/0.13/index.html) and [Jasmine](http://jasmine.github.io/).
Uses a single entry point (```setup.spec.js```), which includes all the ```*.spec.js``` files and runs the tests inside them.
The test files can be found in the ```client/app``` folder next to the source files.

Because a clean bundling with Webpack can take multiple seconds, it is not ideal for development to run a clean test run every time.
Instead it can run continuously on your development machine.

```bash

gulp test-dev

```

### Deployment (to Heroku)

It bundles the client application and copies static files and server files to the ```dist``` directory along with ```package.json```.
Then it can be commited to the desired location (for example Heroku).

```bash

gulp dist

cd dist
git init
git add -A .
git commit -m "Deploy #1" && echo Committed
git push -f git@heroku.com:ticket-manager.git master

```
