#include <iostream>
#include <iomanip>
#include <fstream>
using namespace std;

void timetable( int first, int second, ofstream &outfile){
    outfile << "|時間| |"<< endl;
    outfile << "|:-:|:-:|"<< endl;
    outfile << "|" << setw(2) << setfill('0') << first << ":" << setw(2) << setfill('0') << second << "|" << "|" << endl;
    for (int i = 0; i < 5; i++)
    {
        second += 30; //ライブ時間に合わせて別途変更
        if (second >= 60){
            first += 1;
            second -= 60;
        }
        outfile << "|" << "~" << setw(2) << setfill('0') << first << ":" << setw(2) << setfill('0') << second << "|" << "バンド" << i+1 << "|" << endl;
        second += 15; //転換時間に合わせて別途変更
        if (second >= 60){
            first += 1;
            second -= 60;
        }
        outfile << "|" << "~" << setw(2) << setfill('0') << first << ":" << setw(2) << setfill('0') << second << "|" << "転換" << "|" << endl;
    }
};

int main(){
    int first = 0;
    int second = 0;
    char colon;
    cout << "演奏の開始時刻を入力してください。";
    cin >> first >> colon >> second;
    ofstream outfile("timetable.md");
    if (!outfile){
        cout << "ファイルを開けませんでした。";
        return 1;
    }
    timetable(first, second, outfile);
    outfile.close();
    return 0;
}