import * as readline from 'readline';

function timetable(first: number, second: number): void {
    for (let i = 0; i < 16; i++) {
        second += 30;
        if (second >= 60) {
            first += 1;
            second -= 60;
        }
        console.log(`~${first.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}   :バンド${i + 1}`);
        second += 15;
        if (second >= 60) {
            first += 1;
            second -= 60;
        }
        console.log(`~${first.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}   :転換`);
    }
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('バンドの開始時間を入力してください (HH:MM): ', (input) => {
    const [first, second] = input.split(':').map(Number);
    timetable(first, second);
    rl.close();
});