#!/bin/bash

start_backend() {
  cd '/home/kaushik/Desktop/Web Dev/BlogSpot/client'
  npm run dev
}

start_frontend() {
  cd '/home/kaushik/Desktop/Web Dev/BlogSpot/server'
  nodemon server.js
}

start_backend &
start_frontend &

wait
