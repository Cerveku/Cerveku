#include "withdrawdialog.h"
#include "ui_withdrawdialog.h"

withdrawDialog::withdrawDialog(QWidget *parent) :
    QWidget(parent),
    ui(new Ui::withdrawDialog)
{
    setWindowFlags(Qt::WindowTitleHint | Qt::WindowMinimizeButtonHint);
    ui->setupUi(this);


    QPixmap bkgnd(":/graphics/graphics/graphics/pic.png"); //tässä luodaan taustagrafiikka
    bkgnd = bkgnd.scaled(this->size(), Qt::IgnoreAspectRatio);
    QPalette palette;
    palette.setBrush(QPalette::Window, bkgnd);
    this->setPalette(palette);

}

withdrawDialog::~withdrawDialog()
{
    delete ui;
}

void withdrawDialog::on_pushButton_clicked()
{
    emit activity();
    this->close();
}


void withdrawDialog::setText(QString text){
    this->ui->label->setText(text);
}
