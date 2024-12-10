"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline");
function timetable(first, second) {
    for (var i = 0; i < 16; i++) {
        second += 30;
        if (second >= 60) {
            first += 1;
            second -= 60;
        }
        console.log("~".concat(first.toString().padStart(2, '0'), ":").concat(second.toString().padStart(2, '0'), "   :\u30D0\u30F3\u30C9").concat(i + 1));
        second += 15;
        if (second >= 60) {
            first += 1;
            second -= 60;
        }
        console.log("~".concat(first.toString().padStart(2, '0'), ":").concat(second.toString().padStart(2, '0'), "   :\u8EE2\u63DB"));
    }
}
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.question('バンドの開始時間を入力してください (HH:MM): ', function (input) {
    var _a = input.split(':').map(Number), first = _a[0], second = _a[1];
    timetable(first, second);
    rl.close();
});
