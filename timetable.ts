import * as readline from 'readline';
import * as fs from 'fs';

function timetable(first: number, second: number, outfile: fs.WriteStream): void {
    const band = 8;  // バンド数によって変更
    const bandtime = 30; // ライブ時間に合わせて変更
    const changetime = 15; // 転換時間に合わせて変更

    outfile.write("|時間| |\n");
    outfile.write("|:-:|:-:|\n");
    outfile.write(`|${first.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}| |\n`);
    for (let i = 0; i < band; i++) {
        second += bandtime;
        if (second >= 60) {
            first += 1;
            second -= 60;
        }
        outfile.write(`|~${first.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}|バンド${i + 1}|\n`);
        second += changetime;
        if (second >= 60) {
            first += 1;
            second -= 60;
        }
        outfile.write(`|~${first.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}|転換|\n`);
    }
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('演奏の開始時刻を入力してください (HH:MM): ', (input) => {
    const [first, second] = input.split(':').map(Number);
    const outfile = fs.createWriteStream('timetable.md');
    timetable(first, second, outfile);
    outfile.end();
    console.log('タイムテーブルがtimetable.mdに書き込まれました。');
    rl.close();
});