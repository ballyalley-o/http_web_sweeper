# HTTP WEB-Sweeper

> ## About

</br>

This is a simple HTTP web-sweeper written in Javascript. It is designed to be used as a tool for penetration testing and security auditing. It looks for the hits of links on a website and returns the amount found.

Report is generated in the console, and a log csv file is documented in the reports folder.

</br>

It is not intended to be used for illegal purposes.

</br>

<hr>

### Requirements:
* Node.js *(v18.7.0)*
* NPM

</br>

### Installation:

```
    git clone <repo>

    cd http-web-sweeper

    npm install

```

</br>
</br>
</br>
</br>

<div align="center">
   <p>
        It uses the node argv to input the url in the CLI
   </p>
</div>

</br>



### How to use:
```
npm start <url>
```

</br>


### Example:
```
npm start http://www.example.com
```
</br>
</br>

### Sample Report:

![sample Report](https://i.ibb.co/7zWsW3y/Screenshot-2023-05-20-at-11-23-30-PM.png)



</br>
</br>

### Packages used:

 * [moment](https://www.npmjs.com/package/moment)
 * [jsdom](https://www.npmjs.com/package/jsdom)
 * [jest](https://www.npmjs.com/package/jest)
 * [colors](https://www.npmjs.com/package/colors)
 * [nvm](https://www.npmjs.com/package/nvm)
 * [node v18.7.0](https://nodejs.org/en/)

Big thanks to all the developers of these packages and  most especially to [Wags Lane](wagslane.dev)