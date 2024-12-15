document.getElementById('timetableForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const startTime = document.getElementById('startTime').value;
    const band = parseInt(document.getElementById('band').value);
    const bandtime = parseInt(document.getElementById('bandtime').value);
    const changetime = parseInt(document.getElementById('changetime').value);

    const [first, second] = startTime.split(':').map(Number);
    const preview = document.getElementById('preview');
    preview.innerHTML = generateTimetable(first, second, band, bandtime, changetime);
});

function generateTimetable(first, second, band, bandtime, changetime) {
    let output = "<table><tr><th>時間</th><th>内容</th></tr>";
    output += `<tr><td>${first.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}</td><td><input type="text" value="" placeholder="内容を入力"></td></tr>`;
    for (let i = 0; i < band; i++) {
        second += bandtime;
        if (second >= 60) {
            first += 1;
            second -= 60;
        }
        output += `<tr><td>~${first.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}</td><td><input type="text" value="バンド${i + 1}"></td></tr>`;
        second += changetime;
        if (second >= 60) {
            first += 1;
            second -= 60;
        }
        if (changetime != 0) {
            output += `<tr><td>~${first.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}</td><td><input type="text" value="転換"></td></tr>`;
        }
    }
    output += "</table>";
    return output;
}