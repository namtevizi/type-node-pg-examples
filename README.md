## Steps to setup NodeJS TypeScript PostgreSQL

### Step 1 - Create the project folder

```
mkdir <project-name>
```

### Step 2 - Init the project

```
cd <project-name>
npm init -y
```

### Step 3 - Configure typescript options

```
npx tsc --init
```

Edit the tsconfig.json file as follows:

```
{
  "compilerOptions": {
    "target": "es2016",                       
    "experimentalDecorators": true, 
    "emitDecoratorMetadata": true, 
    "module": "commonjs", 
    "rootDir": "./src", 
    "moduleResolution": "node",
    "sourceMap": true, 
    "outDir": "./dist", 
    "esModuleInterop": true, 
    "strict": true, 
    "skipLibCheck": true 
  }
}
```

### Step 4 - Add dependencies

```
npm install typescript ts-node ts-node-dev @types/node --save-dev
npm install pg dotenv
npm install @types/pg --save-dev
```

### Step 5 - Create the main.ts

```
mkdir src
cd src
touch main.ts
```

And then add the following code

```
console.log("The world is flat.")
```

### Step 6 - Run the app

Now let's add the following script to our package.json file.

```
{
  // ...
  "type": "module",
  "scripts": {
    "start": "npx ts-node ./src/main.ts",
    "dev": "npx ts-node-dev ./src/main.ts"
  },
  // ...
}
```

Now that you can run the app

```
npm start

or

npm run dev
```
