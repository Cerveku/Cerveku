#include "withdraw.h"
#include "qdebug.h"
#include "ui_withdraw.h"

withdraw::withdraw(QString idaccount, QByteArray webToken, QWidget *parent) :
    QDialog(parent),
    ui(new Ui::withdraw)
{
    setWindowFlags(Qt::WindowTitleHint | Qt::WindowMinimizeButtonHint);
    ui->setupUi(this);
    QRegExpValidator* rxv = new QRegExpValidator(QRegExp("\\d*"), this);
    this->ui->summa->setValidator(rxv);
    this->idaccount = idaccount;
    this->webToken = webToken;
    setAttribute(Qt::WA_DeleteOnClose);
    QPixmap bkgnd(":/graphics/graphics/graphics/pic.png"); //tässä luodaan taustagrafiikka
    bkgnd = bkgnd.scaled(this->size(), Qt::IgnoreAspectRatio);
    QPalette palette;
    palette.setBrush(QPalette::Window, bkgnd);
    this->setPalette(palette);
}

withdraw::~withdraw()
{
    delete ui;
}


void withdraw::on_btn20_clicked()
{
    amount = 20;
    this->getMoney(amount);
}


void withdraw::on_btn40_clicked()
{
    amount = 40;
    this->getMoney(amount);
}


void withdraw::on_btn50_clicked()
{
    amount = 50;
    this->getMoney(amount);
}


void withdraw::on_btn100_clicked()
{
    amount = 100;
    this->getMoney(amount);
}


void withdraw::on_nostaBTN_clicked()
{
    QString temp = this->ui->summa->text();
    amount= temp.toInt();
    this->getMoney(amount);
}


void withdraw::on_suljeBTN_clicked()
{
    this->close();
}

void withdraw::dataSlot(QNetworkReply *reply)
{

    //qDebug()<<reply->readAll();
    response_data=reply->readAll();
    int test=QString::compare(response_data,"false");
    qDebug()<< test;
    if(test==0){
        nosto = "NOSTO ONNISTUI";;
    }
    else {nosto = "NOSTO EPÄONNISTUI";}
    emit activity();

    emit withdrawal(nosto);

    this->close();

    reply->deleteLater();
    updateManager->deleteLater();
}
void withdraw::getMoney(int amount){

    QJsonObject jsonObj;
    jsonObj.insert("amount",amount);


    QString site_url=url::getBaseUrl()+"/account/withdraw/"+this->idaccount;
    QNetworkRequest request((site_url));
    request.setHeader(QNetworkRequest::ContentTypeHeader, "application/json");

    qDebug()<<site_url;
    //WEBTOKEN ALKU
    request.setRawHeader(QByteArray("Authorization"),(this->webToken));
    //WEBTOKEN LOPPU

    updateManager = new QNetworkAccessManager(this);
    connect(updateManager, SIGNAL(finished(QNetworkReply*)), this, SLOT(dataSlot(QNetworkReply*)));

    reply = updateManager->put(request, QJsonDocument(jsonObj).toJson());
}


void withdraw::on_summa_textChanged(const QString &arg1)
{
    emit activity();
    this->ui->nostaBTN->setText(QString("NOSTA %1€").arg(this->ui->summa->text()));
}

