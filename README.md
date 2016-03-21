[![Build Status](https://travis-ci.org/sysgarage/generator-sys-angular.svg?branch=master)](https://travis-ci.org/sysgarage/generator-sys-angular)
[![npm version](https://badge.fury.io/js/generator-sys-angular.svg)](http://badge.fury.io/js/generator-sys-angular)

# AngularJS generator

> Yeoman generator for AngularJS projects by SysGarage

## Prerequisites

* Node.js - Download and install [Node.js](https://nodejs.org)

## Install

Install Yeoman

`npm install -g yo`

Install generator

`npm install -g generator-sys-angular`

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
