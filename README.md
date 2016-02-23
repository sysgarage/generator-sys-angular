# AngularJS generator

> Yeoman generator for AngularJS projects by SysGarage

## Prerequisites

* Node.js - Download and install [Node.js](https://nodejs.org)

## Install

Install `yo` and `generator-sys-angular`

`npm install -g yo generator-sys-angular`

## Usage

Make a new directory, and `cd` into it

`mkdir my-new-project && cd $_`

Run generator

`yo sys-angular:module`

## Generators

Available generators:

* sys-angular:controller
* sys-angular:directive
* sys-angular:module
* sys-angular:route
* sys-angular:service

## Project Structure

Overview
```
└── src
    └── app                 - Application files
        ├── directives      - Directives shared by the whole application
        ├── modules         - Application modules
        └── services        - Services shared by the whole application
```
