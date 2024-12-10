#include <iostream>
#include <iomanip>
using namespace std;

void timetable( int first, int second ){
    for (int i = 0; i < 16; i++)
    {
        second += 30; //ライブ時間に合わせて別途変更
        if (second >= 60){
            first += 1;
            second -= 60;
        }
        cout << "~" << setw(2) << setfill('0') << first << ":" << setw(2) << setfill('0') << second << "   :  バンド" << i+1 << endl;
        second += 15; //転換時間に合わせて別途変更
        if (second >= 60){
            first += 1;
            second -= 60;
        }
        cout << "~" << setw(2) << setfill('0') << first << ":" << setw(2) << setfill('0') << second << "   :  転換" << endl;
    }
};

int main(){
    int first = 0;
    int second = 0;
    char colon;
    cout << "演奏の開始時刻を入力してください。"
    cin >> first >> colon >> second;
    timetable(first, second);
    return 0;
}