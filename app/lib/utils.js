

const isFunction = (fn) => {
   return Object.prototype.toString.call(fn)=== '[object Function]';
}


const formatMoney = (str , dot) => {

   dot = dot > 0 && dot <= 20 ? dot : 2;
   str = parseFloat((str + "").replace(/[^\d\.-]/g, "")).toFixed(dot) + "";
   var l = str.split(".")[0].split("").reverse(),
   r = str.split(".")[1];
   let t = "";
   for(let i = 0; i < l.length; i ++ )
   {
      t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
   }
   return str != 'NaN' ? t.split("").reverse().join("") + "." + r : '0';
}



export {formatMoney}
