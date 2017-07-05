# listmi.com website

## Deployment to firebase

### Automatic, on commit

A [Travis CI build](https://travis-ci.org/listmi/listmi.github.io) deploys all
commits that are pushed or merged to the branches listed in the `.travis.yml`
file.

### Manual

Instructions below are summarised from the
[firebase docs](https://firebase.google.com/docs/hosting/).

Install the firebase CLI and login:

```
$ npm install -g firebase-tools
$ firebase login
```

(This assumes nodejs is already installed.)

To deploy the site, run:

```
$ firebase deploy
```
