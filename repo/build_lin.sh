#!/bin/bash

qmake qserterm.pro -config lin && make all install
# && rm -r ./build/lin/.moc ./build/lin/.obj
