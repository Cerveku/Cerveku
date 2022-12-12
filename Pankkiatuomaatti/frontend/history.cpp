#include "history.h"
#include "ui_history.h"

history::history(QString idaccount, QByteArray webToken, QWidget *parent) :
    QDialog(parent),
    ui(new Ui::history)
{
    setWindowFlags(Qt::WindowTitleHint | Qt::WindowMinimizeButtonHint);
    ui->setupUi(this);
    j=0;
        this->getLog(idaccount,webToken);
    this->idaccount = idaccount;
    this->webToken = webToken;

    QPixmap bkgnd(":/graphics/graphics/graphics/pic.png"); //tässä luodaan taustagrafiikka
    bkgnd = bkgnd.scaled(this->size(), Qt::IgnoreAspectRatio);
    QPalette palette;
    palette.setBrush(QPalette::Window, bkgnd);
    this->setPalette(palette);
    this->ui->logList->setAlternatingRowColors(true);

}

history::~history()
{
    delete ui;
}

void history::logSlot(QNetworkReply *reply)
{

    QByteArray response_data=reply->readAll();
    QJsonDocument json_doc = QJsonDocument::fromJson(response_data);
    QJsonArray json_array = json_doc.array();
    max = json_array.size();
    QString item="";
    foreach (const QJsonValue &value, json_array) {
        QJsonObject json_obj = value.toObject();
        QString temp = json_obj["transaction_time"].toString();
        QStringList tempSplit = temp.split("T");
        QString amount;
        double summa = json_obj["withdraw_amount"].toDouble();
        if (summa >= 1000) {
            amount =QString::number(summa/1000)+ "K";
        } else {amount = QString::number(summa);}


        item="Summa: " + amount +"€   \t\tTapahtuma: " + json_obj["transaction_type"].toString() + " \t Päivä: "+tempSplit[0] + "     \tAika:"+ tempSplit[1].split(".")[0];
        logitems<< item;
    }
if (max >= 10){
    for (int i = j; i < j+10; i++) {
      this->ui->logList->addItem(logitems.at(i));
    }}
else {
    for (int i = 0; i < max; i++) {
      this->ui->logList->addItem(logitems.at(i));
    }
}
    //qDebug()<<logitems;
    reply->deleteLater();
    dataManager->deleteLater();
}

 void history::getLog(QString idaccount, QByteArray webToken) {
    //ui->setupUi(this);

    //qDebug()<<webToken;
    QString site_url=url::getBaseUrl()+"/log/logs/"+idaccount;
   // qDebug()<<site_url;
    QNetworkRequest request((site_url));
    //WEBTOKEN ALKU
    request.setRawHeader(QByteArray("Authorization"),(webToken));
    //WEBTOKEN LOPPU
    dataManager = new QNetworkAccessManager(this);

    connect(dataManager, SIGNAL(finished(QNetworkReply*)), this, SLOT(logSlot(QNetworkReply*)));

    reply = dataManager->get(request);
}

void history::on_pushButton_2_clicked()
{
    emit activity();
    if(j < max - 10) {
        j = j+10;
        if (j > max - 10){j = max-10;}
        this->getLog(idaccount,webToken);
        this->ui->logList->clear();
    }

}


void history::on_pushButton_3_clicked()
{
    emit activity();
    if(j > 0){
        j = j-10;
        if(j<0) {j=0;}
        this->getLog(idaccount,webToken);
        this->ui->logList->clear();
    }
}


void history::on_pushButton_clicked()
{
    this->close();
}

