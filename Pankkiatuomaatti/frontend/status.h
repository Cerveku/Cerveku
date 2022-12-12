#ifndef STATUS_H
#define STATUS_H

#include <QDialog>
#include <QtNetwork>
#include <QNetworkAccessManager>
#include <QJsonDocument>
#include "url.h"

namespace Ui {
class status;
}

class status : public QDialog
{
    Q_OBJECT

public:
    explicit status(QString idaccount, QByteArray webToken, QWidget *parent = nullptr);
    ~status();
signals:
    void activity();

private slots:
    void logSlot (QNetworkReply *reply);

    void dataSlot (QNetworkReply *reply);

    void on_pushButton_clicked();

private:
    Ui::status *ui;
    void getLog(QString idaccount, QByteArray webToken);
    void getBalance(QString idaccount, QByteArray webToken);
    QByteArray webToken;
    QNetworkAccessManager *dataManager;
    QNetworkReply *reply;
    QByteArray response_data;
    QNetworkAccessManager *logManager;
    QStringList logitems;


};

#endif // STATUS_H
