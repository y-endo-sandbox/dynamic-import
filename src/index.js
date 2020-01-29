import moduleA from './modules/moduleA';
let moduleB;

// moduleBを3秒後、動的に読み込んでみる
setTimeout(() => {
  import('./modules/moduleB').then(module => {
    moduleB = module.default;
  });
}, 3000);

document.addEventListener('click', async event => {
  const button = event.target.closest('button');

  if (button === null) return;

  switch (button.textContent) {
    case 'moduleA()':
      // 静的インポートなので当然問題なくスグ動く
      moduleA();
      break;
    case 'moduleB()':
      // dynamic-importが完了してからは動作する
      moduleB();
      break;
    case 'moduleC()': {
      const { default: moduleC } = await import('./modules/moduleC');
      moduleC();
      break;
    }
    default:
      break;
  }
});
