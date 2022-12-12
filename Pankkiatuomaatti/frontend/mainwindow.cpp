#include "mainwindow.h"
#include "ui_mainwindow.h"

MainWindow::MainWindow(QWidget *parent)
    : QMainWindow(parent), ui(new Ui::MainWindow) {
  ui->setupUi(this);
  ui->labelInfo->setWordWrap(true);

  this->setWindowTitle("Kirjautuminen");

  // luodaan ajastin olio ja yhdistetään timerslotiin
  pinTimer = new QTimer(this);
  connect(pinTimer, &QTimer::timeout, this,
          QOverload<>::of(&MainWindow::TimerSlot));
  this->reset();
  QRegExpValidator *rxv = new QRegExpValidator(QRegExp("\\d*"), this);
  this->ui->cardnum->setValidator(rxv);
  this->ui->cardpin->setValidator(rxv);


//  QPixmap bkgnd(
//      ":/graphics/graphics/graphics/pic.png"); // tässä luodaan taustagrafiikka
//  bkgnd = bkgnd.scaled(this->size(), Qt::IgnoreAspectRatio);
//  QPalette palette;
//  palette.setBrush(QPalette::Window, bkgnd);
//  this->setPalette(palette);
}

MainWindow::~MainWindow() {
  delete ui;
  delete objectBankWindow;
  objectBankWindow = nullptr;
}

void MainWindow::on_btnLogin_clicked() {
  cardnum = ui->cardnum->text();
  QString cardpin = ui->cardpin->text();

  QJsonObject jsonObj;
  jsonObj.insert("cardnum", cardnum);
  jsonObj.insert("cardpin", cardpin);

  QString site_url = url::getBaseUrl() + "/login";
  QNetworkRequest request((site_url));
  request.setHeader(QNetworkRequest::ContentTypeHeader, "application/json");

  loginManager = new QNetworkAccessManager(this);
  connect(loginManager, SIGNAL(finished(QNetworkReply *)), this,
          SLOT(loginSlot(QNetworkReply *)));

  reply = loginManager->post(request, QJsonDocument(jsonObj).toJson());
}

void MainWindow::loginSlot(QNetworkReply *reply) {
  response_data = reply->readAll();
  qDebug() << response_data;
  int test = QString::compare(response_data, "false");
  int test2 = QString::compare(response_data, "locked");
  qDebug() << test;

  QJsonDocument json_doc = QJsonDocument::fromJson(response_data);
  QJsonObject json_obj = json_doc.object();
  QString tokenstring;

  tokenstring = json_obj["token"].toString();
  token = tokenstring.toUtf8();

  // mahdollista kortin valintaa varten rest api palauttaa json objektissa myös
  // onko kortissa credit ominaisuus
  bool credit;
  if (json_obj["credit"].toInt() == 1) {
    credit = true;
  } else {
    credit = false;
  }
  iduser = QString::number(json_obj["iduser"].toInt());
  qDebug() << token;
  qDebug() << credit;

  if (response_data.length() == 0) {
    ui->labelInfo->setText("Palvelin ei vastaa");
  } else {
    if (QString::compare(response_data, "-4078") == 0) {
      ui->labelInfo->setText("Virhe tietokanta yhteydessä");
    } else {
      if (test == 0) {
        // ui->cardnum->clear();
        ui->cardpin->clear();
        ui->labelInfo->setText("Tunnus ja salasana eivät täsmää");
      } else if (test2 == 0) {
        ui->labelInfo->setText("Kortti on lukittu, liian monta yritystä");
      } else {
        if (credit == true) {//jos kortilla on credit ominaisuus näytetään tilin valinta napit
          ui->btnCredit->show();
          ui->btnDebit->show();
          ui->btnLogin->setDisabled(true);
          ui->labelInfo->setText("Valitse Credit tai Debit");

        } else {
          this->logIn(false);
        }
      }
    }
  }
  ui->labelInfo->show();
  reply->deleteLater();
  loginManager->deleteLater();
}

void MainWindow::on_cardpin_returnPressed() { ui->btnLogin->click(); }

void MainWindow::on_cardnum_returnPressed() {
  ui->label_2->show();
  ui->cardpin->show();
  ui->btnLogin->setDisabled(false);
  ui->cardpin->setFocus();
  ui->cardnum->setReadOnly(true);
  ui->labelInfo->setText("Syötä pin koodi ja paina Enter tai paina Esc");
  pinTimer->start(timer * 1000);  //käynnistetään ajastin 20sekuntia pin syöttöön
}

void MainWindow::on_cardpin_textEdited(const QString &arg1) {
  if (ui->cardpin->isModified() == true) {
    ui->btnLogin->show();
  }
  pinTimer->stop();
  pinTimer->start(timer * 1000);
}

void MainWindow::reset() {
  //resetoidaan kirjautumisikkuna
  ui->btnLogin->hide();
  ui->cardpin->hide();
  ui->btnCredit->hide();
  ui->btnDebit->hide();
  ui->label_2->hide();
  ui->cardnum->clear();
  ui->cardpin->clear();
  ui->cardnum->setReadOnly(false);

  ui->labelInfo->setText("Syötä kortin numero ja paina Enter");

  if (pinTimer->isActive() == true) {
    pinTimer->stop();
  }
}
void MainWindow::TimerSlot() { this->reset(); }

void MainWindow::on_btnCredit_clicked() { this->logIn(true); }

void MainWindow::on_btnDebit_clicked() { this->logIn(false); }
void MainWindow::onLogout() { this->show(); }

void MainWindow::logIn(bool credit) {

  objectBankWindow = new BankWindow(cardnum, credit, token, iduser,this);

  //yhdistetään signaali onLogout slottiin, jotta ikkuna saadaan näkyviin kirjautumisen jälkeen
  QObject::connect(objectBankWindow, &BankWindow::loggedout, this,
                   &MainWindow::onLogout);

  objectBankWindow->show();
  ui->cardnum->clear();
  ui->cardpin->clear();

  this->reset();
  this->hide();
}
void MainWindow::keyPressEvent( QKeyEvent * event )
{
    if( event->key() == Qt::Key_Escape )
    {
        this->reset();
    }
}
