import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.directive('sticky', {
  inserted(el, binding) { 
    const rect = el.getBoundingClientRect();
    const originTop = rect.top + window.pageYOffset;
    const originLeft = rect.left + window.pageXOffset;
    if (!binding.value.top) { binding.value.top = 0; }
    const paddingTop = binding.value.top; //吸顶偏移量
    window.stickyScrollCallback = () => {
      if (window.pageYOffset > originTop - paddingTop){ //使用模板字符串拼接
       //模板字符串拼接css
        if (binding.value.isVertical === false) {
          el.style.cssText = `     
          position: fixed;
          left: ${originLeft}px;
          top: ${paddingTop}px;
          z-index: 10;
          box-shadow: 0 0 5px #ddd;
          width:100%;`;
          
        }
        } else {
            el.style.cssText = '';
        }
        }//监听scroll事件
        window, addEventListener('scroll', window.stickyScrollCallback);
      },
      unbind() {
        window.removeEventListener('scroll', window.stickyScrollCallback);
      }
  })
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
