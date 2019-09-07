# Open-Source Full-Stack MEAN TO-DO Application

A simple To Do web application that uses `express.js (typescript)` in server side, `angular (V8)` in client side and `mongoDB` as database.

## [Live Demo](https://mean-typescript.herokuapp.com)

> This app deployed to Heroku Free Plan. For this reason it sleeps after 30 mins of inactivity. Because of this first time loading may take time.

**Features**

- Angular Universial SSR ( Server Side Rendering)
- i18ln with [ngx-translate](http://www.ngx-translate.com/)
- Account Management (Login-Register | Update Profile & Profile Picture) via Passport.js (Local & JWT)
- MongoDB C.R.U.D operations
- Seo friendly and Progressive Web App

## Installation

### 1. Clone & Install Node Modules

```sh
git clone https://github.com/pikselinweb/mean-typescript.git mean-todo
cd mean-todo
npm i
```

### 2. Edit .env

```

NODE_ENV=deployment
NODE_MODULES_CACHE=false
SERVER_PORT=8080
JWT_SECRET=YOUR_SECRET_CODE

MONGO_HOST=mongodb://localhost/mean_todo

CLOUDINARY_NAME=YOUR_CLOUDINARY_NAME
CLOUDINARY_API_KEY=YOUR_CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET=YOUR_CLOUDINARY_API_SECRET

```

### 3. Build & Run

```sh
npm run build:ssr && npm run serve:ssr
```

## Audits

### [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/)

![Desktop](screenshoots/pagespeeddesktop.PNG 'Desktop')
![Mobile](screenshoots/pagespeedmobil.PNG 'Mobile')

### Lighthouse - No Throttling

![Desktop](screenshoots/noThrottlingDesktop.PNG 'Desktop')
![Mobile](screenshoots/noThrottlingMobile.PNG 'Mobile')

### Lighthouse - Simulated Slow 4G, 4x CPU Slowdown

![Desktop](screenshoots/lighthousedesktop.PNG 'Desktop')
![Mobile](screenshoots/lighthousemobile.PNG 'Mobile')

## Credits

- Inspired from [linnovate/mean](https://github.com/linnovate/mean)
- [Angular Universal](https://angular.io/guide/universal)
