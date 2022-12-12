#ifndef BANKWINDOW_H
#define BANKWINDOW_H

#include <QDialog>
#include <QtNetwork>
#include <QNetworkAccessManager>
#include <QJsonDocument>
#include <QTimer>
#include "history.h"
#include "status.h"
#include "withdraw.h"
#include "moneysend.h"
#include "withdrawdialog.h"

#include "url.h"

namespace Ui {
class BankWindow;
}

class BankWindow : public QDialog
{
    Q_OBJECT

public:
    explicit BankWindow(QString cardnum,bool credit,QByteArray webToken,QString iduser,  QWidget *parent = nullptr);

    const QByteArray &getWebToken() const;


    void setWebToken(const QByteArray &newWebToken);
    void onActivity();
    void onWithdrawal(QString item);

    ~BankWindow();

private slots:

    void dataSlot (QNetworkReply *reply);
    void userSlot (QNetworkReply *reply);

    void timeCounter();

    void on_Btn_nosta_clicked();

    void on_Btn_saldo_clicked();

    void on_Btn_loki_clicked();

    void on_Btn_lah_clicked();

    void on_Btn_exit_clicked();


private:
    Ui::BankWindow *ui;
    bool usingCredit;
    QString idaccount;
    QString cardnum;
    QString name;
    QString iduser;
    int timerRounds=0;

    withdraw *objectWithdraw = nullptr;
    history *objectHistory = nullptr;
    status *objectStatus = nullptr;
    moneysend *objectMoneysend = nullptr;
    withdrawDialog *objectDialogWindow = nullptr;

    QTimer *sessionTimer;

    QByteArray webToken;
    QNetworkAccessManager *dataManager;
    QNetworkAccessManager *userManager;
    void getUser();
    void getAccount(QString cardnum);
    bool getCredit();
    QNetworkReply *reply;
    QByteArray response_data;
    bool boolhistory = 0, boolstatus = 0, boolwithdraw = 0, boolmoneysend = 0, booldeposit = 0;
    void logOut();
    void resetTimer();

signals:
    void loggedout();

};

#endif // BANKWINDOW_H
