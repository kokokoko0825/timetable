"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline");
var fs = require("fs");
function timetable(first, second, outfile) {
    var band = 8; // バンド数によって変更
    var bandtime = 30; // ライブ時間に合わせて変更
    var changetime = 15; // 転換時間に合わせて変更
    outfile.write("|時間| |\n");
    outfile.write("|:-:|:-:|\n");
    outfile.write("|".concat(first.toString().padStart(2, '0'), ":").concat(second.toString().padStart(2, '0'), "| |\n"));
    for (var i = 0; i < band; i++) {
        second += bandtime;
        if (second >= 60) {
            first += 1;
            second -= 60;
        }
        outfile.write("|~".concat(first.toString().padStart(2, '0'), ":").concat(second.toString().padStart(2, '0'), "|\u30D0\u30F3\u30C9").concat(i + 1, "|\n"));
        second += changetime;
        if (second >= 60) {
            first += 1;
            second -= 60;
        }
        outfile.write("|~".concat(first.toString().padStart(2, '0'), ":").concat(second.toString().padStart(2, '0'), "|\u8EE2\u63DB|\n"));
    }
}
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.question('演奏の開始時刻を入力してください (HH:MM): ', function (input) {
    var _a = input.split(':').map(Number), first = _a[0], second = _a[1];
    var outfile = fs.createWriteStream('timetable.md');
    timetable(first, second, outfile);
    outfile.end();
    console.log('タイムテーブルがtimetable.mdに書き込まれました。');
    rl.close();
});
