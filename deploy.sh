#!/usr/bin/bash
set -e
yarn build
cd build
git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:TheDeaX-Lab/vk_pikap_master_vkui_edition.git master
cd --
