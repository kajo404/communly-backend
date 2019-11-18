# Communly Backend

The communly frontend application can be found [here](https://github.com/kajo404/communly-frontend), created in collaboration with [@EricssonX](https://github.com/EricssonX),[@laramarie](https://github.com/laramarie) and [@yasna13](https://github.com/yasna13).


## Setup (before first run)

**Install node dependencies**

```
npm install
```

**Set the environment variables**

This variables are based in your local configuration
```bash
export PORT=3000
export MONGODB_URI="path-to-mongo-instance"
export JWT_SECRET="very secret secret"
```

## Start the project

**Development environment**
```bash
npm run devstart
```

**Production environment**
```bash
npm start
```

**Create API Documentation**
```bash
npm install -g apidoc
```

To create the documentation files run:
```bash
apidoc -f ".*\\.js$" -f ".*\\.ts$" -i src/controllers/ -o doc/
```
