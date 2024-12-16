document.getElementById('timetableForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const startTime = document.getElementById('startTime').value;
    const band = parseInt(document.getElementById('band').value);
    const rehatime = parseInt(document.getElementById('rehatime').value);
    const rehachangetime = parseInt(document.getElementById('rehachangetime').value);
    const befor_open = parseInt(document.getElementById('befor_open').value);
    const after_open = parseInt(document.getElementById('after_open').value);
    const bandtime = parseInt(document.getElementById('bandtime').value);
    const changetime = parseInt(document.getElementById('changetime').value);

    const [hour, minuit] = startTime.split(':').map(Number);
    const preview = document.getElementById('preview');
    preview.innerHTML = generateTimetable(hour, minuit, band, rehatime, rehachangetime, befor_open, after_open, bandtime, changetime);
});

function generateTimetable(hour, minuit, band, rehatime, rehachangetime, befor_open, after_open, bandtime, changetime) {
    let output = "<table border='1'><tr><th>時間</th><th>内容</th></tr>";
    if (rehatime != 0 || rehachangetime != 0) {
        output += `<tr><td>${hour.toString().padStart(2, '0')}:${minuit.toString().padStart(2, '0')}</td><td>リハ START</td></tr>`;
        for (let i = band; i > 0; i--) {
            const startHour = hour;
            const startMinuit = minuit;
            minuit += rehatime;
            if (minuit >= 60) {
                hour += 1;
                minuit -= 60;
            }
            output += `<tr><td>${startHour.toString().padStart(2, '0')}:${startMinuit.toString().padStart(2, '0')} ~ ${hour.toString().padStart(2, '0')}:${minuit.toString().padStart(2, '0')}</td><td>バンド${i} リハ</td></tr>`;
            if (i != 1) {
                const changeStartHour = hour;
                const changeStartMinuit = minuit;
                minuit += rehachangetime;
                if (minuit >= 60) {
                    hour += 1;
                    minuit -= 60;
                }
                if (rehachangetime != 0) {
                    output += `<tr><td>${changeStartHour.toString().padStart(2, '0')}:${changeStartMinuit.toString().padStart(2, '0')} ~ ${hour.toString().padStart(2, '0')}:${minuit.toString().padStart(2, '0')}</td><td>転換</td></tr>`;
                }
            } else {
                output += `<tr><td>${hour.toString().padStart(2, '0')}:${minuit.toString().padStart(2, '0')}</td><td>リハ終了</td></tr>`;
            }
        }
    }


    minuit += befor_open;
    if (minuit >= 60) {
        hour += 1;
        minuit -= 60;
    }
    if (befor_open != 0) {
        output += `<tr><td>${hour.toString().padStart(2, '0')}:${minuit.toString().padStart(2, '0')} ~ </td><td>OPEN</td></tr>`;
    }

    minuit += after_open;
    if (minuit >= 60) {
        hour += 1;
        minuit -= 60;
    }
    output += `<tr><td>${hour.toString().padStart(2, '0')}:${minuit.toString().padStart(2, '0')}</td><td>ライブ START</td></tr>`;

    for (let i = 0; i < band; i++) {
        const bandStartHour = hour;
        const bandStartMinuit = minuit;
        minuit += bandtime;
        if (minuit >= 60) {
            hour += 1;
            minuit -= 60;
        }
        output += `<tr><td>${bandStartHour.toString().padStart(2, '0')}:${bandStartMinuit.toString().padStart(2, '0')} ~ ${hour.toString().padStart(2, '0')}:${minuit.toString().padStart(2, '0')}</td><td>バンド${i + 1}</td></tr>`;
        const changeStartHour = hour;
        const changeStartMinuit = minuit;
        minuit += changetime;
        if (minuit >= 60) {
            hour += 1;
            minuit -= 60;
        }
        if (changetime != 0) {
            output += `<tr><td>${changeStartHour.toString().padStart(2, '0')}:${changeStartMinuit.toString().padStart(2, '0')} ~ ${hour.toString().padStart(2, '0')}:${minuit.toString().padStart(2, '0')}</td><td>転換</td></tr>`;
        }
    }

    output += `<tr><td>${hour.toString().padStart(2, '0')}:${minuit.toString().padStart(2, '0')}</td><td>完パケ</td></tr>`;
    output += "</table>";
    return output;
}