#include "status.h"
#include "ui_status.h"

status::status(QString idaccount, QByteArray webToken, QWidget *parent) :
    QDialog(parent),
    ui(new Ui::status)
{
    setWindowFlags(Qt::WindowTitleHint | Qt::WindowMinimizeButtonHint);
    ui->setupUi(this);
    this -> getBalance(idaccount, webToken);
    this->getLog(idaccount,webToken);

    QPixmap bkgnd(":/graphics/graphics/graphics/pic.png"); //tässä luodaan taustagrafiikka
    bkgnd = bkgnd.scaled(this->size(), Qt::IgnoreAspectRatio);
    QPalette palette;
    palette.setBrush(QPalette::Window, bkgnd);
    this->setPalette(palette);

    this->ui->logList->setAlternatingRowColors(true);
}

status::~status()
{
    delete ui;
}

void status::dataSlot(QNetworkReply *reply)
{

    //qDebug()<<reply->readAll();
    QByteArray response_data=reply->readAll();
    QJsonDocument json_doc = QJsonDocument::fromJson(response_data);
    QJsonObject json_obj = json_doc.object();
    double saldo = json_obj["balance"].toDouble();

    this->ui->label->setText(QString("Tilin saldo: %1 €").arg(saldo));



    reply->deleteLater();
    dataManager->deleteLater();
}
void status::getBalance(QString idaccount, QByteArray webToken){
    qDebug()<<webToken;
    QString site_url=url::getBaseUrl()+"/account/balance/"+idaccount;
    qDebug()<<site_url;
    QNetworkRequest request((site_url));
    //WEBTOKEN ALKU
    request.setRawHeader(QByteArray("Authorization"),(webToken));
    //WEBTOKEN LOPPU
    dataManager = new QNetworkAccessManager(this);

    connect(dataManager, SIGNAL(finished(QNetworkReply*)), this, SLOT(dataSlot(QNetworkReply*)));

    reply = dataManager->get(request);
}

void status::on_pushButton_clicked()
{
    emit activity();
    this->close();
}
void status::logSlot(QNetworkReply *reply)
{

    QByteArray response_data=reply->readAll();
    QJsonDocument json_doc = QJsonDocument::fromJson(response_data);
    QJsonArray json_array = json_doc.array();
    int max = json_array.size();

    QString item="";
    foreach (const QJsonValue &value, json_array) {
        QJsonObject json_obj = value.toObject();
        item="Summa: " + QString::number(json_obj["withdraw_amount"].toDouble())+"€ , Aika: "+json_obj["transaction_time"].toString()+" , Tapahtuman tyyppi: "+
               json_obj["transaction_type"].toString();
        logitems<< item;
    }
    if (max >= 5){
        for (int i = 0; i < 5; i++) {
          this->ui->logList->addItem(logitems.at(i));
        }}
    else {
        for (int i = 0; i < max; i++) {
          this->ui->logList->addItem(logitems.at(i));
        }
    }
    qDebug()<<logitems;
    reply->deleteLater();
    logManager->deleteLater();
}

 void status::getLog(QString idaccount, QByteArray webToken) {
    //ui->setupUi(this);

    //qDebug()<<webToken;
    QString site_url=url::getBaseUrl()+"/log/logs/"+idaccount;
   // qDebug()<<site_url;
    QNetworkRequest request((site_url));
    //WEBTOKEN ALKU
    request.setRawHeader(QByteArray("Authorization"),(webToken));
    //WEBTOKEN LOPPU
    logManager = new QNetworkAccessManager(this);

    connect(logManager, SIGNAL(finished(QNetworkReply*)), this, SLOT(logSlot(QNetworkReply*)));

    reply = logManager->get(request);
}

