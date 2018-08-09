//节流
//防抖动和节流本质是不一样的。防抖动是将多次执行变为最后一次执行，节流是将多次执行变成每隔一段时间执行。
/**
 * underscore 节流函数，返回函数连续调用时，func 执行频率限定为 次 / wait
 *
 * @param  {function}   func      回调函数
 * @param  {number}     wait      表示时间窗口的间隔
 * @param  {object}     options   如果想忽略开始函数的的调用，传入{leading: false}。
 *                                如果想忽略结尾函数的调用，传入{trailing: false}
 *                                两者不能共存，否则函数不能执行
 * @return {function}             返回客户调用函数   
 */
_.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
	var previous = 0;
		
    return function() {
      var now = _.now();
      if (!previous) previous = now;
      var remaining = wait - (now - previous);
      context = this;
	  args = arguments;   
	   
      if (remaining <= 0 || remaining > wait) {
        // 如果存在定时器就清理掉否则会调用二次回调
        // if (timeout) {
        //   clearTimeout(timeout);
        //   timeout = null;
        // }
        previous = now;
        result = func.apply(context, args);
        // if (!timeout) context = args = null;
	  } 
	  
      return result;
    };
  };