# AngularTestProj

This project was generated with Angular CLI version 8.1.1.

# Build

Angular production build is stored in `/dist` folder. It is not in **.gitignore** just because to show that project is building

# Test api

to test `login`, need to:<br>
1. go to `test-backend-api`
2. run `npm i`
3. run `node ./test.js`

After that, testing server will up. To perform login requests to new API, do next: <br>
1. comment **upper** method `post` in `./src/app/shared/services/api.service.ts`
2. uncomment **lower** method `post` in the same file

On 2 (second) try, server will responde with `200` status, just to emuldate success flow