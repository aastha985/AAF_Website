# Contributing to the Parvaaz Parindey

Thanks for taking your time to consider contributing to the project!
In this file, you are going to find helpful tips on how to contribute your ideas!

We try to make contributing as easy and transparent as possible, whether it's:

- Reporting a bug

- Discussing the current state of the code

- Submitting a fix

- Proposing new features

## Submitting changes
* If you're unable to find an open issue, [open a new one](https://github.com/aastha985/ParvaazParindey/issues/new). Be sure to include a **title, a clear description of your idea or issue** and give as much relevant information as possible.
* Ask to be assigned to the issue by one of the moderators. This is essential to ensure no 2 people are working on the same issue.
* Make your changes and test them locally(setup your enviornment first:steps are given later in this document).
* Open  a new [GitHub Pull Request to API](https://github.com/aastha985/ParvaazParindey/pulls) with a clear list of what you've done (read more about [pull requests](http://help.github.com/pull-requests/)). Include the relevant issue number if applicable.

Unsure where to begin contributing? You can start by looking through these issues labels: 
* good first issue
* enhancement

## Use a Consistent Coding Style
* ES6 JavaScript
* Modularise the code as much as possible

## Setting up local environment for best usage.
* Run mongod in the background (you should have mongo installed in the system).
* Setup cloudinary account. Once that is done:
    * Export 2 environment variables: CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET. They need to be what the name suggests, copied  from your cloudinary account. 
    * Change cloudinary name in routes/opportunities.js and routes/explore.js to your name(also present in cloudinary account).
    * Be sure to reverse the second pointer before making a PR to the master branch.
* Run 'npm start' in the root directory of the project and you can access the website on localhost:3000/

## Some pointers
* Do not work on an issue already assigned to someone else! Always work on issue already assigned to you.
* Never be shy to ask for help! We are hoping to create an interactive community here, and will be available at all times for any issues in relation to the contribution guidelines, code, or the repository in general. This is for all of us to grow together!

Thanks! :heart: :heart: :heart:

[Asha Akanksha Foundation](https://github.com/aastha985/ParvaazParindey)
