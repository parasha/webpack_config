function findScrollTarget(el) {
  const nodeName = el.nodeName.toLowerCase()
  if (nodeName != '#document') {
    if (window.getComputedStyle(el).overflowY == 'scroll') {
      return el
    } else {
      return findScrollTarget(el.parentNode)
    }
  } else {
    return document
  }
}

function getDistanceFromBottom(el, scrollTarget) {
  if (scrollTarget.nodeName == '#document') {
    return el.getBoundingClientRect().bottom - window.screen.height;
  } else {
    return el.getBoundingClientRect().bottom - scrollTarget.clientHeight;
  }
}

/**
 *  将指令绑定在滚动的列表上，监听其父元素的 scroll 事件
 */
const scroll_load = {
  install(Vue) {
    console.log('插件安装', this, scroll_load);
    Vue.directive('ScrollLoad', this)
  },
  bind(el, binding, vnode) {
    console.log('bind-el', el)
    console.log('bind-binding', binding)
    console.log('bind-vnode', vnode)

    vnode.context.$nextTick(() => {
      const scrollTarget = findScrollTarget(el);
      scrollTarget.addEventListener('scroll', function () {
        if (100 > getDistanceFromBottom(el, scrollTarget)) {
          binding.value();
        }
      })
    });
  }
}

export default scroll_load;