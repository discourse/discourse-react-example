import loadScript from "discourse/lib/load-script";

let React, ReactDOM;

export default Ember.Component.extend({
  className: 'embed-react',
  reactReady: null,
  reactLoading: null,
  React: null,

  didInsertElement(...args) {
    this._super(...args);
    this.set('reactReady', false);
    this.set('reactLoading', true);

    loadScript('https://unpkg.com/react@16/umd/react.development.js').then(() => {
      return loadScript('https://unpkg.com/react-dom@16/umd/react-dom.development.js');
    }).then((x) => {
      React = window.React;
      ReactDOM = window.ReactDOM;
      this.set('reactReady', true);
      Ember.run.scheduleOnce('afterRender', this, this.startReact);
    }).catch(() => {
      this.set('reactLoading', false);
    });
  },

  startReact() {
    if (!this.element || this.isDestroying || this.isDestroyed) { return; }
    const e = React.createElement;

    class CoolButton extends React.Component {
      constructor(props) {
        super(props);
        this.state = { clicks: 0 };
      }

      render() {
        return e(
          'div',
          null,
          [
            e(
              'button',
              { key: 'button', onClick: () => this.setState({ clicks: this.state.clicks + 1 }) },
              "REACTIFY ME!"
            ),
            e('span', { key: 'label' }, ` You reacted ${this.state.clicks} time(s)`)
          ]
        );
      }
    }

    let container = this.element.querySelector('.react-container');
    if (container) {
      ReactDOM.render(e(CoolButton), container);
    }
  },

  willDestroyElement() {
    if (this.reactReady && this.element) {
      let container = this.element.querySelector('.react-container');
      if (container) {
        ReactDOM.unmountComponentAtNode(container);
      }
    }
  }

});
