var ary = [12, 13, 23, 14, 16, 11,66,77,45];

function insert(ary) {
    //->先抓一张牌（一般都抓第一张）
    var handAry = [];//存储的是手里已经抓取的牌
    handAry.push(ary[0]);

    //->依次循环抓取后面的牌
    for (var i = 1; i < ary.length; i++) {
        var item = ary[i];//->本次新抓的这张牌
        //拿新抓的牌和手里的牌比较
        for (var j = handAry.length - 1; j >= 0; j--) {

            if (item > handAry[j]) {
                handAry.splice(j + 1, 0, item);
                break;
            }
            //新抓的牌最小，放在开始位置
            if (j === 0) {
                handAry.unshift(item);
            }

        }

    }
    return handAry;

}

console.log(insert(ary));

