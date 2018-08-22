let map = [
    [0, 5, 0, 5, 7],
    [0, 0, 4, 0, 0],
    [0, 0, 0, 8, 2],
    [0, 0, 8, 0, 6],
    [0, 3, 0, 0, 0]
];
let s = [];
function Print(s) {
    while (s.length) {
       console.log(s[s.length-1]," ") ;
        s.pop();
    }
   // cout << endl;
}
function findval(s, val) {
    while (s.length) {
        if (s[s.length-1] == val) {
            return true;
        }
        s.pop();
    }
    return false;
}

function AllPath(start, end) {
    console.log('AllPath:',start, end)
    if (start == end) {
        Print(s);
        s.pop();
        return;
    }

    for (let i = 0; i < 5; i++) {
        if (map[start][i] != -1 && start != i && findval(s, i) == false) {
            s.push(i);
            AllPath(i, end);
        }
    }

    //这一步很重要！对于start节点遍历所有连接，如果遍历完，就要把stack中的start节点pop掉，否则会无限递归
    s.pop();
}

function main() {
    let X = 0, Y = 4;
    s.push(X);
    while (s.length) {
        AllPath(X, Y);
    }
    return 0;
}
main();

// let s=[];
// s.push(1);console.log(s);
// s.pop();
// console.log(s);
// console.log(Boolean(s.length))