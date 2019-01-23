import Pub from '../src';

describe('Pub', () => {
  const instance = new Pub();

  it('addListener', () => {
    expect(addTest(instance)).toBe(1);
  });
});

function addTest(instance) {
  instance.addListener('ready', () => {
    console.log('ready!');
  });

  return instance.listeners('ready').length;
}
