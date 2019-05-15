const scroll_load = {
  install(Vue){
    console.log('插件安装',this,scroll_load);
    Vue.directive('ScrollLoad',this)
  },
  bind(el,binding,vnode){
    console.log('bind',el,binding,vnode,arguments)
    binding.value()
  }
}

export default scroll_load;