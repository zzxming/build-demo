const bundle = window.bundle;
const { C } = bundle;

console.log(document.querySelector('#container'))
const c = new C(document.querySelector('#container'));
document.querySelector('#btn').onclick = () => {
  c.log();
};
