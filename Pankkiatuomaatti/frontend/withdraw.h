#ifndef WITHDRAW_H
#define WITHDRAW_H

#include <QDialog>
#include <QRegExpValidator>
#include <QtNetwork>
#include <QNetworkAccessManager>
#include <QJsonDocument>
#include "url.h"
#include "withdrawdialog.h"

namespace Ui {
class withdraw;
}

class withdraw : public QDialog
{
    Q_OBJECT

public:
    explicit withdraw(QString idaccount, QByteArray webToken,QWidget *parent = nullptr);
    ~withdraw();
signals:
    void withdrawal(QString nosto);
    void activity();

private slots:

    void dataSlot (QNetworkReply *reply);

    void on_btn20_clicked();

    void on_btn40_clicked();

    void on_btn50_clicked();

    void on_btn100_clicked();

    void on_nostaBTN_clicked();

    void on_suljeBTN_clicked();

    void on_summa_textChanged(const QString &arg1);

private:
    Ui::withdraw *ui;
    int amount;
    QString idaccount;
    QString nosto;

    QByteArray webToken;
    QNetworkAccessManager *updateManager;
    QNetworkReply *reply;
    QByteArray response_data;

    withdrawDialog *objectDialogWindow;

    void getMoney(int amount);
};

#endif // WITHDRAW_H
