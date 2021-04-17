# Ice Cream Builder

React application that lets you order ice cream cone created by you!
It uses firebase for [authentication](https://firebase.google.com/docs/reference/rest/auth) and storing order data.

## Technologies

-   React
-   React Router
-   Redux + Redux Thunk
-   Semantic UI
-   Axios
-   Firebase
-   PropTypes

## .env

Get your Google Firebase API key from [API keys for Firebase](https://firebase.google.com/docs/projects/api-keys).

Create `.env` file with `REACT_APP_FIREBASE_API_KEY` variable:

```env
REACT_APP_FIREBASE_API_KEY = <api_key>
```

## CLI Commands

```bash
# install dependencies
yarn install

# runs the app in the development mode at localhost:3000
yarn start

# build for production
yarn build
```

For other CLI commands follow [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).
