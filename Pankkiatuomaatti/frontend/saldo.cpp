#include "ui_saldo.h"

saldo::saldo(Qwideget *parent)
    QDialog(parent),
    ui(new Ui::saldo)
{
    ui->setupUi(this);
}

saldo::~saldo()
{
    delete ui;
}
