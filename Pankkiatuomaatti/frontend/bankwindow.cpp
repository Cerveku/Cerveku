#include "bankwindow.h"
#include "ui_bankwindow.h"

BankWindow::BankWindow(QString cardnum,bool credit, QByteArray webToken, QString iduser, QWidget *parent) :
    QDialog(parent),
    ui(new Ui::BankWindow)
{
    ui->setupUi(this);
     QWidget::showMaximized();
    this->setWebToken("Bearer "+ webToken);
    this->getAccount(cardnum); //haetaan käytettävä tilinumero kortin perusteella
     this->iduser = iduser;
     this->getUser(); //haetaan asiakkaan nimi
    this->usingCredit= credit;
     this->setWindowTitle("Valikko");

     setAttribute(Qt::WA_DeleteOnClose); //olio poistetaan kun ikkuna suljetaan

     QPixmap bkgnd(":/graphics/graphics/graphics/pic.png"); //tässä luodaan taustagrafiikka
     bkgnd = bkgnd.scaled(this->size(), Qt::IgnoreAspectRatio);
     QPalette palette;
     palette.setBrush(QPalette::Window, bkgnd);
     this->setPalette(palette);

     QTimer *sessionTimer = new QTimer(this);
     connect(sessionTimer,SIGNAL(timeout()),this,SLOT(timeCounter()));
     sessionTimer->start(1000);

}

void BankWindow::setWebToken(const QByteArray &newWebToken)
{
    webToken = newWebToken;

}

BankWindow::~BankWindow()
{
    delete ui;


}


void BankWindow::dataSlot(QNetworkReply *reply)
{

    //qDebug()<<reply->readAll();
    QByteArray response_data=reply->readAll();
    QJsonDocument json_doc = QJsonDocument::fromJson(response_data);
    QJsonArray json_array = json_doc.array();
    foreach (const QJsonValue &value, json_array) {
        QJsonObject json_obj = value.toObject();
        if(usingCredit == true){
            if(json_obj["credit"].toInt() < 0) {
                qDebug()<<json_obj["idaccount"].toString();
                idaccount=json_obj["idaccount"].toString();
            }else {}
        }


        else if(usingCredit == false){
            if(json_obj["credit"].toInt() == 0){
                qDebug()<<json_obj["idaccount"].toString();
                idaccount=json_obj["idaccount"].toString();}}
    }




    qDebug()<<idaccount;

    reply->deleteLater();
    dataManager->deleteLater();
}
void BankWindow::getAccount(QString cardnum){
    qDebug()<<webToken;
    QString site_url=url::getBaseUrl()+"/account/account/"+cardnum;
    qDebug()<<site_url;
    QNetworkRequest request((site_url));
    //WEBTOKEN ALKU
    request.setRawHeader(QByteArray("Authorization"),(webToken));
    //WEBTOKEN LOPPU
    dataManager = new QNetworkAccessManager(this);

    connect(dataManager, SIGNAL(finished (QNetworkReply*)), this, SLOT(dataSlot(QNetworkReply*)));

    reply = dataManager->get(request);
}

void BankWindow::userSlot(QNetworkReply *reply)
{

    response_data=reply->readAll();

    qDebug()<<response_data;
    QJsonDocument json_doc = QJsonDocument::fromJson(response_data);
    QJsonObject json_obj = json_doc.object();


    name = json_obj["fname"].toString() + " " + json_obj["lname"].toString();

    ui->labelInfo->setText("ASIAKAS: " +name.toUpper()+"!");

    reply->deleteLater();
    dataManager->deleteLater();
}
void BankWindow::getUser(){
    qDebug()<<webToken;
    QString site_url=url::getBaseUrl()+"/user/"+iduser;
    qDebug()<<site_url;
    QNetworkRequest request((site_url));
    //WEBTOKEN ALKU
    request.setRawHeader(QByteArray("Authorization"),(webToken));
    //WEBTOKEN LOPPU
    userManager = new QNetworkAccessManager(this);

    connect(userManager, SIGNAL(finished (QNetworkReply*)), this, SLOT(userSlot(QNetworkReply*)));

    reply = userManager->get(request);
}

bool BankWindow::getCredit(){
    return usingCredit;
}





void BankWindow::on_Btn_nosta_clicked()
{
    this->resetTimer();
    if(!objectWithdraw){//jos oliota ei ole vielä luotu, luodaan se napin painalluksella
    objectWithdraw=new withdraw(idaccount, webToken,this);
    QObject::connect(objectWithdraw,&withdraw::activity,this,&BankWindow::onActivity); //yhdistetään olion activity signal onActivity slottiin
    QObject::connect(objectWithdraw,&withdraw::withdrawal,this,&BankWindow::onWithdrawal);//yhdistetään withdraw signaali onwithdrawal slottiin
    ui->stackedWidget->addWidget(objectWithdraw);} //lisätään olio stackedwidgetiin

    ui->stackedWidget->setCurrentWidget(objectWithdraw); //näytetään tämä ikkuna stackedwidgetissä
}


void BankWindow::on_Btn_saldo_clicked()
{
    this->resetTimer();

    if(!objectStatus){
        objectStatus=new status(idaccount, webToken, this);
        QObject::connect(objectStatus,&status::activity,this,&BankWindow::onActivity);
        ui->stackedWidget->addWidget(objectStatus);}

    ui->stackedWidget->setCurrentWidget(objectStatus);
}


void BankWindow::on_Btn_loki_clicked()
{
    this->resetTimer();

    if(!objectHistory){
        objectHistory=new history(idaccount, webToken,this);
        QObject::connect(objectHistory,&history::activity,this,&BankWindow::onActivity);
        ui->stackedWidget->addWidget(objectHistory);}

    ui->stackedWidget->setCurrentWidget(objectHistory);
}

void BankWindow::on_Btn_lah_clicked()
{

    this->resetTimer();

    if(!objectMoneysend){
        objectMoneysend=new moneysend(idaccount, webToken, this);
        QObject::connect(objectMoneysend,&moneysend::activity,this,&BankWindow::onActivity);
        QObject::connect(objectMoneysend,&moneysend::withdrawal,this,&BankWindow::onWithdrawal);
        ui->stackedWidget->addWidget(objectMoneysend);}

    ui->stackedWidget->setCurrentWidget(objectMoneysend);
}



void BankWindow::on_Btn_exit_clicked()
{
    this->logOut();

}
void BankWindow::logOut(){
    emit loggedout(); //kirjautumis ikkunalle signaali että näyttää itsensä
    this->close();

}


void BankWindow::timeCounter() //ajastin suorittaa tämän 1sekunnin välein
 {
     //qDebug()<<timerRounds;
     timerRounds++;

     if(timerRounds==10){
         ui->stackedWidget->setCurrentIndex(0);//tämä sulkee pop-up -ikkunat
     }
     if(timerRounds==30){
         this->logOut();        //tämä sulkee mainin
     }
}
void BankWindow::onActivity() //tähän yhdistetään signaalit kaikkien olioiden napeista
{
   this->resetTimer();
}
void BankWindow::onWithdrawal(QString item) //tähän yhdistetään signaalit kaikkien olioiden napeista
{
   qDebug()<<item;
   if(!objectDialogWindow){
       objectDialogWindow=new withdrawDialog(this);
       ui->stackedWidget->addWidget(objectDialogWindow);}
   objectDialogWindow->setText(item);
   ui->stackedWidget->setCurrentWidget(objectDialogWindow);
   objectWithdraw = nullptr;
}
void BankWindow::resetTimer(){
    timerRounds=0;
}

