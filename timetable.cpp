#include <iostream>
#include <iomanip>
#include <fstream>
using namespace std;

void rehatable(int &hour, int &minuit, ofstream &outfile, int band, int rehatime, int rehachangetime){
    outfile << "|時間| |"<< endl;
    outfile << "|:-:|:-:|"<< endl;
    outfile << "|" << setw(2) << setfill('0') << hour << ":" << setw(2) << setfill('0') << minuit << "| リハ START |" << endl;
    outfile << "|" << setw(2) << setfill('0') << hour << ":" << setw(2) << setfill('0') << minuit ;
    for (int i = band; i > 0; i--)
    {
        minuit += rehatime; //バンドリハの演奏時間
        if (minuit >= 60){
            hour += 1;
            minuit -= 60;
        }
        outfile << "~" << setw(2) << setfill('0') << hour << ":" << setw(2) << setfill('0') << minuit << "|" << "バンド" << i << "|" << endl;
        if(i != 1){
            outfile << "|" << setw(2) << setfill('0') << hour << ":" << setw(2) << setfill('0') << minuit ;
        }
        if(i != 1){
            minuit += rehachangetime; //リハ転換時間
            if (minuit >= 60){
                hour += 1;
                minuit -= 60;
            }
            if(rehachangetime != 0){
            outfile << "~" << setw(2) << setfill('0') << hour << ":" << setw(2) << setfill('0') << minuit << "|" << "転換" << "|" << endl;
            outfile << "|" << setw(2) << setfill('0') << hour << ":" << setw(2) << setfill('0') << minuit ;
            }
        } else {
            outfile << "|" << setw(2) << setfill('0') << hour << ":" << setw(2) << setfill('0') << minuit << "|" << "リハ終了" << "|" << endl;
        }
    }
};

void timetable(int hour, int minuit, ofstream &outfile, int band, int bandtime, int changetime){
    outfile << "|" << setw(2) << setfill('0') << hour << ":" << setw(2) << setfill('0') << minuit << "| ライブ START |" << endl;
    outfile << "|" << setw(2) << setfill('0') << hour << ":" << setw(2) << setfill('0') << minuit ;
    for (int i = 0; i < band; i++)
    {
        minuit += bandtime; //バンドの演奏時間
        if (minuit >= 60){
            hour += 1;
            minuit -= 60;
        }
        outfile << "~" << setw(2) << setfill('0') << hour << ":" << setw(2) << setfill('0') << minuit << "|" << "バンド" << i+1 << "|" << endl;
        outfile << "|" << setw(2) << setfill('0') << hour << ":" << setw(2) << setfill('0') << minuit ;

        minuit += changetime; //転換時間
        if (minuit >= 60){
            hour += 1;
            minuit -= 60;
        }
        if(changetime != 0){
        outfile << "~" << setw(2) << setfill('0') << hour << ":" << setw(2) << setfill('0') << minuit << "|" << "転換" << "|" << endl;
        outfile << "|" << setw(2) << setfill('0') << hour << ":" << setw(2) << setfill('0') << minuit ;
        }

        if(i == band-1){
            outfile << "|" << "終了" << "|" << endl;
        }
    }
};


int main(){
    int hour = 0;
    int minuit = 0;
    char colon;
    int band = 8;  //バンド数によって変更
    int rehatime = 30; //リハの時間に合わせて変更
    int rehachangetime = 15; //リハの転換時間に合わせて変更
    int bandtime = 30; //ライブ時間に合わせて変更
    int changetime = 15; //転換時間に合わせて変更
    cout << "演奏の開始時刻を入力してください。ex.(HH:MM) ->";
    cin >> hour >> colon >> minuit;
    ofstream outfile("timetable.md");
    if (!outfile){
        cout << "ファイルを開けませんでした。";
        return 1;
    }
    rehatable(hour, minuit, outfile, band, rehatime, rehachangetime);
    timetable(hour, minuit, outfile, band, bandtime, changetime);
    outfile.close();
    return 0;
}