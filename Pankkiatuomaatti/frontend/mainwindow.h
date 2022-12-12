#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>
#include <QtNetwork>
#include <QNetworkAccessManager>
#include <QJsonDocument>
#include <QTimer>
#include <QRegExpValidator>
#include <QKeyEvent>

#include "url.h"
#include "bankwindow.h"

QT_BEGIN_NAMESPACE
namespace Ui { class MainWindow; }
QT_END_NAMESPACE

class MainWindow : public QMainWindow
{
    Q_OBJECT

public:
    MainWindow(QWidget *parent = nullptr);
    ~MainWindow();

private:
    Ui::MainWindow *ui;
    QNetworkAccessManager *loginManager;
    QNetworkReply *reply;
    QByteArray response_data;
    QString cardnum;
    QString iduser;
    BankWindow *objectBankWindow;
    void reset();
    void logIn(bool credit);
    QTimer * pinTimer;
    int timer = 20;
    QByteArray token;

private slots:
    void on_btnLogin_clicked();
    void loginSlot (QNetworkReply *reply);
    void on_cardpin_returnPressed();
    void on_cardnum_returnPressed();
    void on_cardpin_textEdited(const QString &arg1);
    void TimerSlot();
    void on_btnCredit_clicked();
    void on_btnDebit_clicked();
    void onLogout();
    void keyPressEvent( QKeyEvent * event );
};
#endif // MAINWINDOW_H
