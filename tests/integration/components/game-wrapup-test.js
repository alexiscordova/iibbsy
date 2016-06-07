import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('game-wrapup', 'Integration | Component | game wrapup', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{game-wrapup}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#game-wrapup}}
      template block text
    {{/game-wrapup}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
