import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('due-up-batters', 'Integration | Component | due up batters', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{due-up-batters}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#due-up-batters}}
      template block text
    {{/due-up-batters}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
