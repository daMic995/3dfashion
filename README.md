<p align="center">
  <a href="https://nextjs-flask-starter.vercel.app/">
    <img src="public/3dfashion.png" height="96">
    <h3 align="center">3D Fashion App</h3>
  </a>
</p>

<p align="center">Next.js project that uses <a href="https://flask.palletsprojects.com/">Flask</a> as the API backend.</p>

<br/>

## Introduction

This is a hybrid Next.js + Python app that uses Next.js as the frontend and Flask as the API backend. This project involves building a web app that provides a user-friendly 3D clothes design web application that can be used as a means of sending designs to tailors and sharing to a community of designers. Utilizing an AI-powered body measurement tool, a user's body measurements is used to create a 3D model that reflects their 3D-selves on which they can style and design clothes on and connect with a tailor from the websites platform to get the final outfit.

## How It Works

The Python/Flask server is mapped into to Next.js app under `/api/`.

This is implemented using [`next.config.js` rewrites](https://github.com/vercel/examples/blob/main/python/nextjs-flask/next.config.js) to map any request to `/api/:path*` to the Flask API, which is hosted in the `/api` folder.

On localhost, the rewrite will be made to the `127.0.0.1:5328` port, which is where the Flask server is running.

In production, the Flask server is hosted as [Python serverless functions](https://vercel.com/docs/concepts/functions/serverless-functions/runtimes/python) on Vercel.

## Demo
https://nextjs-flask-starter-git-main-damic995s-projects.vercel.app/
