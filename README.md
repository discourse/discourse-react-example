discouse-react-example
======================

This is an example of how one could embed a React component in Discourse. It is a proof of concept, and is
not a recommended pattern unless you are fully aware of the trade offs.

**You probably don't want to do this!**


How it works
============

We have a plugin connector in `discovery-list-container-top` which inserts an `{{embed-react}}`
Ember component.

In the component's `didInsertElement` hook we asynchronously load React and ReactDOM
and trigger a callback when it's ready. That callback mounts the react application and
things start to work.

When the ember component is removed from the DOM `willDestroyElement`, we unmount the react component.


Cautions before using this approach
===================================

1. Adding React will add an additional 107k (minified) to your download, plus parsing speed.

2. Anything that you implement in a React component could be implemented in Ember.js without having to use this approach.

3. Discourse comes with a rich set of components and toolkits to build your interface in Ember. You'd have to re-write them in React.

4. We have established patterns for Internationalization (I18n) that would have to be re-created in React.
