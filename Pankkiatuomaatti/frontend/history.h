#ifndef HISTORY_H
#define HISTORY_H

#include <QDialog>
#include <QtNetwork>
#include <QNetworkAccessManager>
#include <QJsonDocument>
#include "url.h"

namespace Ui {
class history;
}

class history : public QDialog
{
    Q_OBJECT

public:
    explicit history(QString idaccount, QByteArray webToken, QWidget *parent = nullptr);
    ~history();

signals:
    void activity();

private slots:
    void logSlot (QNetworkReply *reply);

    void on_pushButton_2_clicked();

    void on_pushButton_3_clicked();

    void on_pushButton_clicked();

private:
    Ui::history *ui;

    void getLog(QString idaccount, QByteArray webToken);

    QByteArray webToken;
    QNetworkAccessManager *dataManager;
    QNetworkReply *reply;
    QByteArray response_data;
    QStringList logitems;
    int j;
    int max;
    QString idaccount;

};

#endif // HISTORY_H
